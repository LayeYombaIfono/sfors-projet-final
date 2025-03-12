import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { FormationService } from 'src/app/services/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent  implements OnInit{

  formationList!:Formation[];
  sortFormationList:Formation[] = [];
  filtreFormation:Formation[] = [];
  cfiltreFormationList:Formation[] = [];
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
  formationDetail: Formation |null=null;
  //totalLengthOfCollection: number=0;


  constructor(private modalService: NgbModal, private formationService:FormationService) {
    this.filtreFormation = this.formationList;
    this.cfiltreFormationList = this.formationList;
    this.sortFormationList = this.formationList;
    //this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  parentProperty = new Formation();
 /* ngOnInit() {
   this.getFormations()
 }

 getFormations(){
  this.formationService.getFormations().subscribe( res => {
    console.log("res");
    console.log(res);
    console.log("res");
    this.cfiltreFormationList = res
    this.totalLengthOfCollection = res.length
  });
}
  */

ngOnInit() {
  this.getFormations();
  
  // Configuration de la recherche avec debounce
  this.searchControl.valueChanges.pipe(
    debounceTime(300), // Attendre 300ms après la dernière frappe
    distinctUntilChanged() // Ignorer si la valeur n'a pas changé
  ).subscribe(value => {
    this.filtrerFormations(value || '');
  });
}

getFormations() {
  this.loading = true;
  this.error = '';
  
  this.formationService.getFormations().subscribe({
    next: (res) => {
      this.formationList = res;
      this.cfiltreFormationList = res;
      this.totalLengthOfCollection = res.length;
      this.loading = false;
      
      // Filtrer les résultats si une recherche est déjà en cours
      if (this.searchControl.value) {
        this.filtrerFormations(this.searchControl.value);
      }
    },
    error: (err) => {
      this.error = 'Erreur lors du chargement des formations: ' + (err.message || 'Erreur inconnue');
      this.loading = false;
    }
  });
}

filtrerFormations(texte: string): void {
  // Filtrage par libellé et description
  const termeRecherche = texte.toLowerCase().trim();
 
  if (!termeRecherche) {
    this.cfiltreFormationList = [...this.formationList];
  } else {
    this.cfiltreFormationList = this.formationList.filter(formation => 
      (formation.libelleFormation && formation.libelleFormation.toLowerCase().includes(termeRecherche)) ||
      (formation.descriptionFormation && formation.descriptionFormation.toLowerCase().includes(termeRecherche))
    );
  }
 
  // Mise à jour des totaux pour la pagination
  this.totalLengthOfCollection = this.cfiltreFormationList.length;
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
   this.filtreFormation = this.filter(val);
 }
 filter(v: string) {
  return this.formationList.filter(x => 
    x.libelleFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    x.descriptionFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1
  );
}

//cpage = 1;
  //cpageSize = 4;

  _csearchTerm: string='';
  /*get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfiltreFormationList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreFormationList.length;
  }
*/
  cfilter(v: string) {
    return this.formationList.filter(x => 
    x.libelleFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    x.descriptionFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }

   openModal(targetModal:NgbModal, formation:any) {
      
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
         size:"lg"
      });
  
      if (formation == null) {
        this.editAddLabel = 'Nouvelle'
        this.parentProperty = new Formation()
      }
  
      if (formation != null) {
        this.formationDetail = formation;
        this.editAddLabel = 'Update'
        this.parentProperty = formation;
       
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
          this.formationService.deleteFormation(uuid).then(()=>  {
            swalWithBootstrapButtons.fire(
              'Suppression !',
              'Suppression effectuer avec success.',
              'success'
            )
            this.getFormations()
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
  trackByFn(index: number, item: Formation): string {
    return item.uuid || index.toString();
  }
}
