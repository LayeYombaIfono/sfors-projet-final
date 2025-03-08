// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  // constructor
  constructor(private router: Router,  private tokenStorage: TokenStorageService) {}
 
  // life cycle event
  ngOnInit() {
    this.isLoggedIn = this.tokenStorage.getToken()==''?false:true;
    if(this.isLoggedIn){
      
      if(this.tokenStorage.getRole().indexOf("FORMATION")!=-1)
        {
        this.router.navigate(['/administrative/formation']);
      }
      if(this.tokenStorage.getRole().indexOf("INSCRIPTION")!=-1)
      {
        this.router.navigate(['/administrative/inscription']);
      }
      
      if(this.tokenStorage.getRole().indexOf("TRANSITAIRE")!=-1)
      {
        this.router.navigate(['/transitaire/page-accueil']);
      }

      if(this.tokenStorage.getRole().indexOf("ADMIN")!=-1)
        {
          this.router.navigate(['/acceuil/tableauBord']);
        }
    }else{
      this.router.navigate(['/auth/signin-v2']);
    }
    /* this.router.events.subscribe((evt) => {
     if (!(evt instanceof NavigationEnd)) {
         return;
      }
       window.scrollTo(0, 0);
     });*/
  }
}
