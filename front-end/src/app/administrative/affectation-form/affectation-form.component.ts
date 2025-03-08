import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Affectation } from 'src/app/models/Affectation';
import { AffectationListComponent } from '../affectation-list/affectation-list.component';
import { Formateur } from 'src/app/models/Formateur';
import { Formation } from 'src/app/models/Formation';
import { AffectationService } from 'src/app/services/affectation.service';
import { FormateurService } from 'src/app/services/formateur.service';
import { FormationService } from 'src/app/services/formation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-affectation-form',
  templateUrl: './affectation-form.component.html',
  styleUrls: ['./affectation-form.component.scss']
})
export class AffectationFormComponent  implements OnInit{

  @Input() childProperty!:Affectation;
  affectation = new Affectation()
  affectationForm: UntypedFormGroup=Object.create(null);
  affectationListComponentEditor!:AffectationListComponent
  isButtonActive!: boolean;
  formateur!: Formateur[]; 
  formation!: Formation[]; 
  submitted!: boolean;

  constructor(
    private fb: UntypedFormBuilder, 
    @Host() affectationListComponentEditor:AffectationListComponent,
    private affectationService:AffectationService,
    private formateurService:FormateurService,
    private formationService:FormationService) { 
        this.affectationListComponentEditor = affectationListComponentEditor;
    }

    edit!:boolean;

  ngOnInit(): void {
    this.affectationForm = this.fb.group({
          dateAffectation: ['', Validators.required],
          uuidFormateur: ['', Validators.required],
          uuidFormation: ['', Validators.required],
        })
        console.log(this.childProperty.uuid)
        this.initialisation()
         this.getFormateurs()
         this.getFormations()
  }

  getFormateurs(){
    this.formateurService.getFormateurs().subscribe(data => this.formateur = data)
 }

 getFormations(){
  this.formationService.getFormations().subscribe(data => this.formation = data)
}

initialisation(): void{
  if(this.childProperty.uuid !==undefined){
    this.displayAffectation(this.childProperty)
    this.edit = true;
    this.affectationForm.disable();
  } 
  
  if(this.childProperty.uuid ===undefined){
    this.displayAffectation(this.affectation)
    this.edit = false;
  }
}


displayAffectation(affectation:Affectation){
  this.affectation = affectation;
  this.affectationForm.patchValue({
    dateAffectation: affectation.dateAffectation,
    uuidFormateur: affectation.uuidFormateur,
    uuidFormation: affectation.uuidFormation,
    
  });
}
 

 onSubmit() {
      this.submitted = true
      console.log(this.edit+""+this.affectationForm.value)
      const p = { ...this.affectation, ...this.affectationForm.value };
      if(this.affectationForm.valid){
        if(!this.edit){
          this.affectationService.addAffectation(p).subscribe((res) => {
            if(res.code === 200){
              Swal.fire({
                icon: 'success',
                title: 'Enregistrement effectuer',
                showConfirmButton: true
              }).then(() =>{ 
               this.affectationListComponentEditor.getAffectations()
               this.affectationListComponentEditor.closeBtnClick()
             })
            }else{
              Swal.fire({
                icon: 'error',
                title: res.description,
                showConfirmButton: true
              }).then(() =>{ 
               this.affectationListComponentEditor.getAffectations()
               this.affectationListComponentEditor.closeBtnClick()
             })
            }},
          (error:any) => Swal.fire({
           icon: 'error',
           title: 'Enregistrement Echoué',
           showConfirmButton: true
         }))
       }else{
         this.affectationService.updateAffectation(p).subscribe((res) => {
           Swal.fire({
             icon: 'success',
             title: 'Modification effectuer',
             showConfirmButton: true
           }).then(() => {
            this.affectationListComponentEditor.getAffectations()
            this.affectationListComponentEditor.closeBtnClick()
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
      this.affectationForm.enable()
      this.isButtonActive = true;
    }

}