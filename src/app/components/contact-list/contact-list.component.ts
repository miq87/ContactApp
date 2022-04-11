import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = []

  constructor(public auth: AuthService,
    private contactsService: ContactsService,
    private messengerService: MessengerService) {}

  ngOnInit(): void {
    this.loadContacts()
    this.messengerService.getMsg().subscribe({
      next: (v) => {
        this.loadContacts()
      },
      error: (e) => {
        console.error('Problem with loading contacts')
      }
    })
  }

  loadContacts(): void {
    this.contactsService.findAll().subscribe({
      next: (v) => {
        this.contacts = v
      },
      error: (e) => {
        console.error('Problem with loading contacts')
      }
    })
  }

  deleteById(id: number): void {
    this.contactsService.deleteById(id).subscribe({
      next: (v) => {
        this.messengerService.sendMsg("Delete id: " + id)
      },
      error: (e) => {
        console.log(e)
        console.error('Problem with deleting contact')
      }
    })
  }

}
