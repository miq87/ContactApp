import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AuthHttpInterceptor, AuthModule, HttpMethod } from '@auth0/auth0-angular';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactsComponent,
    ContactAddComponent,
    ContactEditComponent,
    ContactListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    AuthModule.forRoot({
      domain: 'miq3l.eu.auth0.com',
      clientId: environment.clientId,
      audience: environment.audience,

      httpInterceptor: {
        allowedList: [
          {
            uri: environment.contactsApiUrl,
            httpMethod: HttpMethod.Post,
            tokenOptions: {
              audience: environment.audience,
              scope: 'write:contacts',
            }
          },
          {
            uri: environment.contactsApiUrl + '/*',
            httpMethod: HttpMethod.Put,
            tokenOptions: {
              audience: environment.audience,
              scope: 'edit:contacts',
            }
          },
          {
            uri: environment.contactsApiUrl + '/*',
            httpMethod: HttpMethod.Delete,
            tokenOptions: {
              audience: environment.audience,
              scope: 'delete:contacts',
            }
          }
        ]
      }
    }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
