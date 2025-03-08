import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  page = 1;
  pageSize = 2;


  editAddLabel: string = 'Edit';
  formateurDetail: Formateur |null=null;
  totalLengthOfCollection: number=0;


  constructor(private modalService: NgbModal, private formateurService:FormateurService) {
    this.filtreFormateur = this.formateurList;
    this.cfiltreFormateurList = this.formateurList;
    this.sortFormateurList = this.formateurList;
    //this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  parentProperty = new Formateur();

  ngOnInit() {
    this.getFormateurs()
  }


  getFormateurs(){
    this.formateurService.getFormateurs().subscribe( res => {
      console.log("res");
      console.log(res);
      console.log("res");
      this.cfiltreFormateurList = res
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

cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfiltreFormateurList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreFormateurList.length;
  }


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




}
