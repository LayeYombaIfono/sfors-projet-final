import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publication } from 'src/app/models/Publication';
import { PublicationService } from 'src/app/services/publication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit{


  publicationList!:Publication[];
  sortPublicationList:Publication[] = [];
  filtrePublication:Publication[] = [];
  cfiltrePublicationList:Publication[] = [];
  page = 1;
  pageSize = 2;
  
    editAddLabel: string = 'Edit';
    publicationDetail: Publication |null=null;
    totalLengthOfCollection: number=0;



     constructor(private modalService: NgbModal, private publicationService:PublicationService) {
        this.filtrePublication = this.publicationList;
        this.cfiltrePublicationList = this.publicationList;
        this.sortPublicationList = this.publicationList;
      }
    
      parentProperty = new Publication();
      
        ngOnInit() {
          this.getPublications()
        }
      
    
        getPublications(){
          this.publicationService.getPublications().subscribe( res => {
            console.log("res");
            console.log(res);
            console.log("res");
            this.cfiltrePublicationList = res
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
            this.filtrePublication = this.filter(val);
          }
        
          filter(v: string) {
            return this.publicationList.filter(publication => 
              publication.datePub?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
              publication.dateDebut?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
              publication.dateFin?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
              publication.libelleFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
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
            this.cfiltrePublicationList = this.cfilter(val);
            this.totalLengthOfCollection = this.cfiltrePublicationList.length;
          }
        
        
          cfilter(v: string) {
            return this.publicationList.filter(publication => 
              publication.datePub?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
              publication.dateDebut?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
              publication.dateFin?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
              publication.libelleFormation?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
            );
          }
        
           openModal(targetModal:NgbModal, publication:any) {
              
              this.modalService.open(targetModal, {
                centered: true,
                backdrop: 'static',
                 size:"lg"
              });
          
              if (publication == null) {
                this.editAddLabel = 'Nouvelle'
                this.parentProperty = new Publication()
              }
          
              if (publication != null) {
                this.publicationDetail = publication;
                this.editAddLabel = 'Update'
                this.parentProperty = publication;
               
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
                  this.publicationService.deletePublication(uuid).then(()=>  {
                    swalWithBootstrapButtons.fire(
                      'Suppression !',
                      'Suppression effectuer avec success.',
                      'success'
                    )
                    this.getPublications()
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
