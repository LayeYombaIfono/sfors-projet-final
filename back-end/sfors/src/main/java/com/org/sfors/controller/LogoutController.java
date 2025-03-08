package com.org.sfors.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.org.sfors.security.JwtTokenUtil;
import com.org.sfors.serviceImp.UtilisateurServiceImpl;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "API d'authentification et de gestion des sessions")
public class LogoutController {

    private static final Logger logger = LoggerFactory.getLogger(LogoutController.class);
    
    @Autowired
    private UtilisateurServiceImpl utilisateurService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
   
    @Operation(
        summary = "Déconnexion utilisateur",
        description = "Déconnecte un utilisateur et met son statut 'online' à false",
        responses = {
            @ApiResponse(responseCode = "200", description = "Déconnexion réussie"),
            @ApiResponse(responseCode = "401", description = "Non autorisé"),
            @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
        }
    )
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, @RequestBody(required = false) Map<String, String> body) {
        logger.info("Tentative de déconnexion d'un utilisateur");
        
        Map<String, Object> response = new HashMap<>();
        boolean logoutSuccess = false;
        String usernameFromToken = null;
        String emailFromBody = null;
        
        
        String requestTokenHeader = request.getHeader("Authorization");
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            try {
                String jwtToken = requestTokenHeader.substring(7);
                logger.info("Token JWT pour déconnexion: {}", jwtToken);
                
                usernameFromToken = jwtTokenUtil.getUsernameFromToken(jwtToken);
                logger.info("Username extrait du token: '{}'", usernameFromToken);
                
                if (usernameFromToken != null) {
                    boolean success = utilisateurService.setUserOffline(usernameFromToken);
                    if (success) {
                        logoutSuccess = true;
                        logger.info("Utilisateur {} déconnecté avec succès via token JWT", usernameFromToken);
                    } else {
                        logger.warn("Échec de la déconnexion via token pour l'utilisateur {}", usernameFromToken);
                    }
                }
            } catch (Exception e) {
                logger.warn("Échec de l'extraction du username depuis le token", e);
            }
        } else {
            logger.info("Aucun token d'autorisation trouvé dans la requête");
        }
        
        
        if (!logoutSuccess && body != null && body.containsKey("email")) {
            emailFromBody = body.get("email");
            logger.info("Email fourni dans le corps de la requête: '{}'", emailFromBody);
            
            if (emailFromBody != null && !emailFromBody.isEmpty()) {
                boolean success = utilisateurService.setUserOffline(emailFromBody);
                if (success) {
                    logoutSuccess = true;
                    logger.info("Utilisateur {} déconnecté avec succès via email fourni", emailFromBody);
                } else {
                    logger.warn("Échec de la déconnexion via email pour {}", emailFromBody);
                }
            } else {
                logger.warn("Email fourni est vide ou null");
            }
        } else if (!logoutSuccess) {
            logger.info("Aucun email trouvé dans le corps de la requête ou déconnexion déjà réussie");
        }
        
       
        if (!logoutSuccess) {
            String searchTerm = usernameFromToken != null ? usernameFromToken : 
                                emailFromBody != null ? emailFromBody : "";
            
            if (!searchTerm.isEmpty()) {
                try {
                    logger.info("Tentative de recherche d'utilisateurs avec un identifiant similaire: '{}'", searchTerm);
                    boolean success = utilisateurService.setUserOfflineByPartialMatch(searchTerm);
                    if (success) {
                        logoutSuccess = true;
                        logger.info("Utilisateur(s) avec identifiant similaire à '{}' déconnecté(s) avec succès", searchTerm);
                    }
                } catch (Exception e) {
                    logger.warn("Erreur lors de la recherche par correspondance partielle", e);
                }
            }
        }
        
        // Nettoyer le contexte de sécurité dans tous les cas
        SecurityContextHolder.clearContext();
        
        // Répondre avec le résultat
        if (logoutSuccess) {
            response.put("status", "success");
            response.put("message", "Déconnexion réussie");
        } else {
            response.put("status", "partial");
            response.put("message", "Déconnexion effectuée localement, mais l'état utilisateur n'a pas pu être mis à jour");
        }
        
        return ResponseEntity.ok(response);
    }
}