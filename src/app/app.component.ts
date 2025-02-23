import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Models/contact.model';
import { AsyncPipe } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private http = inject(HttpClient);

  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false),

  })

  contacts$= this.getContacts();
  
  onFormSubmit(){
    // console.log(this.contactsForm.value);
    const addContactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite,
    }
    this.http.post('https://localhost:7035/api/Contacts', addContactRequest)
    .subscribe({
      next: (value) =>{
        console.log(value);
        this.contacts$ = this.getContacts();
        this.contactsForm.reset();
      }
    })
  }

  onDelete(id: string){
    this.http.delete(`https://localhost:7035/api/Contacts/${id}`)
    .subscribe({
      next: (value) => {
        alert("Item deleted");
        this.contacts$ = this.getContacts();
      }
    })
  }

  // Fix: Corrected the variable name to contacts$
  // contacts$: Observable<Contact[]> = this.getContacts();

private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7035/api/Contacts');
  }
}
