import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Inscription } from 'src/app/models/Inscription';
import { InscriptionService } from 'src/app/services/inscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.scss']
})
export class InscriptionListComponent implements OnInit{


  inscriptionList!:Inscription[];
  sortInscriptionList:Inscription[] = [];
  filtreInscription:Inscription[] = [];
  cfiltreInscriptionList:Inscription[] = [];
 // page = 1;
  //pageSize = 2;

  // Pagination variables
      cpage = 1;
      cpageSize = 4;
      totalLengthOfCollection: number = 0;
      
      // Remplace l'ancien système de recherche
      searchControl = new FormControl('');
      loading = false;
      error = '';
    
  editAddLabel: string = 'Edit';
  inscriptionDetail: Inscription |null=null;
  //totalLengthOfCollection: number=0;

constructor(private modalService: NgbModal, private inscriptionService:InscriptionService) {
   this.filtreInscription = this.inscriptionList;
   this.cfiltreInscriptionList = this.inscriptionList;
   this.sortInscriptionList = this.inscriptionList;
}


parentProperty = new Inscription();

ngOnInit() {
  this.getInscription();
  
  // Configuration de la recherche avec debounce
  this.searchControl.valueChanges.pipe(
    debounceTime(300), // Attendre 300ms après la dernière frappe
    distinctUntilChanged() // Ignorer si la valeur n'a pas changé
  ).subscribe(value => {
    this.filtrerInscriptions(value || '');
  });
}

getInscription() {
  this.loading = true;
  this.error = '';
  
  this.inscriptionService.getInscriptions().subscribe({
    next: (res) => {
      this.inscriptionList = res;
      this.cfiltreInscriptionList = res;
      this.totalLengthOfCollection = res.length;
      this.loading = false;
      
      // Filtrer les résultats si une recherche est déjà en cours
      if (this.searchControl.value) {
        this.filtrerInscriptions(this.searchControl.value);
      }
    },
    error: (err) => {
      this.error = 'Erreur lors du chargement des inscriptions: ' + (err.message || 'Erreur inconnue');
      this.loading = false;
    }
  });
}

filtrerInscriptions(texte: string): void {
  // Filtrage par tous les champs pertinents
  const termeRecherche = texte.toLowerCase().trim();
 
  if (!termeRecherche) {
    this.cfiltreInscriptionList = [...this.inscriptionList];
  } else {
    this.cfiltreInscriptionList = this.inscriptionList.filter(inscription => 
      (inscription.entrepriseName && inscription.entrepriseName.toLowerCase().includes(termeRecherche)) ||
      (inscription.codeNif && inscription.codeNif.toLowerCase().includes(termeRecherche)) ||
      (inscription.codeRccm && inscription.codeRccm.toLowerCase().includes(termeRecherche)) ||
      (inscription.codeDeclarant && inscription.codeDeclarant.toLowerCase().includes(termeRecherche)) ||
      (inscription.email && inscription.email.toLowerCase().includes(termeRecherche)) ||
      (inscription.nom && inscription.nom.toLowerCase().includes(termeRecherche)) ||
      (inscription.prenoms && inscription.prenoms.toLowerCase().includes(termeRecherche)) ||
      (inscription.telephone && inscription.telephone.toLowerCase().includes(termeRecherche)) ||
      (inscription.adress && inscription.adress.toLowerCase().includes(termeRecherche)) ||
      (inscription.sexe && inscription.sexe.toLowerCase().includes(termeRecherche)) ||
      (inscription.status && inscription.status.toLowerCase().includes(termeRecherche)) ||
      (inscription.lebelleFormation && inscription.lebelleFormation.toLowerCase().includes(termeRecherche)) ||
      (inscription.dateInscription && inscription.dateInscription.toString().toLowerCase().includes(termeRecherche))
    );
  }
 
  // Mise à jour des totaux pour la pagination
  this.totalLengthOfCollection = this.cfiltreInscriptionList.length;
}

// Pour maintenir la compatibilité avec l'ancien système si nécessaire
get csearchTerm(): string {
  return this.searchControl.value || '';
}

set csearchTerm(val: string) {
  this.searchControl.setValue(val);
}
   


/**
 * Searching..........
 */
_searchTerm: string='';
get searchTerm(): string {
  return this._searchTerm;
}
set searchTerm(val: string) {
  this._searchTerm = val;
  this.filtreInscription = this.filter(val);
}

filter(v: string) {
  return this.inscriptionList.filter(inscription => 
    inscription.entrepriseName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.codeNif?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.codeRccm?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.codeDeclarant?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.telephone?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    inscription.adress?.toLowerCase().indexOf(v.toLowerCase()) !== -1
  );
}


  //complete example................
 

  _csearchTerm: string='';


  cfilter(v: string) {
    return this.inscriptionList.filter(inscription => 
      inscription.entrepriseName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.codeNif?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.codeRccm?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.codeDeclarant?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.telephone?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      inscription.adress?.toLowerCase().indexOf(v.toLowerCase()) !== -1
    );
  }


   openModal(targetModal:NgbModal, inscription:any) {
        
        this.modalService.open(targetModal, {
          centered: true,
          backdrop: 'static',
           size:"xl"
        });
    
        if (inscription == null) {
          this.editAddLabel = 'Nouvelle'
          this.parentProperty = new Inscription()
        }
    
        if (inscription != null) {
          this.inscriptionDetail = inscription;
          this.editAddLabel = 'Validation'
          this.parentProperty = inscription;
        }
    
      }
    
      closeBtnClick() {
        this.modalService.dismissAll()
        this.ngOnInit();
      }


       delete(uuid: string): void {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
              title: 'Voulez vous supprimez?',
              text: "Impposible de restaurer",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui',
              cancelButtonText: 'Non',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.inscriptionService.deleteInscription(uuid).then(()=>  {
                  swalWithBootstrapButtons.fire(
                    'Suppression !',
                    'Suppression effectuer avec success.',
                    'success'
                  )
                  this.getInscription()
                })
               
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Suppression',
                  'Suppression annuler',
                  'error'
                )
              }
            })
          }

          // Optimisation des performances pour ngFor
  trackByFn(index: number, item: Inscription): string {
    return item.uuid || index.toString();
  }



}
