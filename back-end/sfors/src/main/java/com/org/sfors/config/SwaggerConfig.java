package com.org.sfors.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
	
	@Bean
	public OpenAPI swaggerAPI() {
		String securitySchemeName = "Auth JWT";
		return new OpenAPI().addSecurityItem(new SecurityRequirement()
				.addList(securitySchemeName))
				.components(new Components()
				.addSecuritySchemes(securitySchemeName,new SecurityScheme()
				.name(securitySchemeName)
				.type(SecurityScheme.Type.HTTP)
				.scheme("bearer").bearerFormat("JWT")))
				.info(new Info().title("Sourceminde Project Backend")
				.description("Systeme de gestion formation").version("v0.1.0"));
	}

}
