// Angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { Console } from 'console';

@Component({
  selector: 'app-auth-signin-v2',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './auth-signin-v2.component.html',
  styleUrls: ['./auth-signin-v2.component.scss']
})
export default class AuthSigninV2Component implements OnInit {
  // public method
  usernameValue = 'Utilisateur@';
  passwordValue ='Mot de passe'
  userPassword = '123456';

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  classList!: { toggle: (arg0: string) => void };
  isLoginFailed: boolean | undefined;
  isLoggedIn: boolean | undefined;
  errorMessageLogin: any;
  errorRequiredUsername: any;
  errorRequiredPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService:TokenStorageService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
        this.router.navigate(['auth/signin-v2']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword?.addEventListener('click', () => {
      // toggle the type attribute
      const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
      password?.setAttribute('type', type);

      // toggle the icon
      this.classList.toggle('icon-eye-off');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.errorMessageLogin = "";
      this.errorRequiredUsername = " Utilisateur est obligatoire "
      this.errorRequiredPassword = " Mot de passe est obligatoire "
      return;
    }

    this.error = '';
    this.loading = true;
      this.authenticationService.login(this.f?.['username']?.value, this.f?.['password']?.value).then(
        (data: any) => {
          this.tokenService.saveToken(data.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log("Connected..................")
          this.reloadPage();
        },
        (err) => {
          this.isLoginFailed = true;
          if(err=="Unauthorized"){
            this.errorRequiredUsername = "";
            this.errorRequiredPassword = "";
            this.errorMessageLogin = "  Utilisateur ou mot de passe incorrect"
          }
        }
      )
  }

      
  reloadPage(): void {
    if(this.tokenService.getRole().indexOf("FORMATION")!=-1)
      {
        this.router.navigate(['/administrative/formation']);
      }
      if(this.tokenService.getRole().indexOf("INSCRIPTION")!=-1)
        {
        this.router.navigate(['/administrative/inscription']);
      }
      if(this.tokenService.getRole().indexOf("TRANSITAIRE")!=-1)
        {
        this.router.navigate(['/transitaire/page-accueil']);
      }
      if(this.tokenService.getRole().indexOf("ADMIN")!=-1)
         {
          this.router.navigate(['/acceuil/tableauBord']);
         
        }
    // window.location.reload();
  }


}
