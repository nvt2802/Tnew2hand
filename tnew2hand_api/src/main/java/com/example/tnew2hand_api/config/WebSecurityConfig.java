package com.example.retro_care.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private UserDetailsService jwtUserDetailService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    /**
     * method: configureGlobal
     * Creater: NhatNHH
     * Date: 15-09-2023
     * param: AuthenticationManagerBuilder auth
     * return: void
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailService).passwordEncoder(new BCryptPasswordEncoder());
    }

    /**
     * method: authenticationManagerBean
     * Creater: NhatNHH
     * Date: 15-09-2023
     * return: AuthenticationManager
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();

    }

    /**
     * method: passwordEncoder
     * Creater: NhatNHH
     * Date: 15-09-2023
     * return: PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * method: configure
     * Creater: NhatNHH
     * Date: 15-09-2023
     * return: void
     */
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.csrf().disable().cors().and()
//                .authorizeRequests()
//                .antMatchers(
//                        //All role
//                        "/api/user/login-by-username/**",
//                        "/api/user/login-by-facebook/**",
//                        "/api/user/register-by-customer/**",
//                        "/api/user/logout/**",
//                        "/api/home/**",
//                        "/api/home/search/**",
//                        "/api/home/favorite/**"
//
//                ).anonymous()
//                .antMatchers(
//                        "/api/orders/**",
//                        "/api/orders/list/**",
//                        "/api/orders/{id}/**").hasAnyAuthority("ROLE_ADMIN","ROLE_MANAGER","ROLE_CUSTOMER","ROLE_EMPLOYEE")
//                .antMatchers(
//                        //Authen Role admin and manager
//                        "/api/user/register-by-manager/**",
//                        "/api/invoice/**",
//                        "/api/invoice/delete/{id}/**",
//                        "/api/invoice/search/**",
//                        "/api/invoice/create/**",
//                        "/api/invoice/{invoiceId}/**",
//                        "/api/invoice/edit/**",
//                        "/api/invoice/code/**",
//                        "/api/kindOfMedicine/**",
//                        "/api/kindOfMedicine/{id}/**",
//                        "/api/kindOfMedicine/create/**",
//                        "/api/kindOfMedicine/edit/{id}",
//                        "/api/kindOfMedicine/get/**",
//                        "/api/medicine/{id}/**",
//                        "/api/medicine/**",
//                        "/api/medicine/get-medicine/**",
//                        "/api/medicine/get-list/**",
//                        "/api/medicine/search/**",
//                        "/customers/api/dto/create/**",
//                        "/customers/api/create/**",
//                        "/customers/api/update/{id}/**",
//                        "/customers/api/{id}/**",
//                        "/customers/api/list/**",
//                        "/customers/api/list-customer/**",
//                        "/customers/api/delete/{id}/**",
//                        "/supplier/**",
//                        "/supplier/delete/{id}/**",
//                        "/supplier/create-supplier/**",
//                        "/supplier/update-supplier/{id}/**",
//                        "/supplier/detail-supplier/{id}/**",
//                        "/supplier/{id}/**",
//                        "/employees/create/**",
//                        "/employees/{id}/**",
//                        "/employees/update/{id}/**",
//                        "/employees/list/{page}/{limit}/{sort}/**",
//                        "/employees/delete-employee/**",
//                        "/indication/{id}/**",
//                        "/indication/delete/{id}/**",
//                        "/indication/create/**",
//                        "/indication/edit/**",
//                        "/prescription/**",
//                        "/prescription/create/**",
//                        "/prescription/{id}/**",
//                        "/prescription/delete/{id}/**",
//                        "/prescription/edit/{id}/**",
//                        "/patien/**",
//                        "/api/report/general/**",
//                        "/api/report/chart/revenue/**",
//                        "/api/report//chart/profit/**"
//
//                ).hasAnyRole("ROLE_ADMIN","ROLE_MANAGER")
//
//                .anyRequest()
//                .authenticated()
//                .and()
//                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .and().
//                sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        httpSecurity
                .authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .csrf().disable();
    }

}
