export interface Interface {
	colorMode: 'light' | 'dark';
	sound: 'enabled' | 'disabled';
	animations: 'enabled' | 'disabled';
}

export interface Timer {
	seconds: number;
	rounds: number;
}
