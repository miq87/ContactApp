import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit {

  phoneCategoryList = [ 'prywatny', 'służbowy', 'inny' ]
  positions = [ 'klient', 'współpracownik', 'szef' ]

  contactForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    phoneCategory: ['', Validators.required],
    email: ['', Validators.required],
    birthdayDate: [''],
    position: ['']
  })

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {

    const contactId = this.route.snapshot.paramMap.get('id');

    this.http.get(environment.contactsApiUrl + '/' + contactId).subscribe({
      next: (v) => {
        this.contactForm.patchValue(v)
      },
      error: (e) => {
        console.error('Problem with loading contact')
      }
    })
  }

  edit() {
    console.log(this.contactForm.value)
    this.http.put(environment.contactsApiUrl + '/' +
        this.contactForm.value.id, this.contactForm.value).subscribe({
      next: (v) => {
        console.log('Contact updated successfully')
      },
      error: (e) => {
        console.error('Problem with updating contact')
      }
    })
  }

}
