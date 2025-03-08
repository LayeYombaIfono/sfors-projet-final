import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/Utilisateur';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html'
})
export class UtilisateurFormComponent implements OnInit {
  @Input() utilisateur: Utilisateur | null = null;
  @Input() utilisateurId: string | null = null; // Nouvel input pour recevoir l'ID
  @Output() saveUser = new EventEmitter<Utilisateur>();
  utilisateurForm!: FormGroup;
  passwordForm!: FormGroup;
  isNewUser: boolean = true;
  isSubmitting: boolean = false;
  isLoading: boolean = false; // Pour indiquer le chargement des données

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {
    this.initializeForms();
  }

  private initializeForms() {
    this.utilisateurForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      roles: ['', Validators.required]
    });
    this.passwordForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
      ]]
    });
  }

  ngOnInit(): void {
    // Si on a un ID mais pas d'objet utilisateur complet, on récupère les données
    if (this.utilisateurId && !this.utilisateur) {
      this.loadUserById(this.utilisateurId);
    } 
    // Si on a directement l'objet utilisateur
    else if (this.utilisateur) {
      this.isNewUser = false;
      this.loadUserData();
    } 
    // Sinon, c'est un nouvel utilisateur
    else {
      this.isNewUser = true;
      this.passwordForm.get('oldPassword')?.removeValidators(Validators.required);
      // Pour un nouvel utilisateur, le mot de passe est requis
      this.passwordForm.get('newPassword')?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
      ]);
      this.passwordForm.get('newPassword')?.updateValueAndValidity();
    }
  }

  // Nouvelle méthode pour charger un utilisateur par son ID
  private loadUserById(uuid: string) {
    this.isLoading = true;
    this.utilisateurService.getUtilisateur(uuid).subscribe({
      next: (userData) => {
        this.utilisateur = userData;
        this.isNewUser = false;
        this.loadUserData();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur de chargement',
          text: 'Impossible de récupérer les données de l\'utilisateur'
        });
      }
    });
  }

  private loadUserData() {
    if (this.utilisateur) {
      // Remplir le formulaire avec les données de l'utilisateur
      this.utilisateurForm.patchValue({
        email: this.utilisateur.email,
        phone: this.utilisateur.phone,
        roles: this.utilisateur.roles?.[0]
      });

      // Pour un utilisateur existant, le mot de passe n'est requis que si l'ancien est fourni
      this.passwordForm.get('oldPassword')?.setValidators([]);
      this.passwordForm.get('newPassword')?.setValidators([
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
      ]);
      this.passwordForm.get('oldPassword')?.updateValueAndValidity();
      this.passwordForm.get('newPassword')?.updateValueAndValidity();
    }
  }

 /*
save(): void {
  if (this.utilisateurForm.valid && (this.isNewUser || this.passwordForm.valid)) {
    this.isSubmitting = true;
    
    // Récupérer la valeur du rôle sélectionnée
    const roleValue = this.utilisateurForm.get('roles')?.value;
    
    // Créer l'objet de base avec toutes les propriétés existantes
    const userData: Utilisateur = {
      ...this.utilisateur, // Conserver les données existantes (comme l'ID)
      email: this.utilisateurForm.get('email')?.value,
      phone: this.utilisateurForm.get('phone')?.value,
      // Définir roles comme un tableau
      roles: roleValue ? [{ name: roleValue}] : [],
      ...(this.passwordForm.get('newPassword')?.value && {
        password: this.passwordForm.get('newPassword')?.value,
        ...(this.passwordForm.get('oldPassword')?.value && {
          oldPassword: this.passwordForm.get('oldPassword')?.value
        })
      })
    };
    // Supprimer la propriété role pour éviter des confusions avec roles
  //  delete userData.roles;
    
    console.log('Données à envoyer:', userData); // Log pour débogage
    
    if (this.isNewUser) {
      // Création d'un nouvel utilisateur
      this.utilisateurService.createUtilisateur(userData).subscribe({
        next: (createdUser) => {
          this.isSubmitting = false;
          this.saveUser.emit(createdUser);
          Swal.fire({
            icon: 'success',
            title: 'Création réussie',
            text: 'L\'utilisateur a été créé avec succès'
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de la création',
            text: error.message || 'Une erreur est survenue lors de la création de l\'utilisateur'
          });
        }
      });
    } else {
      // Mise à jour d'un utilisateur existant
      if (this.utilisateur && this.utilisateur.uuid) {
        this.utilisateurService.updateUtilisateur(this.utilisateur.uuid, userData).subscribe({
          next: (updatedUser) => {
            this.isSubmitting = false;
            this.saveUser.emit(updatedUser);
            Swal.fire({
              icon: 'success',
              title: 'Modification réussie',
              text: 'Les modifications ont été enregistrées'
            });
          },
          error: (error) => {
            this.isSubmitting = false;
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de la mise à jour',
              text: error.message || 'Une erreur est survenue lors de la mise à jour de l\'utilisateur'
            });
          }
        });
      } else {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'identification',
          text: 'UUID de l\'utilisateur manquant pour la mise à jour'
        });
      }
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur de validation',
      text: 'Veuillez vérifier les champs du formulaire'
    });
  }
}
  */
save(): void {
  if (this.utilisateurForm.valid && (this.isNewUser || this.passwordForm.valid)) {
    this.isSubmitting = true;
   
    // Récupérer la valeur du rôle sélectionnée
    const roleValue = this.utilisateurForm.get('roles')?.value;
   
    // Créer l'objet de base avec toutes les propriétés existantes
    const userData: Utilisateur = {
      ...this.utilisateur, // Conserver les données existantes (comme l'ID)
      email: this.utilisateurForm.get('email')?.value,
      phone: this.utilisateurForm.get('phone')?.value,
      // Définir roles comme un tableau de chaînes, pas d'objets
      roles: roleValue ? [roleValue] : [],
      ...(this.passwordForm.get('newPassword')?.value && {
        password: this.passwordForm.get('newPassword')?.value,
        ...(this.passwordForm.get('oldPassword')?.value && {
          oldPassword: this.passwordForm.get('oldPassword')?.value
        })
      })
    };
   
    console.log('Données à envoyer:', userData); // Log pour débogage
   
    if (this.isNewUser) {
      // Création d'un nouvel utilisateur
      this.utilisateurService.createUtilisateur(userData).subscribe({
        next: (createdUser) => {
          this.isSubmitting = false;
          this.saveUser.emit(createdUser);
          Swal.fire({
            icon: 'success',
            title: 'Création réussie',
            text: 'L\'utilisateur a été créé avec succès'
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de la création',
            text: error.message || 'Une erreur est survenue lors de la création de l\'utilisateur'
          });
        }
      });
    } else {
      // Mise à jour d'un utilisateur existant
      if (this.utilisateur && this.utilisateur.uuid) {
        this.utilisateurService.updateUtilisateur(this.utilisateur.uuid, userData).subscribe({
          next: (updatedUser) => {
            this.isSubmitting = false;
            this.saveUser.emit(updatedUser);
            Swal.fire({
              icon: 'success',
              title: 'Modification réussie',
              text: 'Les modifications ont été enregistrées'
            });
          },
          error: (error) => {
            this.isSubmitting = false;
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de la mise à jour',
              text: error.message || 'Une erreur est survenue lors de la mise à jour de l\'utilisateur'
            });
          }
        });
      } else {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'identification',
          text: 'UUID de l\'utilisateur manquant pour la mise à jour'
        });
      }
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur de validation',
      text: 'Veuillez vérifier les champs du formulaire'
    });
  }
}
      // Reste du code inchangé...
 // Getters pour la validation
  get emailControl() { return this.utilisateurForm.get('email'); }
  get phoneControl() { return this.utilisateurForm.get('phone'); }
  get roleControl() { return this.utilisateurForm.get('roles'); }
}
