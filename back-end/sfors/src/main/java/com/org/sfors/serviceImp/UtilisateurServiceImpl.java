package com.org.sfors.serviceImp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.org.sfors.dto.UtilisateurDto;
import com.org.sfors.entity.UtilisateurEntity;
import com.org.sfors.mapper.Mapper;
import com.org.sfors.repository.UtilisateurRepository;
import com.org.sfors.service.UtilisateurService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

	@Autowired
	private UtilisateurRepository utilisateurRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	Logger logger = LoggerFactory.getLogger(UtilisateurServiceImpl.class);

	// Méthodes existantes...
	@Override
	public UtilisateurDto addUtilisateur(UtilisateurDto utilisateurDto) {
		// Implémentation existante...
		UtilisateurEntity utilisateur = new UtilisateurEntity();
		
		UtilisateurDto dtoUsers = new UtilisateurDto();
		 if(dtoUsers.equals(null)) {
			 dtoUsers.setCode(305);
			 dtoUsers.setTitre("Save");
			 dtoUsers.setStatut("Errors");
			 dtoUsers.setDescription("Ajout Utilisateur echoué");
			 return dtoUsers;
		 }else {
		utilisateur.setUuid(utilisateurDto.getUuid());
		utilisateur.setEmail(utilisateurDto.getEmail());
		utilisateur.setPhone(utilisateurDto.getPhone());
		utilisateur.setRoles(utilisateurDto.getRoles());
		utilisateur.setPassword(passwordEncoder.encode(utilisateurDto.getPassword()));
		
		 utilisateur.setEnabled(true);
		 utilisateur.setNonExpired(true);
		 utilisateur.setNonLocked(true);
		 //utilisateur.setOnline(false);
		
		 UtilisateurEntity utilisateurSave = utilisateurRepository.save(utilisateur);
		dtoUsers = Mapper.toUtilisateurDto(utilisateurSave);
		dtoUsers.setCode(200);
		dtoUsers.setStatut("Succes");
		dtoUsers.setTitre("Save");
		dtoUsers.setDescription("Utilisateur crée avec succès !");
		return dtoUsers;
		 }
	}
	
	// Autres méthodes existantes...
	
	public void deconnecterUtilisateur() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    
	    // Vérifier si l'authentification est présente
	    if (auth != null && auth.getName() != null) {
	        Optional<UtilisateurEntity> utilisateurOpt = utilisateurRepository.findByEmail(auth.getName());
	        
	        if (utilisateurOpt.isPresent()) {
	            UtilisateurEntity utilisateur = utilisateurOpt.get();
	            utilisateur.setOnline(false);
	            utilisateur.setLastTokenExpiration(null); // Effacer la date d'expiration du token
	            utilisateurRepository.save(utilisateur);
	            logger.info("Utilisateur {} déconnecté avec succès", auth.getName());
	        } else {
	            // Log si l'utilisateur n'est pas trouvé
	            logger.warn("Tentative de déconnexion d'un utilisateur introuvable: {}", auth.getName());
	        }
	    } else {
	        // Log si aucune authentification n'est trouvée
	        logger.warn("Tentative de déconnexion sans contexte d'authentification");
	    }
	}
	
	// NOUVELLES MÉTHODES POUR LA GESTION DES TOKENS ET DU STATUT ONLINE
	
	
	@Transactional
	public int updateOnlineStatusForExpiredTokens() {
	    Date currentDate = new Date();
	    
	    // Utilisation de la méthode corrigée du repository
	    List<UtilisateurEntity> utilisateursExpires = utilisateurRepository.findByOnlineTrueAndLastTokenExpirationBefore(currentDate);
	    
	    int count = 0;
	    if (!utilisateursExpires.isEmpty()) {
	        for (UtilisateurEntity utilisateur : utilisateursExpires) {
	            utilisateur.setOnline(false);
	            utilisateurRepository.save(utilisateur);
	            logger.info("Utilisateur {} marqué comme déconnecté (token expiré)", utilisateur.getEmail());
	            count++;
	        }
	        logger.info("{} utilisateur(s) marqué(s) comme déconnecté(s) suite à l'expiration de leur token", count);
	    }
	    
	    return count;
	}
	
   
    @Scheduled(fixedRate = 300000) // 5 minutes
    public void scheduledStatusUpdate() {
        logger.info("Exécution de la vérification planifiée des tokens expirés");
        updateOnlineStatusForExpiredTokens();
    }
    
    // Force la déconnexion de tous les utilisateurs
    
    @Transactional
    public int logoutAllUsers() {
        List<UtilisateurEntity> utilisateursEnLigne = utilisateurRepository.findByOnlineTrue();
        
        int count = 0;
        if (!utilisateursEnLigne.isEmpty()) {
            for (UtilisateurEntity utilisateur : utilisateursEnLigne) {
                utilisateur.setOnline(false);
                utilisateur.setLastTokenExpiration(null);
                utilisateurRepository.save(utilisateur);
                count++;
            }
            logger.info("{} utilisateur(s) marqué(s) comme déconnecté(s) par force", count);
        }
        
        return count;
    }
    
   
    @Transactional
    public boolean setUserOnline(String email, Date tokenExpiration) {
        Optional<UtilisateurEntity> utilisateurOpt = utilisateurRepository.findByEmail(email);
        
        if (utilisateurOpt.isPresent()) {
            UtilisateurEntity utilisateur = utilisateurOpt.get();
            utilisateur.setOnline(true);
            utilisateur.setLastTokenExpiration(tokenExpiration);
            utilisateurRepository.save(utilisateur);
            logger.info("Utilisateur {} marqué comme connecté avec expiration du token le {}", email, tokenExpiration);
            return true;
        } else {
            logger.warn("Impossible de marquer l'utilisateur {} comme connecté: utilisateur introuvable", email);
            return false;
        }
    }
    
    @Override
    public List<UtilisateurDto> getByUserOnLigne() {
        List<UtilisateurEntity> utilisateursEnLigne = utilisateurRepository.findByOnlineTrue();
        List<UtilisateurDto> utilisateurDtos = new ArrayList<>();
        
        for (UtilisateurEntity utilisateur : utilisateursEnLigne) {
            utilisateurDtos.add(Mapper.toUtilisateurDto(utilisateur));
        }
        
        return utilisateurDtos;
    }

    @Override
	public UtilisateurDto updateUtilisateur(UtilisateurDto utilisateurDto, String uuid) {
		// TODO Auto-generated method stub
		UtilisateurEntity utilisateur = new UtilisateurEntity();
		
		 utilisateur = utilisateurRepository.findById(uuid).orElseThrow(null);
		
		utilisateur.setUuid(utilisateurDto.getUuid());
		utilisateur.setEmail(utilisateurDto.getEmail());
		utilisateur.setPhone(utilisateurDto.getPhone());
		utilisateur.setRoles(utilisateurDto.getRoles());
		utilisateur.setPassword(passwordEncoder.encode(utilisateurDto.getPassword()));
		 utilisateur.setEnabled(utilisateurDto.isEnabled());
		 utilisateur.setNonExpired(utilisateurDto.isNonExpired());
		 utilisateur.setNonLocked(utilisateurDto.isNonLocked());
		 
		 UtilisateurEntity utlilisateurUpdate= utilisateurRepository.save(utilisateur);
		 UtilisateurDto dtoUsers = new UtilisateurDto();
		dtoUsers = Mapper.toUtilisateurDto(utlilisateurUpdate);
		if(!dtoUsers.equals(null)) {
			dtoUsers.setCode(200);
			dtoUsers.setStatut("Succes");
			dtoUsers.setTitre("Update");
			dtoUsers.setDescription("Update User effectué avec succès !");
		return dtoUsers;
		}else {
			dtoUsers.setCode(305);
			dtoUsers.setStatut("Errors");
			dtoUsers.setTitre("Update");
			dtoUsers.setDescription("Update user echoué !");
			return dtoUsers;
		}
	}
	
	

	@Override
	public void deleteUtilisateur(String uuid) {
		// TODO Auto-generated method stub
		//Users utilisateur = utilisateurRepository.findById(uuid).orElseThrow(null);
		utilisateurRepository.deleteById(uuid);

	}

	@Override
	public List<UtilisateurDto> findAll() {
		// TODO Auto-generated method stub
		List<UtilisateurEntity> users = utilisateurRepository.findAll();
		List<UtilisateurDto> utilisateurDtos = new ArrayList<UtilisateurDto>();
		users.forEach(user -> utilisateurDtos.add(Mapper.toUtilisateurDto(user)));
		return utilisateurDtos;
	}

	@Override
	public UtilisateurDto getUtilisateur(String uuid) {
		// TODO Auto-generated method stub
		UtilisateurEntity utilisateur = utilisateurRepository.findById(uuid).orElseThrow(null);
		return Mapper.toUtilisateurDto(utilisateur);
	}

	@Override
	public UtilisateurDto getUtilisateurByEmail(String email) {
		Optional<UtilisateurEntity> optionalUtilisateur = utilisateurRepository.findByEmail(email);
		UtilisateurEntity utilisateur = optionalUtilisateur.orElseThrow(null);
		return Mapper.toUtilisateurDto(utilisateur);
	}

	
	
	@Override
	public UtilisateurDto getPassword(String usernameOrPhoneNumber,String newPassowd) {
		// TODO Auto-generated method stub
		Optional<UtilisateurEntity> utilisateur = utilisateurRepository.findByEmail(usernameOrPhoneNumber);
		UtilisateurEntity utilisateurSave = new UtilisateurEntity();
		if(utilisateur.isPresent()) {
			utilisateur.get().setPassword(passwordEncoder.encode(newPassowd));
			utilisateurSave = 	utilisateurRepository.save(utilisateur.get());
		}
		return Mapper.toUtilisateurDto(utilisateurSave);
	}
	
	@Transactional
	public boolean setUserOffline(String identifier) {
	    logger.info("Tentative de déconnexion pour l'identifiant: {}", identifier);
	    
	    // Variable pour stocker l'utilisateur trouvé
	    Optional<UtilisateurEntity> utilisateurOpt = Optional.empty();
	    
	    
	    utilisateurOpt = utilisateurRepository.findByEmail(identifier);
	    
	    
	    if (!utilisateurOpt.isPresent()) {
	        // Vérifier si l'identifiant ressemble à un UUID
	        if (identifier.matches("[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}")) {
	            utilisateurOpt = utilisateurRepository.findById(identifier);
	            logger.info("Recherche par UUID: {}", identifier);
	        }
	    }
	    
	    // Si l'utilisateur est trouvé, mettre à jour son statut
	    if (utilisateurOpt.isPresent()) {
	        UtilisateurEntity utilisateur = utilisateurOpt.get();
	        
	        // Journaliser le statut actuel pour le débogage
	        logger.info("Statut actuel de l'utilisateur {}: online={}", 
	                   utilisateur.getEmail(), utilisateur.isOnline());
	        
	        // Mettre à jour le statut seulement s'il est actuellement à true
	        if (utilisateur.isOnline()) {
	            utilisateur.setOnline(false);
	            utilisateur.setLastTokenExpiration(null);
	            
	            try {
	                utilisateurRepository.save(utilisateur);
	                logger.info("Utilisateur {} (email: {}) marqué comme déconnecté avec succès", 
	                           identifier, utilisateur.getEmail());
	                return true;
	            } catch (Exception e) {
	                logger.error("Erreur lors de la mise à jour du statut de l'utilisateur {}: {}", 
	                            identifier, e.getMessage(), e);
	                return false;
	            }
	        } else {
	            logger.info("L'utilisateur {} est déjà déconnecté, aucune action nécessaire", utilisateur.getEmail());
	            return true; // On considère que c'est un succès puisque l'état final est celui souhaité
	        }
	    } else {
	        logger.warn("Impossible de marquer l'utilisateur comme déconnecté: utilisateur non trouvé pour l'identifiant {}", identifier);
	        return false;
	    }
	}
	
	@Transactional(readOnly = true)
	public boolean isUserOnline(String email) {
	    Optional<UtilisateurEntity> utilisateurOpt = utilisateurRepository.findByEmail(email);
	    return utilisateurOpt.map(UtilisateurEntity::isOnline).orElse(false);
	}
	
	
	@Transactional
	public boolean setUserOfflineByPartialMatch(String searchTerm) {
	    if (searchTerm == null || searchTerm.trim().isEmpty()) {
	        logger.warn("Terme de recherche vide pour la déconnexion par correspondance partielle");
	        return false;
	    }
	    
	    searchTerm = searchTerm.trim().toLowerCase();
	    logger.info("Recherche d'utilisateurs avec terme: '{}'", searchTerm);
	    
	    // Rechercher les utilisateurs connectés
	    List<UtilisateurEntity> onlineUsers = utilisateurRepository.findByOnlineTrue();
	    logger.info("Nombre d'utilisateurs actuellement en ligne: {}", onlineUsers.size());
	    
	    boolean anySuccess = false;
	    
	    // Parcourir les utilisateurs en ligne et déconnecter ceux dont l'email correspond
	    for (UtilisateurEntity user : onlineUsers) {
	        String userEmail = user.getEmail() != null ? user.getEmail().toLowerCase() : "";
	        String userPhone = user.getPhone() != null ? user.getPhone() : "";
	        
	        // Si l'email ou le téléphone contient le terme de recherche, déconnecter l'utilisateur
	        if (!userEmail.isEmpty() && userEmail.contains(searchTerm) || 
	            !userPhone.isEmpty() && userPhone.contains(searchTerm)) {
	            
	            logger.info("Correspondance trouvée pour l'utilisateur: {} (recherche: '{}')", 
	                       userEmail, searchTerm);
	            
	            user.setOnline(false);
	            user.setLastTokenExpiration(null);
	            
	            try {
	                utilisateurRepository.save(user);
	                logger.info("Utilisateur {} déconnecté avec succès via correspondance partielle", userEmail);
	                anySuccess = true;
	            } catch (Exception e) {
	                logger.error("Erreur lors de la mise à jour du statut de l'utilisateur {}: {}", 
	                            userEmail, e.getMessage(), e);
	            }
	        }
	    }
	    
	    return anySuccess;
	}
}
