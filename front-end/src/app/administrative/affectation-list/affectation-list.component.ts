import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  affectationDetail: Affectation |null=null;
  totalLengthOfCollection: number=0;
    

  constructor(private modalService: NgbModal, private affectationService:AffectationService) {
    this.filtreAffectation = this.affectationList;
    this.cfiltreAffectationList = this.affectationList;
    this.sortAffectationList = this.affectationList;
  }

  parentProperty = new Affectation();
  
    ngOnInit() {
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
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfiltreAffectationList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreAffectationList.length;
  }


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

  }
  