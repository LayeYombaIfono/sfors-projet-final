import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publication } from 'src/app/models/Publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit{

    publicationList!:Publication[];
    publication = new Publication()
    cfiltrePublicationList:Publication[] = [];
    editAddLabel: string = 'Edit';
    publicationDetail: Publication |null=null;

    constructor(
            //private modalService: NgbModal,
            private publicationService:PublicationService,  
           // private activitedRoute:ActivatedRoute,
            //private router: Router
          ) {
            this.cfiltrePublicationList = this.publicationList;
           
          }

           parentProperty = new Publication();
      
        ngOnInit() {
          this.getPublications()
          // this.consulterIdFormation();
        }
      
        getPublications(){
          this.publicationService.getPublications().subscribe( res => {
            this.cfiltrePublicationList = res
          });
        }

            /*getFormation(){
               this.publicationService.getPublicationuuid(this.activitedRoute.snapshot.params["uuid"]).subscribe(
                     p => {console.log(this.publication = p);}
                   );

            }*/

            openModal(publication:any) {
              this.publicationDetail = publication;
              this.parentProperty = publication.uuid;
              console.log(this.parentProperty);
            }
               
   }


