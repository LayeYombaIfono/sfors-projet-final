import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/_services/auth.service';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { GradientConfig } from 'src/app/app-config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
    visibleUserList: boolean;
    chatMessage: boolean;
    friendId!: number;
    gradientConfig = GradientConfig;
  //  username: any;
  
  username: any;



  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.username = this.tokenService.getUser();
  }

  logout() {
    this.authService.logout();
   // this.router.navigate(['Auth/login-v2']);
    
  }

  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body')?.classList.contains('elite-rtl')) {
      this.gradientConfig.isRtlLayout = true;
    } else {
      this.gradientConfig.isRtlLayout = false;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}