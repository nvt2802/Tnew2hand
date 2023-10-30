package com.example.tnew2hand_api.controler;

import com.example.tnew2hand_api.dto.UserDto;
import com.example.tnew2hand_api.model.User;
import com.example.tnew2hand_api.model.UserType;
import com.example.tnew2hand_api.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @PatchMapping("/update-user/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto,
                                        @PathVariable Long id,
                                        BindingResult bindingResult
    ) {
        new UserDto().validate(userDto, bindingResult);
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError fieldError : bindingResult.getFieldErrors()
            ) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.NOT_ACCEPTABLE);
        }
        User user = userService.getById(id);
        BeanUtils.copyProperties(userDto,user);
        user.setUserType(new UserType(1L,"Member",false));
        User userCheck = userService.update(user);
        if(userCheck== null){
            return new ResponseEntity<>("Can not save user",HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/get-user-by-username")
    public ResponseEntity<?> getUserByUsername(@RequestParam String userName) {
        User user = userService.getByUserName(userName);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
