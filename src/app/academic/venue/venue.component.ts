import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { 
  ADD_VENUE_MUTATION,
  UPDATE_VENUE_MUTATION,
  DELETE_VENUE_MUTATION,
  GET_ALL_VENUES_QUERY,
  GET_VENUE_BY_NUMBER_QUERY } from 'src/app/query-mutation';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {
  venues: any[] = [];
  isEditMode = false;

  venueForm: any = {
    venueName: '',
    venueNumber: '',
    capacity: 0,
  };
  constructor(private grapqlService:GraphqlService) { }

  ngOnInit(): void {
    this.loardVenues();
  }
  loardVenues() {
    this.grapqlService.executeQuery(GET_ALL_VENUES_QUERY, {}).subscribe(
      (result: any) => {
      this.venues = result.data.venue;
    },
      (error: any) => {
        console.error('Error loading venues:', error);
      }
    );
  }
  addVenue() {
    this.grapqlService.executeQuery(ADD_VENUE_MUTATION, {
      venueName: this.venueForm.venueName,
      venueNumber: this.venueForm.venueNumber,
      capacity: this.venueForm.capacity,
    }).subscribe(
      (result: any) => {
        alert(result.data.addVenue.message);
        this.loardVenues();
        this.fetchVenues();
      },
      (error: any) => {
        console.error('Error adding venue:', error);
      }
    );
  }
  fetchVenues() {
    throw new Error('Method not implemented.');
  }

  updateVenue() {
    this.grapqlService.executeQuery(UPDATE_VENUE_MUTATION, {
      venueName: this.venueForm.venueName,
      venueNumber: this.venueForm.venueNumber,
      capacity: this.venueForm.capacity,
    }).subscribe(
      (result: any) => {
        alert(result.data.updateVenue.message);
        this.loardVenues();
        this.fetchVenues();
        this.clearForm();
      },
      (error: any) => {
        console.error('Error updating venue:', error);
      }
    );
  }
  deleteVenue(venueNumber: string) {
    this.grapqlService.executeQuery(DELETE_VENUE_MUTATION, {
      venueNumber: venueNumber,
    }).subscribe(
      (result: any) => {
        alert(result.data.deleteVenue.message);
        this.fetchVenues
        this.loardVenues();
      },
      (error: any) => {
        console.error('Error deleting venue:', error);
      }
    );
  }
  editVenue(venue: any) {
    this.venueForm={...venue};
    this.isEditMode = true;
  }
  clearForm() {
    this.venueForm = {
      venueName: '',
      venueNumber: '',
      capacity: 0,
    };
    this.isEditMode = false;
  }
}