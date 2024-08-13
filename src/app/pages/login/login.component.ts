declare let google:any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private router=inject(Router);
    ngOnInit():void{
    google.accounts.id.initialize({
      client_id:'980288844109-nm9oi0q11bkpi9cp06m78q7d92lmn7s9.apps.googleusercontent.com',
      callback:(resp:any)=>{
        console.log(resp);
        this.handleLogin(resp);
      }
    })
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      size:'large',
      shape:'rectangle',
      width:350
    })
   }
  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleLogin(response:any){
    if(response){
      // decode the token and store it in session and navigate to home/browse
      const payLoad=this.decodeToken(response.credential)
      // store in session
      sessionStorage.setItem("LoggedInUser",JSON.stringify(payLoad));
      // navigate to home/screen
      this.router.navigate(['browse']);
    }

  }

}
