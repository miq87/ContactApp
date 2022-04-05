import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Contact[]>(environment.contactsApiUrl)
  }

  findById(id: number) {
    return this.http.get<Contact>(environment.contactsApiUrl + '/' + id)
  }

  save(contact: Contact) {
    return this.http.post(environment.contactsApiUrl, contact)
  }

  update(contact: Contact) {
    return this.http.put(environment.contactsApiUrl + '/' + contact.id, contact)
  }

  deleteById(id: number) {
    return this.http.delete(environment.contactsApiUrl + '/' + id)
  }

  

}
