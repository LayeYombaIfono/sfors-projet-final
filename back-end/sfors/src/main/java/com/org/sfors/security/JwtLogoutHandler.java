package com.org.sfors.security;

import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import com.org.sfors.entity.UtilisateurEntity;
import com.org.sfors.repository.UtilisateurRepository;
import com.org.sfors.serviceImp.UtilisateurServiceImpl;

@Component
public class JwtLogoutHandler implements LogoutHandler {

    private static final Logger logger = LoggerFactory.getLogger(JwtLogoutHandler.class);
    
    @Autowired
    private UtilisateurServiceImpl utilisateurService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logger.info("JwtLogoutHandler: déconnexion utilisateur");
        
        // Essayer d'obtenir le token
        String requestTokenHeader = request.getHeader("Authorization");
        
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            String jwtToken = requestTokenHeader.substring(7);
            try {
                // Extraire le username du token
                String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                
                // Mettre à jour directement le statut de l'utilisateur dans la base de données
                if (username != null) {
                    Optional<UtilisateurEntity> userOpt = utilisateurRepository.findByEmail(username);
                    if (userOpt.isPresent()) {
                        UtilisateurEntity user = userOpt.get();
                        user.setOnline(false);
                        utilisateurRepository.save(user);
                        logger.info("JwtLogoutHandler: Déconnexion réussie pour l'utilisateur {}", username);
                        return;
                    }
                }
            } catch (Exception e) {
                logger.error("JwtLogoutHandler: Erreur lors de l'extraction du username depuis le token", e);
            }
        }
        
        // Si nous arrivons ici, essayons la méthode standard si le contexte d'authentification existe
        if (authentication != null && authentication.getName() != null) {
            try {
                utilisateurService.deconnecterUtilisateur();
                logger.info("JwtLogoutHandler: Déconnexion réussie via contexte d'authentification");
            } catch (Exception e) {
                logger.error("JwtLogoutHandler: Erreur lors de la déconnexion", e);
            }
        } else {
            logger.warn("JwtLogoutHandler: Impossible de déconnecter l'utilisateur - pas de token ni de contexte d'authentification");
        }
    }
}