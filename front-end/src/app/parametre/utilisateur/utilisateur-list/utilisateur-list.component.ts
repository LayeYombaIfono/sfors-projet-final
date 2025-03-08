import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Utilisateur } from 'src/app/models/Utilisateur';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.css']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  utilisateursAffiches: Utilisateur[] = [];
  selectedUser: Utilisateur | null = null;
  utilisateursFiltrés: Utilisateur[] = [];    // Après filtrage, avant pagination

  searchControl = new FormControl('');
  loading = false;
  error = '';
  
  // Pagination
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  Math = Math; // Pour utiliser Math.min dans le template

  constructor(
    private utilisateurService: UtilisateurService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadUtilisateurs();
    
    // Configuration de la recherche
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filtrerUtilisateurs(value || '');
    });
  }

  loadUtilisateurs(): void {
    this.loading = true;
    this.error = '';
    
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.filtrerUtilisateurs(this.searchControl.value || '');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs: ' + (err.message || 'Erreur inconnue');
        this.loading = false;
      }
    });
  }
  filtrerUtilisateurs(texte: string): void {
    // Filtrage par email, téléphone ou rôle
    const termeRecherche = texte.toLowerCase().trim();
   
    if (!termeRecherche) {
      this.utilisateursFiltrés = [...this.utilisateurs];
    } else {
      this.utilisateursFiltrés = this.utilisateurs.filter(user => {
        return (
          (user.email && user.email.toLowerCase().includes(termeRecherche)) ||
          (user.phone && user.phone.toLowerCase().includes(termeRecherche)) ||
          (user.roles && user.roles.some((role: string) => 
            role.toLowerCase().includes(termeRecherche)
          ))
        );
      });
    }
   
    // Mise à jour de la pagination
    this.collectionSize = this.utilisateursFiltrés.length;
    this.refreshAffichage();
  }
  /*
  filtrerUtilisateurs(texte: string): void {
    // Filtrage par email, téléphone ou rôle
    const termeRecherche = texte.toLowerCase().trim();
   
    if (!termeRecherche) {
      this.utilisateursAffiches = [...this.utilisateurs];
    } else {
      this.utilisateursAffiches = this.utilisateurs.filter(user => {
        return (
          (user.email && user.email.toLowerCase().includes(termeRecherche)) ||
          (user.phone && user.phone.toLowerCase().includes(termeRecherche)) ||
          (user.roles && user.roles.some(role => 
            role.toLowerCase().includes(termeRecherche)
          ))
        );
      });
    }
   
    // Mise à jour de la pagination
    this.collectionSize = this.utilisateursAffiches.length;
    this.refreshAffichage();
  }
  */
/*
  filtrerUtilisateurs(texte: string): void {
    // Filtrage par email, téléphone ou rôle
    const termeRecherche = texte.toLowerCase().trim();
   
    if (!termeRecherche) {
      this.utilisateursAffiches = [...this.utilisateurs];
    } else {
      this.utilisateursAffiches = this.utilisateurs.filter(user => {
        return (
          (user.email && user.email.toLowerCase().includes(termeRecherche)) ||
          (user.phone && user.phone.toLowerCase().includes(termeRecherche)) ||
          (user.roles && user.roles.some(role => 
            role.name.toLowerCase().includes(termeRecherche)
          ))
        );
      });
    }
   
    // Mise à jour de la pagination
    this.collectionSize = this.utilisateursAffiches.length;
    this.refreshAffichage();
  }
*/
/*
filtrerUtilisateurs(texte: string): void {
  // Filtrage par email, téléphone ou rôle
  const termeRecherche = texte.toLowerCase().trim();
 
  if (!termeRecherche) {
    this.utilisateursAffiches = [...this.utilisateurs];
  } else {
    this.utilisateursAffiches = this.utilisateurs.filter(user => {
      return (
        (user.email && user.email.toLowerCase().includes(termeRecherche)) ||
        (user.phone && user.phone.toLowerCase().includes(termeRecherche)) ||
        (user.roles && user.roles.some(role => {
          // Vérifier si role est une chaîne ou un objet
          if (typeof role === 'string') {
            return role.name.toLowerCase().includes(termeRecherche);
          } else if (role && typeof role === 'object' && 'name' in role) {
            return role.name.toLowerCase().includes(termeRecherche);
          }
          return false;
        }))
      );
    });
  }
 
  // Mise à jour de la pagination
  this.collectionSize = this.utilisateursAffiches.length;
  this.refreshAffichage();
}  
*/

refreshAffichage(): void {
  // Mise à jour des utilisateurs affichés selon la pagination
  const debut = (this.page - 1) * this.pageSize;
  const fin = this.page * this.pageSize;
  this.utilisateursAffiches = this.utilisateursFiltrés.slice(debut, fin);
}
 /* refreshAffichage(): void {
    // Mise à jour des utilisateurs affichés selon la pagination
    this.utilisateursAffiches = this.utilisateursAffiches
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }
*/
  onPageChange(page: number): void {
    this.page = page;
    this.refreshAffichage();
  }

  onPageSizeChange(): void {
    this.page = 1; // Retour à la première page
    this.refreshAffichage();
  }

  /**
   * Ouvre le modal pour créer ou modifier un utilisateur
   */
  openModal(content: any, utilisateur: Utilisateur | null = null): void {
    this.selectedUser = utilisateur;
    
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * Gère la sauvegarde d'un utilisateur (création ou modification)
   */
  onSaveUser(userData: Utilisateur): void {
    // Rafraîchir la liste après sauvegarde
    this.loadUtilisateurs();
  }

  /**
   * Supprime un utilisateur après confirmation
   */
  deleteUtilisateur(utilisateur: Utilisateur): void {
    if (!utilisateur || !utilisateur.uuid) {
      return;
    }

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer l'utilisateur ${utilisateur.email} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        
        this.utilisateurService.deleteUtilisateur(utilisateur.uuid!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'L\'utilisateur a été supprimé avec succès.',
              icon: 'success'
            });
            
            this.loadUtilisateurs();
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Erreur lors de la suppression: ' + (err.message || 'Erreur inconnue'),
              icon: 'error'
            });
            
            this.loading = false;
          }
        });
      }
    });
  }

  /**
   * Optimisation des performances pour ngFor
   */
  trackByFn(index: number, item: Utilisateur): string {
    return item.uuid || index.toString();
  }
}
