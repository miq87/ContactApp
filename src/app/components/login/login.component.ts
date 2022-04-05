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
    this.sub = this.auth.user$.subscribe((success: any) => {
      this.user = success
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
