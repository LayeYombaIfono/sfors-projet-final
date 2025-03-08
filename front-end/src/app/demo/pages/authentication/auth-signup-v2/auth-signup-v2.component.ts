// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-signup-v2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-signup-v2.component.html',
  styleUrls: ['./auth-signup-v2.component.scss']
})
export default class AuthSignupV2Component {}
