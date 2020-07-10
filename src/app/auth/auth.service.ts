import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusLitener = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusLitener() {
    return this.authStatusLitener.asObservable();
  }

  getAutoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expireIn = authInformation.expirationDate.getTime() -  now.getTime();
    if(expireIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expireIn / 1000);
      this.authStatusLitener.next(true);
    }
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    alert("email:"+email + "password:"+password);
    this.httpClient.post('http://localhost:3000/api/user/signup', authData).subscribe(response => {
      console.log(response);
    });
  }

  login(email:string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.httpClient.post<{token: string, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
      .subscribe( response => {
        const token = response.token;
      this.token = token;
      if(token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusLitener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);
        console.log(token)
        console.log(expirationDate);
        this.router.navigate(['/owner-list']);
      }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusLitener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {this.logout()}, duration * 1000);
        console.log('Setting timer:'+duration);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token );
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const exirationDate = localStorage.getItem('expiration');
    if(!token || !exirationDate) {
      return;
    }
    return {token: token, expirationDate: new Date(exirationDate)};
  }
}
