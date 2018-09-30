import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

	constructor(private httpClient: HttpClient) {}

	getFlightDetails() {
		return this.httpClient.get('../assets/flight_search.json');
	}

}