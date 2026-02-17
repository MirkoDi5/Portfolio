package org.champsoft.mirko_portfolio.Security;

import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                // ✅ CORS configured ONLY here (remove CorsConfig class!)
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of(
                            "http://localhost:3000",
                            "https://mirkos-portfolio-woad.vercel.app",
                            "https://mirkos-portfolio-git-main-mirko-di-criscios-projects.vercel.app",
                            "https://mirkos-portfolio-9jyt0ubhm-mirko-di-criscios-projects.vercel.app"
                    ));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setExposedHeaders(List.of("Authorization"));
                    config.setAllowCredentials(true); // ✅ Must be true
                    return config;
                }))


                .authorizeHttpRequests(auth -> auth

                        // ✅ Public GET endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/testimony/**",
                                "/api/v1/projects/**",
                                "/api/v1/skills/**",
                                "/api/v1/work/**",
                                "/api/v1/education/**"
                        ).permitAll()

                        // Optional public routes
                        .requestMatchers("/public/**", "/health", "/").permitAll()

                        // Role-based protection
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                // 🔐 Enable JWT Resource Server
                .oauth2ResourceServer(oauth -> oauth
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(new JwtRoleConverter()))
                );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder(OAuth2ResourceServerProperties properties) {

        NimbusJwtDecoder jwtDecoder =
                NimbusJwtDecoder.withJwkSetUri(properties.getJwt().getJwkSetUri()).build();

        OAuth2TokenValidator<Jwt> withIssuer =
                JwtValidators.createDefaultWithIssuer(properties.getJwt().getIssuerUri());

        OAuth2TokenValidator<Jwt> withAudience =
                new AudienceValidator("https://api.portfolio.com");

        OAuth2TokenValidator<Jwt> validator =
                new DelegatingOAuth2TokenValidator<>(withIssuer, withAudience);

        jwtDecoder.setJwtValidator(validator);

        return jwtDecoder;
    }

    // ✅ Audience Validator
    public static class AudienceValidator implements OAuth2TokenValidator<Jwt> {

        private final String audience;

        public AudienceValidator(String audience) {
            this.audience = audience;
        }

        @Override
        public OAuth2TokenValidatorResult validate(Jwt jwt) {

            if (jwt.getAudience() != null && jwt.getAudience().contains(audience)) {
                return OAuth2TokenValidatorResult.success();
            }

            return OAuth2TokenValidatorResult.failure(
                    new OAuth2Error(
                            "invalid_token",
                            "The required audience is missing",
                            null
                    )
            );
        }
    }
}
