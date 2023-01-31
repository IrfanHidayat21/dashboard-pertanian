import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
  loadBtn: any = 1;
  errorMsg:any;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email: string, password: string) {
    this.loadBtn = 0;
    this.errorMsg = null;
    console.log(email,password);
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['/']);
        this.loadBtn = 1;
      }
    },
    error => {
      this.loadBtn = 1;
      this.errorMsg = "Email / Password Anda salah!"
      console.log(error);
      
    })
  }

  onSignupButtonClicked(email: string, password: string) {
    this.loadBtn = 0;
    this.errorMsg = null;
    console.log(email, password);
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['/']);
        this.loadBtn = 1;
      }
    },
    error => {
      this.loadBtn = 1;
      this.errorMsg = "Harap mengisi semua data!";
      console.log(error);    
    })
  }
}
