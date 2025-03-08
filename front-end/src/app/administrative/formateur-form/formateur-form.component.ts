import { Component, Host, Input, OnInit,  } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Formateur } from 'src/app/models/Formateur';
import { FormateurListComponent } from '../formateur-list/formateur-list.component';
import { FormateurService } from 'src/app/services/formateur.service';
import Swal from 'sweetalert2';
import { Validators } from 'ngx-editor';
import { EnumService } from 'src/app/services/enum.service';


@Component({
  selector: 'app-formateur-form',
  templateUrl: './formateur-form.component.html',
  styleUrls: ['./formateur-form.component.scss']
})
export class FormateurFormComponent implements OnInit {

    @Input() childProperty!:Formateur;
    formateur = new Formateur()
    LesGenre!: String[];
    formateurForm: UntypedFormGroup=Object.create(null);
    formateurListComponentEditor:FormateurListComponent
    isButtonActive!: boolean;
    submitted!: boolean;

      constructor(
          private fb: UntypedFormBuilder, 
          @Host() formateurListComponentEditor:FormateurListComponent,
          private formateurService:FormateurService,
          private enumService : EnumService) { 
              this.formateurListComponentEditor = formateurListComponentEditor;
          }

          edit!:boolean;


    ngOnInit(): void {
         this.formateurForm = this.fb.group({
          nom: ['', Validators.required],
          prenoms: ['', Validators.required],
          sexe: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', Validators.required],
          profession: ['', Validators.required],
          adress: ['', Validators.required],
        })
        console.log(this.childProperty.uuid)
        this.initialisation()
        this.getCombo()
    }


    getCombo(){
      this.enumService.getGenre().subscribe(
        (genres)=>{
          this.LesGenre=genres
        }
      );
    }

    initialisation(): void{
      if(this.childProperty.uuid !==undefined){
        this.displayFormateur(this.childProperty)
        this.edit = true;
        this.formateurForm.disable();
      } 
      
      if(this.childProperty.uuid ===undefined){
        this.displayFormateur(this.formateur)
        this.edit = false;
      }
    }
  

      displayFormateur(formateur:Formateur){
          this.formateur = formateur;
          this.formateurForm.patchValue({
            nom: formateur.nom,
            prenoms: formateur.prenoms,
            sexe: formateur.sexe,
            phone: formateur.phone,
            email: formateur.email,
            profession: formateur.profession,
            adress: formateur.adress
          });
        }



          onSubmit() {
              this.submitted = true
              console.log(this.edit+""+this.formateurForm.value)
              const p = { ...this.formateur, ...this.formateurForm.value };
              if(this.formateurForm.valid){
                if(!this.edit){
                  this.formateurService.addFormateur(p).subscribe((res) => {
                    if(res.code === 200){
                      Swal.fire({
                        icon: 'success',
                        title: 'Enregistrement effectuer',
                        showConfirmButton: true
                      }).then(() =>{ 
                       this.formateurListComponentEditor.getFormateurs()
                       this.formateurListComponentEditor.closeBtnClick()
                     })
                    }else{
                      Swal.fire({
                        icon: 'error',
                        title: res.description,
                        showConfirmButton: true
                      }).then(() =>{ 
                       this.formateurListComponentEditor.getFormateurs()
                       this.formateurListComponentEditor.closeBtnClick()
                     })
                    }},
                  (error:any) => Swal.fire({
                   icon: 'error',
                   title: 'Enregistrement Echoué',
                   showConfirmButton: true
                 }))
               }else{
                 this.formateurService.updateFormateur(p).subscribe((res) => {
                   Swal.fire({
                     icon: 'success',
                     title: 'Modification effectuer',
                     showConfirmButton: true
                   }).then(() => {
                    this.formateurListComponentEditor.getFormateurs()
                    this.formateurListComponentEditor.closeBtnClick()
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
              this.formateurForm.enable()
              this.isButtonActive = true;
            }
}
