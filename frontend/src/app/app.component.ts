import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingListComponent } from './components/listing-list/listing-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
