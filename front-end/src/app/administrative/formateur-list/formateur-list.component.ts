import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Formateur } from 'src/app/models/Formateur';
import { FormateurService } from 'src/app/services/formateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formateur-list',
  templateUrl: './formateur-list.component.html',
  styleUrls: ['./formateur-list.component.scss']
})
export class FormateurListComponent implements OnInit{

  formateurList!:Formateur[];
  sortFormateurList:Formateur[] = [];
  filtreFormateur:Formateur[] = [];
  cfiltreFormateurList:Formateur[] = [];
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
  formateurDetail: Formateur |null=null;
 // totalLengthOfCollection: number=0;


  constructor(private modalService: NgbModal, private formateurService:FormateurService) {
    this.filtreFormateur = this.formateurList;
    this.cfiltreFormateurList = this.formateurList;
    this.sortFormateurList = this.formateurList;
    //this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  parentProperty = new Formateur();

  ngOnInit() {
    this.getFormateurs();
    
    // Configuration de la recherche avec debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Attendre 300ms après la dernière frappe
      distinctUntilChanged() // Ignorer si la valeur n'a pas changé
    ).subscribe(value => {
      this.filtrerFormateurs(value || '');
    });
  }

  getFormateurs() {
    this.loading = true;
    this.error = '';
    
    this.formateurService.getFormateurs().subscribe({
      next: (res) => {
        this.formateurList = res;
        this.cfiltreFormateurList = res;
        this.totalLengthOfCollection = res.length;
        this.loading = false;
        
        // Filtrer les résultats si une recherche est déjà en cours
        if (this.searchControl.value) {
          this.filtrerFormateurs(this.searchControl.value);
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des formateurs: ' + (err.message || 'Erreur inconnue');
        this.loading = false;
      }
    });
  }

  filtrerFormateurs(texte: string): void {
    // Filtrage par tous les champs pertinents
    const termeRecherche = texte.toLowerCase().trim();
   
    if (!termeRecherche) {
      this.cfiltreFormateurList = [...this.formateurList];
    } else {
      this.cfiltreFormateurList = this.formateurList.filter(formateur => 
        (formateur.nom && formateur.nom.toLowerCase().includes(termeRecherche)) ||
        (formateur.prenoms && formateur.prenoms.toLowerCase().includes(termeRecherche)) ||
        (formateur.phone && formateur.phone.toLowerCase().includes(termeRecherche)) ||
        (formateur.email && formateur.email.toLowerCase().includes(termeRecherche)) ||
        (formateur.adress && formateur.adress.toLowerCase().includes(termeRecherche)) ||
        (formateur.sexe && formateur.sexe.toLowerCase().includes(termeRecherche)) ||
        (formateur.profession && formateur.profession.toLowerCase().includes(termeRecherche))
      );
    }
   
    // Mise à jour des totaux pour la pagination
    this.totalLengthOfCollection = this.cfiltreFormateurList.length;
  }

  // Pour maintenir la compatibilité avec l'ancien système si nécessaire
  get csearchTerm(): string {
    return this.searchControl.value || '';
  }
  
  set csearchTerm(val: string) {
    this.searchControl.setValue(val);
  }

  


 
 

   //Searching..........
 _searchTerm: string='';
 get searchTerm(): string {
   return this._searchTerm;
 }
 set searchTerm(val: string) {
   this._searchTerm = val;
   this.filtreFormateur = this.filter(val);
 }
 filter(v: string) {
  return this.formateurList.filter(formateur => 
    formateur.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    formateur.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||

    formateur.phone?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    formateur.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||

    formateur.adress?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    formateur.sexe?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
  );
}

//cpage = 1;
  //cpageSize = 4;

  _csearchTerm: string='';


  cfilter(v: string) {
    return this.formateurList.filter(formateur => 
      formateur.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      formateur.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
  
      formateur.phone?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      formateur.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
  
      formateur.adress?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      formateur.sexe?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
  }

   openModal(targetModal:NgbModal, formateur:any) {
      
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
         size:"lg"
      });
  
      if (formateur == null) {
        this.editAddLabel = 'Ajout'
        this.parentProperty = new Formateur()
      }
  
      if (formateur != null) {
        this.formateurDetail = formateur;
        this.editAddLabel = 'Modification'
        this.parentProperty = formateur;
       
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
              this.formateurService.deleteFormateur(uuid).then(()=>  {
                swalWithBootstrapButtons.fire(
                  'Suppression !',
                  'Suppression effectuer avec success.',
                  'success'
                )
                this.getFormateurs()
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
  trackByFn(index: number, item: Formateur): string {
    return item.uuid || index.toString();
  }

}
