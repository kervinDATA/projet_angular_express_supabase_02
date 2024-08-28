import { Routes } from '@angular/router';
import { ListingListComponent } from './components/listing-list/listing-list.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';
import { ListingFormComponent } from './components/listing-form/listing-form.component';

export const routes: Routes = [
  { path: '', component: ListingListComponent },  // Page d'accueil pour les listings
  { path: 'listing/:id', component: ListingDetailComponent },
  { path: 'add-listing', component: ListingFormComponent },
];
