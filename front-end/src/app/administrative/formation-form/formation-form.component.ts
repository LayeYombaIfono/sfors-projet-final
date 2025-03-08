import { Component, Host, Input, OnInit,  } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormationListComponent } from '../formation-list/formation-list.component';
import Swal from 'sweetalert2';
import { Formation } from 'src/app/models/Formation';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {

    @Input() childProperty!:Formation;
    formation = new Formation()
    formationForm: UntypedFormGroup=Object.create(null);
    formationListComponentEditor:FormationListComponent
    isButtonActive!: boolean;
    submitted!: boolean;

    constructor(
      private fb: UntypedFormBuilder, 
      @Host() formationListComponentEditor:FormationListComponent,
      private formationService:FormationService) { 
          this.formationListComponentEditor = formationListComponentEditor;
      }

      edit!:boolean;

      ngOnInit(): void {
        this.formationForm = this.fb.group({
          libelleFormation: ['', Validators.required],
          descriptionFormation: ['', Validators.required],
            })
            console.log(this.childProperty.uuid)
            this.initialisation()
  }

  initialisation(): void{
    if(this.childProperty.uuid !==undefined){
      this.displayFormation(this.childProperty)
      this.edit = true;
      this.formationForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayFormation(this.formation)
      this.edit = false;
    }
  }

     displayFormation(formation:Formation){
      this.formation = formation;
      this.formationForm.patchValue({
        libelleFormation: formation.libelleFormation,
        descriptionFormation: formation.descriptionFormation,
        
      });
    }

    onSubmit() {
      this.submitted = true
      console.log(this.edit+""+this.formationForm.value)
      const p = { ...this.formation, ...this.formationForm.value };
      if(this.formationForm.valid){
        if(!this.edit){
          this.formationService.addFormation(p).subscribe((res) => {
            if(res.code === 200){
              Swal.fire({
                icon: 'success',
                title: 'Enregistrement effectuer',
                showConfirmButton: true
              }).then(() =>{ 
               this.formationListComponentEditor.getFormations()
               this.formationListComponentEditor.closeBtnClick()
             })
            }else{
              Swal.fire({
                icon: 'error',
                title: res.description,
                showConfirmButton: true
              }).then(() =>{ 
               this.formationListComponentEditor.getFormations()
               this.formationListComponentEditor.closeBtnClick()
             })
            }},
          (error:any) => Swal.fire({
           icon: 'error',
           title: 'Enregistrement Echoué',
           showConfirmButton: true
         }))
       }else{
         this.formationService.updateFormation(p).subscribe((res) => {
           Swal.fire({
             icon: 'success',
             title: 'Modification effectuer',
             showConfirmButton: true
           }).then(() => {
            this.formationListComponentEditor.getFormations()
            this.formationListComponentEditor.closeBtnClick()
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
      this.formationForm.enable()
      this.isButtonActive = true;
    }
}
