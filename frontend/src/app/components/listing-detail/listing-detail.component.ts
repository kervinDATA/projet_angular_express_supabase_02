import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit, OnChanges {
  listing: any;
  listingId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listingId = params['id'];
      this.loadListingDetails(this.listingId);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listingId']) {
      this.loadListingDetails(this.listingId);
    }
  }

  loadListingDetails(listingId: string | null): void {
    if (listingId) {
      this.listingsService.getListings().subscribe((data) => {
        this.listing = data.find((item: any) => item.listing_id == listingId);
      });
    }
  }
}
