import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirebaseService } from '@/app/services/firebase/firebase.service';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})

export class LoginPage {
  public email: string = '';
  public password: string = '';

  constructor(private firebaseService: FirebaseService) {}

  logIn() {
    this.firebaseService.logIn(this.email, this.password);
  }
}