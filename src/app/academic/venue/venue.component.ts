import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from 'src/app/services/graphql.service';
import { 
  ADD_VENUE_MUTATION,
  UPDATE_VENUE_MUTATION,
  DELETE_VENUE_MUTATION,
  GET_ALL_VENUES_QUERY 
} from 'src/app/query-mutation';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {
  venues: any[] = [];
  isEditMode = false;
  venueForm: FormGroup;

  constructor(private graphqlService: GraphqlService, private fb: FormBuilder) {
    this.venueForm = this.fb.group({
      venueName: ['', [Validators.required, Validators.minLength(3)]],
      venueNumber: ['', [Validators.required]],
      capacity: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues() {
    this.graphqlService.executeQuery(GET_ALL_VENUES_QUERY, {}).subscribe(
      (result: any) => this.venues = result.data.venue,
      (error: any) => this.handleError('Error loading venues', error)
    );
  }

  saveVenue() {
    if (this.venueForm.invalid) return;

    if (this.isEditMode) {
      this.updateVenue();
    } else {
      this.addVenue();
    }
  }
  
  addVenue() {
    this.graphqlService.executeMutation(ADD_VENUE_MUTATION, { ...this.venueForm.value }).subscribe(
      (result: any) => {
        if (result.data.addVenue.success) {
          alert(result.data.addVenue.message);
          this.loadVenues();
          this.clearForm();
        } else {
          alert(result.data.addVenue.message); // Show error if venue exists
        }
      },
      (error: any) => this.handleError('Error adding venue', error)
    );
  }
  
  updateVenue() {
    this.graphqlService.executeMutation(UPDATE_VENUE_MUTATION, { ...this.venueForm.value }).subscribe(
      (result: any) => {
        if (result.data.updateVenue.success) {
          alert(result.data.updateVenue.message);
          this.loadVenues();
          this.clearForm();
        } else {
          alert(result.data.updateVenue.message); // Show error if venue not found
        }
      },
      (error: any) => this.handleError('Error updating venue', error)
    );
  }
  
  deleteVenue(venueNumber: string) {
    this.graphqlService.executeMutation(DELETE_VENUE_MUTATION, { venueNumber }).subscribe(
      (result: any) => {
        alert(result.data.deleteVenue.message);
        this.loadVenues();
      },
      (error: any) => this.handleError('Error deleting venue', error)
    );
  }

  editVenue(venue: any) {
    this.venueForm.setValue({
      venueName: venue.venueName,
      venueNumber: venue.venueNumber,
      capacity: venue.capacity
    });
    this.isEditMode = true;
  }

  clearForm() {
    this.venueForm.reset();
    this.isEditMode = false;
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    alert(`${message}: ${error.message || 'Unknown error'}`);
  }
}
