import { writable } from 'svelte/store';
import { isBrowser } from '$lib/utils';
import type { Timer } from '$lib/types';

let initialState: Timer[] = [];

if (isBrowser) {
	const storedFavoriteTimers: string | null = localStorage.getItem('favoriteTimers');
	initialState = storedFavoriteTimers ? JSON.parse(storedFavoriteTimers) : initialState;
}

const createFavoriteTimersStore = () => {
	const { subscribe, set, update } = writable<Timer[]>(initialState);

	if (isBrowser) {
		subscribe((value) => {
			localStorage.setItem('favoriteTimers', JSON.stringify(value));
		});
	}

	return {
		subscribe,
		set,
		add: (timer: Timer): void => {
			update((timers: Timer[]): Timer[] => {
				if (!timers.some((t) => t.seconds === timer.seconds && t.rounds === timer.rounds)) {
					return [...timers, timer];
				}
				return timers;
			});
		},
		remove: (timer: Timer): void => {
			update((timers: Timer[]): Timer[] =>
				timers.filter((t) => !(t.seconds === timer.seconds && t.rounds === timer.rounds))
			);
		},
		toggle: (timer: Timer): void => {
			update((timers: Timer[]): Timer[] => {
				const exists = timers.some(
					(t: Timer) => t.seconds === timer.seconds && t.rounds === timer.rounds
				);
				return exists
					? timers.filter((t) => !(t.seconds === timer.seconds && t.rounds === timer.rounds))
					: [...timers, timer];
			});
		}
	};
};

export const favoriteTimersStore = createFavoriteTimersStore();
