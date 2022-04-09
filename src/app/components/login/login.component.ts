import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public user: any
  private sub: any

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe({
      next: (v) => {
        this.user = v
      },
      error: (e) => {
        console.log('Not logged')
      }
    })
    
  }

  login(): void {
    this.auth.loginWithRedirect()
  }

  logout(): void {
    this.auth.logout()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
