import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importer FormsModule ici
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent {
  listing = {
    listing_id: '',
    host_id: '',
    host_name: '',
    description: '',
    room_type: '',
    area: '',
    price: '',
    minimum_nights: '',
    availability_365: '',
    number_of_reviews: '',
    reviews_per_month: ''
  };

  constructor(private listingsService: ListingsService) {}

  onSubmit(): void {
    this.listingsService.addListing(this.listing).subscribe(
      (response) => {
        console.log('Nouveau listing ajouté avec succès', response);
        // Tu peux rediriger ou afficher un message de succès ici
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du listing', error);
      }
    );
  }
}

