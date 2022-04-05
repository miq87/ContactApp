import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  user: any

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.auth.user$.subscribe((success: any) => {
      this.user = success
    })
  }

}
