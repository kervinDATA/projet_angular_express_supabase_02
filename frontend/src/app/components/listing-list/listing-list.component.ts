import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Importer le CommonModule pour *ngFor et *ngIf
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']  // Correction du nom : styleUrls
})
export class ListingListComponent implements OnInit {
  listings: any[] = [];
  searchTerm: string = '';  // Propriété pour stocker le terme de recherche
  currentPage: number = 0;
  pageSize: number = 100;  // Nombre de lignes par page

  // Filtres pour quartier et type de chambre
  neighbourhoods: string[] = ['Popincourt', 'Buttes-Chaumont', 'Hôtel-de-Ville', 'Élysée', 'Bourse', 'Luxembourg', 'Louvre',
    'Batignolles-Monceau', 'Reuilly', 'Panthéon', 'Entrepôt', 'Passy', 'Ménilmontant', 'Opéra', 'Observatoire', 'Buttes-Montmartre',
    'Temple', 'Gobelins', 'Palais-Bourbon', 'Vaugirard'
  ];
  roomTypes: string[] = ['Entire home/apt', 'Shared room', 'Private room', 'Hotel room'];
  selectedNeighbourhood: string = '';
  selectedRoomType: string = '';

  // Variables pour la fourchette de prix
  minPrice: number | null = null;
  maxPrice: number | null = null;


  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.loadListings();
  }

  // Charger les listings avec ou sans recherche
  loadListings(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize - 1;

    this.listingsService.getListings(start, end, this.searchTerm, this.selectedNeighbourhood, 
      this.selectedRoomType, this.minPrice, this.maxPrice).subscribe(
      (data) => {
        this.listings = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des listings:', error);
      }
    );
  }

  // Fonction pour filtrer les listings
  filterListings(): void {
    console.log('Filtrage activé');
    this.currentPage = 0;  // Réinitialiser à la première page
    this.loadListings();    // Recharger les listings avec les filtres sélectionnés
  }

  // Fonction pour rechercher les listings par nom
  searchListings(): void {
    this.currentPage = 0;  // Réinitialiser à la première page
    this.loadListings();    // Recharger les listings avec le terme de recherche
  }

  // Fonction pour aller à la page suivante
  nextPage(): void {
    this.currentPage++;
    this.loadListings();
  }

  // Fonction pour revenir à la page précédente
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadListings();
    }
  }
}

