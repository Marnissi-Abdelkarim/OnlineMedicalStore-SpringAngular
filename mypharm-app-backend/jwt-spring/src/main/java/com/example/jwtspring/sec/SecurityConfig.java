package com.example.jwtspring.sec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	//@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder();
	@Autowired
	UserDetailsService userDetailsService;
	@Override     //la methode utilisee pour dire a spring comment chercher les utilisateurs, passwords,roles...
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		/*
		 * auth.inMemoryAuthentication().withUser("admin").password("123").roles("ADMIN"
		 * ,"USER").and() .withUser("user").password("{noop}123").roles("USER");
		 */
		
		//methode 2
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}
	
	@Override    //la methode pour definir les droits d'access , ajout des filtres
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);//activer l'authtification stateless pour JWT (desactiver la session)
		http.headers().frameOptions().disable(); //h2 enable
		//http.formLogin();/* .loginPage("/login"); */ //on doit creer une methode avec @RequesteMapping("/login") qui retourne une page login.html qu'on va creer
		/*
		 * http.authorizeRequests().antMatchers("/login/**","/register/**",
		 * "/h2-console/**").permitAll();
		 * http.authorizeRequests().antMatchers(HttpMethod.POST,"/tasks/**").
		 * hasAuthority("ADMIN");
		 * http.authorizeRequests().antMatchers(HttpMethod.GET,"/tasks/**").hasAuthority
		 * ("ADMIN"); http.authorizeRequests().anyRequest().authenticated();
		 */
		http.authorizeRequests().anyRequest().permitAll();
		http.addFilter(new JWTAuthentificationFilter(authenticationManager()));
		http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

	}
	
}
