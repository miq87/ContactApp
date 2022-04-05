import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  providers: [ MessageService ]
})
export class ContactAddComponent implements OnInit {

  phoneCategoryList = [ 'prywatny', 'służbowy', 'inny' ]
  positions = [ 'klient', 'współpracownik', 'szef' ]

  contactForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{9,12}")]],
    phoneCategory: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    birthdayDate: [''],
    position: ['']
  })

  constructor(private fb: FormBuilder,
    private contactService: ContactsService,
    private router: Router,
    public messageService: MessageService) { }

  ngOnInit(): void {
  }

  save(): void {
    this.contactService.save(this.contactForm.value).subscribe({
      next: (v) => {
        console.log('Contact saved successfully')
        this.router.navigate(['/contacts'])
      },
      error: (e) => {
        console.error('Problem with saving contact')
      }
    })
  }

  onSuccess(message: string) {
    this.messageService.add({severity:'success', summary: message, detail:'Via MessageService'});
  }

}
