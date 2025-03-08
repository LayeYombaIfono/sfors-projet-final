package com.org.sfors.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.org.sfors.serviceImp.JwtUserDetailsService;
import com.org.sfors.serviceImp.UtilisateurServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private UtilisateurServiceImpl utilisateurService;

    Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Vérifier si c'est une requête de déconnexion
        if (request.getRequestURI().contains("/logout")) {
            // Pour les requêtes de déconnexion, on continue sans vérifier le token
            chain.doFilter(request, response);
            return;
        }

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;
        boolean tokenExpired = false;
        
        logger.info("requestTokenHeader : {}", requestTokenHeader);

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                logger.error("Unable to get JWT Token", e);
            } catch (ExpiredJwtException e) {
                logger.info("JWT Token has expired for user: {}", e.getClaims().getSubject());
                username = e.getClaims().getSubject();
                tokenExpired = true;
                
                if (username != null) {
                    utilisateurService.setUserOffline(username);
                    logger.info("User {} set to offline due to expired token", username);
                }
            }
        } else {
            logger.warn("JWT Token does not begin with Bearer String");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null && !tokenExpired) {
            UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);

            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                
                // Vérifiez d'abord si l'utilisateur est déjà marqué comme déconnecté
                boolean isUserOnline = utilisateurService.isUserOnline(username);
                
                // Ne mettre à jour le statut que si l'utilisateur est déjà en ligne
                if (isUserOnline) {
                    Date tokenExpiration = jwtTokenUtil.getExpirationDateFromToken(jwtToken);
                    utilisateurService.setUserOnline(username, tokenExpiration);
                } else {
                    logger.info("User {} was previously logged out, not setting back to online", username);
                }
                
                // Authentification Spring Security normale
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext()
                        .setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }

}
