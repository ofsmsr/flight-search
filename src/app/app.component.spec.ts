import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [
			AppComponent
		],
		imports: [
			BrowserModule,
			HttpClientModule,
			FormsModule,
			MatSliderModule
		],
		providers: [
			AppService
		],
		}).compileComponents();
	}));
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	it(`should return short Date'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		const shortDate = new Date('2018-10-18');
		expect(app.getShortDate('2018-10-18')).toEqual(shortDate);
	}));
	
	it(`should return _flightList length 5'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		app.appService.getFlightDetails().subscribe((res) => {
			app._flightList = res.content;
			expect(app._flightList.length).toEqual(5);
		});
	}));
	
	it(`should return flightList length 5'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		app.appService.getFlightDetails().subscribe((res) => {
			app.flightList = res.content;
			expect(app.flightList.length).toEqual(5);
		});
	}));

	it(`should return search flightList 0'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		app.appService.getFlightDetails().subscribe((res) => {
			const searchObj = {
				"dDate": "2018-10-18",
				"dFrom": "P2Q",
				"dTo": "D2L",
			};
			app.onSearch(searchObj);
			expect(app._flightList.length).toEqual(0);
		});
	}));
});
