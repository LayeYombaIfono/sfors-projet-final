import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Affectation } from 'src/app/models/Affectation';
import { AffectationService } from 'src/app/services/affectation.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-affectation-list',
  templateUrl: './affectation-list.component.html',
  styleUrls: ['./affectation-list.component.scss']
})
export class AffectationListComponent implements OnInit {

  affectationList!:Affectation[];
  sortAffectationList:Affectation[] = [];
  filtreAffectation:Affectation[] = [];
  cfiltreAffectationList:Affectation[] = [];
  //page = 1;
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
  affectationDetail: Affectation |null=null;
  //totalLengthOfCollection: number=0;
    

  constructor(private modalService: NgbModal, private affectationService:AffectationService) {
    this.filtreAffectation = this.affectationList;
    this.cfiltreAffectationList = this.affectationList;
    this.sortAffectationList = this.affectationList;
  }

  parentProperty = new Affectation();


  ngOnInit() {
    this.getAffectations();
    
    // Configuration de la recherche avec debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Attendre 300ms après la dernière frappe
      distinctUntilChanged() // Ignorer si la valeur n'a pas changé
    ).subscribe(value => {
      this.filtrerAffectations(value || '');
    });
  }

  getAffectations() {
    this.loading = true;
    this.error = '';
    
    this.affectationService.getAffectations().subscribe({
      next: (res) => {
        this.affectationList = res;
        this.cfiltreAffectationList = res;
        this.totalLengthOfCollection = res.length;
        this.loading = false;
        
        // Filtrer les résultats si une recherche est déjà en cours
        if (this.searchControl.value) {
          this.filtrerAffectations(this.searchControl.value);
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des affectations: ' + (err.message || 'Erreur inconnue');
        this.loading = false;
      }
    });
  }

  filtrerAffectations(texte: string): void {
    // Filtrage par nom, prénom formateur, libellé formation ou description
    const termeRecherche = texte.toLowerCase().trim();
   
    if (!termeRecherche) {
      this.cfiltreAffectationList = [...this.affectationList];
    } else {
      this.cfiltreAffectationList = this.affectationList.filter(affectation => 
        (affectation.nomFormateur && affectation.nomFormateur.toLowerCase().includes(termeRecherche)) ||
        (affectation.prenomFormateur && affectation.prenomFormateur.toLowerCase().includes(termeRecherche)) ||
        (affectation.libelleFormation && affectation.libelleFormation.toLowerCase().includes(termeRecherche)) ||
        (affectation.descriptionFormation && affectation.descriptionFormation.toLowerCase().includes(termeRecherche)) ||
        (affectation.dateAffectation && affectation.dateAffectation.toString().toLowerCase().includes(termeRecherche))
      );
    }
   
    // Mise à jour des totaux pour la pagination
    this.totalLengthOfCollection = this.cfiltreAffectationList.length;
  }

  // Pour maintenir la compatibilité avec l'ancien système si nécessaire
  get csearchTerm(): string {
    return this.searchControl.value || '';
  }
  
  set csearchTerm(val: string) {
    this.searchControl.setValue(val);
  }
  
   /* ngOnInit() {
      this.getAffectations()
    }
  

    getAffectations(){
      this.affectationService.getAffectations().subscribe( res => {
        console.log("res");
        console.log(res);
        console.log("res");
        this.cfiltreAffectationList = res
        this.totalLengthOfCollection = res.length
      });
    }
  
*/
     //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filtreAffectation = this.filter(val);
  }

  filter(v: string) {
    return this.affectationList.filter(affectation => 
      affectation.nomFormateur?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      affectation.prenomFormateur?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      affectation.libelleFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
    );
  }

  //complete example................
 // cpage = 1;
 // cpageSize = 4;

  _csearchTerm: string='';
/*  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfiltreAffectationList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreAffectationList.length;
  }
*/

  cfilter(v: string) {
    return this.affectationList.filter(affectation => 
      affectation.nomFormateur?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      affectation.prenomFormateur?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      affectation.libelleFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
    );
  }

   openModal(targetModal:NgbModal, affectation:any) {
      
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
         size:"lg"
      });
  
      if (affectation == null) {
        this.editAddLabel = 'Nouvelle'
        this.parentProperty = new Affectation()
      }
  
      if (affectation != null) {
        this.affectationDetail = affectation;
        this.editAddLabel = 'Update'
        this.parentProperty = affectation;
       
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
          this.affectationService.deleteAffectation(uuid).then(()=>  {
            swalWithBootstrapButtons.fire(
              'Suppression !',
              'Suppression effectuer avec success.',
              'success'
            )
            this.getAffectations()
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
  trackByFn(index: number, item: Affectation): string {
    return item.uuid || index.toString();
  }

  }
  