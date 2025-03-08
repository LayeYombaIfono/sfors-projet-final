import { Component, Host, Input, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inscription } from 'src/app/models/Inscription';
import { InscriptionListComponent } from '../inscription-list/inscription-list.component';
import { Publication } from 'src/app/models/Publication';
import { InscriptionService } from 'src/app/services/inscription.service';
import { EnumService } from 'src/app/services/enum.service';
import { PublicationService } from 'src/app/services/publication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent implements OnInit{

  @Input() childProperty!:Inscription;
   inscription = new Inscription()
   inscriptionForm: FormGroup=Object.create(null);
   inscriptionListComponentEditor:InscriptionListComponent;
   LesGenre!: String[];
   isButtonActive!: boolean;
   publication!: Publication[]; 
   submitted!: boolean;

 constructor(
   private fb: FormBuilder,
   @Host() inscriptionListComponentEditor:InscriptionListComponent,
   private inscriptionService:InscriptionService,
   private enumService : EnumService,
   private publicaionService:PublicationService){ 
       this.inscriptionListComponentEditor = inscriptionListComponentEditor;
   }

edit!:boolean;
ngOnInit(): void {
 this.getCombo();
   this.inscriptionForm = this.fb.group({
        entrepriseName : new FormControl("",Validators.required),
        codeNif : new FormControl("",Validators.required),
        codeRccm: new FormControl("",Validators.required),
        codeDeclarant: new FormControl("",Validators.required),
        email: new FormControl("",Validators.required),
        nom: new FormControl("",Validators.required),
        prenoms:new FormControl("",Validators.required),
        telephone: new FormControl("",Validators.required),
        sexe: new FormControl("",Validators.required),
        adress: new FormControl("",Validators.required),
        dateInscription: new FormControl("",Validators.required),
        uuidPublication: new FormControl("",Validators.required),
        
        datePublication: new FormControl(""),
        dateDebut: new FormControl(""),
        dateFin: new FormControl(""),
        lebelleFormation: new FormControl(""),
        descriptionFormation:new FormControl(""),
    })
       console.log(this.childProperty.uuid)
       this.initialisation()
        //this.getPublications()
 }

 getCombo(){
   this.enumService.getGenre().subscribe(
     (genres)=>{
       this.LesGenre=genres
     }
   );
 }

 getPublications(){
   this.publicaionService.getPublications().subscribe(data => this.publication = data)
}


initialisation(): void{
  if(this.childProperty.uuid !==undefined){
    this.displayInscription(this.childProperty)
    this.edit = true;
    this.inscriptionForm.disable();
  } 
  
  if(this.childProperty.uuid ===undefined){
    this.displayInscription(this.inscription)
    this.edit = false;
  }
}

displayInscription(inscription:Inscription){
     this.inscription = inscription;
     this.inscriptionForm.patchValue({
      entrepriseName: inscription.entrepriseName,
      codeNif: inscription.codeNif,
      codeRccm: inscription.codeRccm,
      codeDeclarant: inscription.codeDeclarant,
      email: inscription.email,
       nom: inscription.nom,
       prenoms: inscription.prenoms,
       telephone: inscription.telephone,
       sexe: inscription.sexe,
       adress: inscription.adress,
       dateInscription: inscription.dateInscription,
       uuidPublication: inscription.uuidPublication,
       datePublication: inscription.datePublication,
       dateDebut: inscription.dateDebut,
       dateFin: inscription.dateFin,
       lebelleFormation: inscription.lebelleFormation,
       descriptionFormation: inscription.descriptionFormation
     });
   }


   onSubmit() {
    this.submitted = true
    console.log(this.edit+""+this.inscriptionForm.value)
    const p = { ...this.inscription, ...this.inscriptionForm.value };
    if(this.inscriptionForm.valid){
      if(!this.edit){
      
        this.inscriptionService.addInscription(p).subscribe((res) => {
         console.log("Date :"+res);
          if(res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() =>{ 
             this.inscriptionListComponentEditor.getInscription()
             this.inscriptionListComponentEditor.closeBtnClick()
           })
          }else if(res.code === 301){
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() =>{ 
             this.inscriptionListComponentEditor.getInscription()
             this.inscriptionListComponentEditor.closeBtnClick()
           })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() =>{ 
             this.inscriptionListComponentEditor.getInscription()
             this.inscriptionListComponentEditor.closeBtnClick()
           })}
        }, 
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.inscriptionService.updateInscription(p).subscribe((res) => {
         if(res.code === 3901){
         Swal.fire({
           icon: 'error',
           title: res.description,
           showConfirmButton: true
         }).then(() => {
          this.inscriptionListComponentEditor.getInscription()
          this.inscriptionListComponentEditor.closeBtnClick()
        })}else if(res.code === 200){
          Swal.fire({
            icon: 'success',
            title: res.description,
            showConfirmButton: true
          }).then(() =>{ 
           this.inscriptionListComponentEditor.getInscription()
           this.inscriptionListComponentEditor.closeBtnClick()
         })
        }else{
         Swal.fire({
           icon: 'error',
           title: res.description,
           showConfirmButton: true
         }).then(() =>{ 
          this.inscriptionListComponentEditor.getInscription()
          this.inscriptionListComponentEditor.closeBtnClick()
        })
       }
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Modification Echoué',
         showConfirmButton: true
       }))
     }
    }
  }

  onActive(){
    this.inscriptionForm.enable()
    this.isButtonActive = true;
  }
}
