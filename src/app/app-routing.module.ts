import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, pathMatch: 'prefix', children: [
    { path: '', component: ContactListComponent },
    { path: 'list', component: ContactListComponent, canActivate: [AuthGuard] },
    { path: 'new', component: ContactAddComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ContactEditComponent, canActivate: [AuthGuard] }
  ] },
  { path: '**', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
