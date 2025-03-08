import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  page = 1;
  pageSize = 2;


  editAddLabel: string = 'Edit';
  formationDetail: Formation |null=null;
  totalLengthOfCollection: number=0;


  constructor(private modalService: NgbModal, private formationService:FormationService) {
    this.filtreFormation = this.formationList;
    this.cfiltreFormationList = this.formationList;
    this.sortFormationList = this.formationList;
    //this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  parentProperty = new Formation();
  ngOnInit() {
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

cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfiltreFormationList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreFormationList.length;
  }

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

}
