import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Publication } from 'src/app/models/Publication';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { Formation } from 'src/app/models/Formation';
import { PublicationService } from 'src/app/services/publication.service';
import { FormationService } from 'src/app/services/formation.service';
import { Validators } from 'ngx-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit{

   @Input() childProperty!:Publication;
   publication = new Publication()
   publicationForm: UntypedFormGroup=Object.create(null);
   publicationListComponentEditor!:PublicationListComponent
   isButtonActive!: boolean;
   formation!: Formation[]; 
   submitted!: boolean;
  
    constructor(
      private fb: UntypedFormBuilder, 
      @Host() publicationListComponentEditor:PublicationListComponent,
      private publicationService:PublicationService,
      private formationService:FormationService) { 
          this.publicationListComponentEditor = publicationListComponentEditor;
      }
  
      edit!:boolean;
  
    ngOnInit(): void {
      this.publicationForm = this.fb.group({
            datePub: ['', Validators.required],
            dateDebut: ['', Validators.required],
            dateFin: ['', Validators.required],
            uuidFormation: ['', Validators.required],
    })
      console.log(this.childProperty.uuid)
      this.initialisation()
      this.getFormations()
    }

  
    getFormations(){
      this.formationService.getFormations().subscribe(data => this.formation = data)
    }

    initialisation(): void{
      if(this.childProperty.uuid !==undefined){
        this.displayPublication(this.childProperty)
        this.edit = true;
        this.publicationForm.disable();
      } 
      
      if(this.childProperty.uuid ===undefined){
        this.displayPublication(this.publication)
        this.edit = false;
      }
    }

    displayPublication(publication:Publication){
      this.publication = publication;
      this.publicationForm.patchValue({
        datePub: publication.datePub,
        dateDebut: publication.dateDebut,
        dateFin: publication.dateFin,
        uuidFormation: publication.uuidFormation,
        
      });
    }


    onSubmit() {
          this.submitted = true
          console.log(this.edit+""+this.publicationForm.value)
          const p = { ...this.publication, ...this.publicationForm.value };
          if(this.publicationForm.valid){
            if(!this.edit){
              this.publicationService.addPublication(p).subscribe((res) => {
                if(res.code === 200){
                  Swal.fire({
                    icon: 'success',
                    title: 'Enregistrement effectuer',
                    showConfirmButton: true
                  }).then(() =>{ 
                   this.publicationListComponentEditor.getPublications()
                   this.publicationListComponentEditor.closeBtnClick()
                 })
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: res.description,
                    showConfirmButton: true
                  }).then(() =>{ 
                   this.publicationListComponentEditor.getPublications()
                   this.publicationListComponentEditor.closeBtnClick()
                 })
                }},
              (error:any) => Swal.fire({
               icon: 'error',
               title: 'Enregistrement Echoué',
               showConfirmButton: true
             }))
           }else{
             this.publicationService.updatePublication(p).subscribe((res) => {
               Swal.fire({
                 icon: 'success',
                 title: 'Modification effectuer',
                 showConfirmButton: true
               }).then(() => {
                this.publicationListComponentEditor.getPublications()
                this.publicationListComponentEditor.closeBtnClick()
              })
              },
              (error:any) => Swal.fire({
               icon: 'error',
               title: 'Modification Echoué',
               showConfirmButton: true
          }))
        }
      } 
    }
        onActive(){
          this.publicationForm.enable()
          this.isButtonActive = true;
        }
    

}
