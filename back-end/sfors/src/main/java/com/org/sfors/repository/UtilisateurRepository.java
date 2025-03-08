package com.org.sfors.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.org.sfors.entity.UtilisateurEntity;

public interface UtilisateurRepository extends CrudRepository<UtilisateurEntity, String> {
    
    @Query("select u from UtilisateurEntity u where u.email=:x or u.phone=:x")
    Optional<UtilisateurEntity> findByEmail(@Param("x") String email);
    
    @Query("select u from UtilisateurEntity u")
    List<UtilisateurEntity> findAll();
    
    // Méthode existante pour trouver les utilisateurs en ligne
    List<UtilisateurEntity> findByOnlineTrue();
    
    // Méthode pour trouver les utilisateurs en ligne avec token expiré
    @Query("select u from UtilisateurEntity u where u.online = true and u.lastTokenExpiration is not null and u.lastTokenExpiration < :date")
    List<UtilisateurEntity> findByOnlineTrueAndLastTokenExpirationBefore(@Param("date") Date date);


    
  
    
   
}
