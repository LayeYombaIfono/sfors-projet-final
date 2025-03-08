// Angular Import
import { Component, DoCheck } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { GradientConfig } from 'src/app/app-config';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
//import { AuthenticationService } from 'src/app/theme/shared/service';

import { TokenStorageService } from 'src/_services/token-storage.service';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent implements DoCheck {
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;
  gradientConfig = GradientConfig;
  username: any;

  // constructor
  constructor(private authService:AuthService,private tokenService:TokenStorageService) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.username = this.tokenService.getUser()
  }

  logout(){
    this.authService.logout();
   // this.reloadPage();
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
