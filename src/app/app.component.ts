import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { AppService } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	search:any = {};
	flags = {
		isReturnTrip: false,
		isSearchTrigger: false
	};
	flightList:any = [];
	_flightList:any = []; // Backup for flightList

	constructor(private appService: AppService) {}

	ngOnInit() {
		this.getFlightDetails();
	}

	getFlightDetails() {
		this.appService.getFlightDetails()
			.subscribe((res: any) => {
				this.flightList = res.content ? res.content : [];
				this._flightList = _.cloneDeep(this.flightList);
			}, (err) => {
				console.log(err);
			});
	}

	onTypeSelection(isReturnTrip) {
		this.flags.isReturnTrip = isReturnTrip;
	}

	onSearch() {
		this.flags.isSearchTrigger =  true;
		/* To remove falsy values in search object,
		* eg: after clear date field, value sets to empty string.
		*/
		for (let sKey in this.search) {
			if (!this.search[sKey]) {
				delete this.search[sKey];
			}

			// To convert the Origin/Destination city codes into uppercase
			if (sKey === 'dTo' || sKey === 'dFrom') {
				this.search[sKey] = this.search[sKey].toUpperCase();
			}
		}
		this._flightList = _.filter(this.flightList, this.search);
	}

	getShortDate(sDate) {
		if (sDate) {
			return new Date(sDate);
		}
	}
}
