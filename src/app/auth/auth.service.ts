import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {

  }
createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};

    this.httpClient.post('http://localhost:3000/api/user/signup', authData).subscribe(response => {
      console.log(response);
    });
  }

}
