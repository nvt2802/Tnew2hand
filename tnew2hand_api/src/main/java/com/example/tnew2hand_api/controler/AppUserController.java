package com.example.tnew2hand_api.controler;

import com.example.tnew2hand_api.common.ValidateAppUser;
import com.example.tnew2hand_api.config.JwtTokenUtil;
import com.example.tnew2hand_api.dto.AppUserDto;
import com.example.tnew2hand_api.model.AppUser;
import com.example.tnew2hand_api.model.JwtResponse;
import com.example.tnew2hand_api.service.IAppUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class AppUserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IAppUserService appUserService;
    private static final String LOGIN_FAILED = "Login failed";

    @PostMapping("/login-by-username")
    public ResponseEntity<Object> loginByAccount(@Valid @RequestBody AppUserDto appUserDto,
                                                 BindingResult bindingResult) {

        new AppUserDto().validate(appUserDto, bindingResult);
        if (bindingResult.hasErrors()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(LOGIN_FAILED);
        }
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    appUserDto.getUserName(), appUserDto.getPassword()));
        } catch (DisabledException e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Your account has been disabled");
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(LOGIN_FAILED);
        }

        AppUser appUser = new AppUser();

        BeanUtils.copyProperties(appUserDto, appUser);

        UserDetails userDetails = appUserService.loadUserByUsername(appUser.getUserName());

        String jwtToken = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity
                .ok()
                .body(new JwtResponse(jwtToken));
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody AppUserDto appUserDto,
                                         BindingResult bindingResult){
        new AppUserDto().validate(appUserDto, bindingResult);
        ValidateAppUser.checkValidateConfirmAppUserPassword(appUserDto.getConfirmPassword(), bindingResult);
        Map<String, String> errorsMap = new HashMap<>();
        if (!ValidateAppUser.checkVerificationPassword(appUserDto.getPassword(), appUserDto.getConfirmPassword())) {
            bindingResult.rejectValue("confirmPassword","","Password incorrect");
        }
        if (bindingResult.hasErrors()) {
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errorsMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

        }
        boolean existsByUsername = appUserService.existsByUsername(appUserDto.getUserName());
        if (existsByUsername) {
            errorsMap.put("userName","This account already exists");
        }
        if(!errorsMap.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(errorsMap);
        }
        AppUser appUser = new AppUser();
        BeanUtils.copyProperties(appUserDto, appUser);
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        appUserService.saveAppUser(appUser);
        return  new ResponseEntity<>("Signup successfully",HttpStatus.OK);
    }
}
