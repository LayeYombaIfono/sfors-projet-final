import { Component, Host, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Inscription } from "src/app/models/Inscription";
import { Publication } from "src/app/models/Publication";
import { EnumService } from "src/app/services/enum.service";
import { InscriptionService } from "src/app/services/inscription.service";
// import { PublicationService } from "src/app/services/publication.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-inscription",
  templateUrl: "./form-inscription.component.html",
  styleUrls: ["./form-inscription.component.scss"],
})
export class FormInscriptionComponent implements OnInit {
  inscription = new Inscription();
  publication = new Publication();
  inscriptionForm: FormGroup = Object.create(null);

  LesGenre!: String[];

  isButtonActive!: boolean;

  submitted = false;

  uuid: string = "";

  constructor(
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private enumService: EnumService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.uuid = "" + this.route.snapshot.paramMap.get("uuid_publictation") + "";
    this.inscriptionForm = this.fb.group({
      entrepriseName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      codeNif: new FormControl("", Validators.required),
      codeRccm: new FormControl("", Validators.required),
      codeDeclarant: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ]),

      nom: new FormControl("", [Validators.required, Validators.minLength(3)]),
      prenoms: new FormControl("", Validators.required),
      telephone: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern(/^\d+$/),
      ]),
      sexe: new FormControl("", Validators.required),
      adress: new FormControl(""),
      dateInscription: new FormControl("", [Validators.required]),
      uuidPublication: new FormControl(""),
    });
    this.inscriptionForm.patchValue({
      uuidPublication: this.uuid,
    });
    this.getCombo();
  }

  getCombo() {
    this.enumService.getGenre().subscribe((genres) => {
      this.LesGenre = genres;
    });
  }

  onSubmit() {
    //  this.submitted = true
    const p = { ...this.inscription, ...this.inscriptionForm.value };
    if (this.inscriptionForm.valid) {
      this.submitted = true;
      this.inscriptionService.addInscription(p).subscribe(
        (res) => {
          this.router.navigate(["/transitaire/formations"]);
          if (res.code === 200) {
            Swal.fire({
              icon: "success",
              title: res.description,
              showConfirmButton: true,
            });
          } else if (res.code === 301) {
            Swal.fire({
              icon: "error",
              title: res.description,
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: res.description,
              showConfirmButton: true,
            });
          }
        },
        (error: any) =>
          Swal.fire({
            icon: "error",
            title: "Enregistrement Echoué",
            showConfirmButton: true,
          })
      );
    }
  }
}
