import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  private apiUrl = 'http://localhost:3000/data'; // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Méthode mise à jour pour accepter les filtres (quartier et type de chambre)
  getListings(
    start: number = 0, 
    end: number = 99, 
    searchTerm: string = '', 
    neighbourhood: string = '', 
    roomType: string = '',
    minPrice: number | null = null, 
    maxPrice: number | null = null
  ): Observable<any> {
    let url = `${this.apiUrl}?start=${start}&end=${end}`;
    
    // Ajouter le terme de recherche si présent
    if (searchTerm) {
      url += `&name=${searchTerm}`;
    }

    // Ajouter le quartier (neighbourhood) si présent
    if (neighbourhood) {
      url += `&area=${neighbourhood}`;
    }

    // Ajouter le type de chambre (roomType) si présent
    if (roomType) {
      url += `&room_type=${roomType}`;
    }

    if (minPrice !== null) {
      url += `&min_price=${minPrice}`;
    }

    if (maxPrice !== null) {
      url += `&max_price=${maxPrice}`;
    }

    return this.http.get<any>(url);
  }

  // Méthode pour ajouter un nouveau listing
  addListing(listing: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, listing);
  }
}


