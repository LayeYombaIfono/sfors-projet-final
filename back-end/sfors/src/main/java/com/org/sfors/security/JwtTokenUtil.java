package com.org.sfors.security;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.org.sfors.serviceImp.UtilisateurServiceImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil implements Serializable {
	
	Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

	private static final long serialVersionUID = -2550185165626007488L;

	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

	@Value("${jwt.secret}")
	private String secret;
	
	@Autowired
	private UtilisateurServiceImpl utilisateurService;

	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	// retrieve expiration date from jwt token
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	// for retrieveing any information from token we will need the secret key
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	// check if the token has expired
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	// Modify the generateToken method in JwtTokenUtil to ensure token expiration is recorded:

	public String generateToken(UserDetails userDetails) {
	    Map<String, Object> claims = new HashMap<>();
	    String autorities = "";
	    logger.info("role {}", userDetails.getAuthorities());
	    for (Iterator iterator = userDetails.getAuthorities().iterator(); iterator.hasNext();) {
	        GrantedAuthority type = (GrantedAuthority) iterator.next();
	        if (iterator.hasNext() == false) {
	            autorities += type.getAuthority();
	        } else {
	            autorities += type.getAuthority() + ",";
	        }
	    }
	    claims.put(Claims.AUDIENCE, autorities);
	    claims.put(Claims.ID, this.utilisateurService.getUtilisateurByEmail(userDetails.getUsername()).getUuid());
	    
	    // Generate the token
	    String token = doGenerateToken(claims, userDetails.getUsername());
	    
	    // Record the token's expiration date for the user
	    Date expirationDate = new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000);
	    utilisateurService.setUserOnline(userDetails.getUsername(), expirationDate);
	    
	    return token;
	}

	
	private String doGenerateToken(Map<String, Object> claims, String subject) {

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	// validate token
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}