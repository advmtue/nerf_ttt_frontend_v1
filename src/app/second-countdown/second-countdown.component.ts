import { Component, OnInit, OnDestroy, Input }  from '@angular/core';

@Component({
	selector: 'app-second-countdown',
	templateUrl: './second-countdown.component.html',
	styleUrls: ['./second-countdown.component.scss']
})
export class SecondCountdownComponent implements OnInit, OnDestroy {
	@Input('seconds') seconds: number;

	private timer: any;

	constructor() { }

	ngOnInit(): void {
		this.startTimer();
	}

	ngOnDestroy() {
		this.stopTimer();
	}

	tick() {
		this.seconds--;
		if (this.seconds === 0) {
			this.stopTimer();
		}
	}

	startTimer() {
		this.stopTimer();
		this.timer = setInterval(this.tick.bind(this), 1000);
	}

	stopTimer() {
		if (this.timer) clearInterval(this.timer);
	}

	get time() {
		return this.seconds;
	}
}
