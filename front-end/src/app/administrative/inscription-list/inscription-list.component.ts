import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  page = 1;
  pageSize = 2;
    
  editAddLabel: string = 'Edit';
  inscriptionDetail: Inscription |null=null;
  totalLengthOfCollection: number=0;

constructor(private modalService: NgbModal, private inscriptionService:InscriptionService) {
   this.filtreInscription = this.inscriptionList;
   this.cfiltreInscriptionList = this.inscriptionList;
   this.sortInscriptionList = this.inscriptionList;
}


parentProperty = new Inscription();
    ngOnInit() {
    this.getInscription();
}

getInscription(){
    this.inscriptionService.getInscriptions().subscribe( res => {
    console.log(res)
    this.cfiltreInscriptionList = res
    this.totalLengthOfCollection = res.length
    });
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
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfiltreInscriptionList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreInscriptionList.length;
  }

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



}
