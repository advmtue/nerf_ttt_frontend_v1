import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';

@Component({
	selector: 'app-date-countdown',
	templateUrl: './date-countdown.component.html',
	styleUrls: ['./date-countdown.component.scss']
})
export class DateCountdownComponent implements OnInit, OnDestroy, OnChanges {
	@Input('date') date: Date;

	public seconds: number;
	public timer: any;

	constructor() { }

	ngOnInit(): void {
		this.calculate();
		this.startTimer();
	}

	ngOnChanges() {
		this.calculate();
	}

	ngOnDestroy() {
		this.stopTimer();
	}

	startTimer() {
		this.timer = setInterval(() => {
			this.seconds--;
			if (this.seconds < 0) {
				this.stopTimer();
			}
		}, 1000);
	}

	stopTimer() {
		this.seconds = 0;
		clearInterval(this.timer);
	}

	calculate() {
		const d = new Date(this.date);
		const n = new Date();
		let s = Math.floor((d.valueOf() - n.valueOf()) / 1000);

		// Ensure S is minimally 0
		if (s < 0) s = 0;

		this.seconds = s;

		console.log('Timer seconds: ', this.seconds);
	}

	time() {
		return this.seconds;
	}
}
