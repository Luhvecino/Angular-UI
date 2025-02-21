import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Models/contact.model';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private http = inject(HttpClient);

  // Fix: Corrected the variable name to contacts$
  contacts$: Observable<Contact[]> = this.getContacts();

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7035/api/Contacts');
  }
}
