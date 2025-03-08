package com.org.sfors.serviceImp;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.org.sfors.entity.UtilisateurEntity;
import com.org.sfors.mapper.Mapper;
import com.org.sfors.repository.UtilisateurRepository;


@Service
public class JwtUserDetailsService implements UserDetailsService {
    Logger logger = LoggerFactory.getLogger(JwtUserDetailsService.class);
    
    @Autowired
    UtilisateurRepository utilisateurRepository;
    
    // Ajoutez ce flag pour identifier si c'est pour une authentification
    private ThreadLocal<Boolean> isAuthenticating = new ThreadLocal<Boolean>() {
        @Override
        protected Boolean initialValue() {
            return false;
        }
    };
    
    // Méthode à appeler avant l'authentification
    public void setAuthenticating(boolean authenticating) {
        isAuthenticating.set(authenticating);
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UtilisateurEntity> findByEmail = utilisateurRepository.findByEmail(username);
        if (findByEmail.isPresent()) {
            UtilisateurEntity utilisateur = findByEmail.get();
            logger.info("user found {}", utilisateur.getPassword());
            
            // Ne mettre à jour le statut online que lors d'une connexion explicite
            if (isAuthenticating.get()) {
                utilisateur.setOnline(true);
                utilisateurRepository.save(utilisateur);
                logger.info("Utilisateur {} marqué comme connecté", username);
            }
            
            return (Mapper.toUserDetails(utilisateur));
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
