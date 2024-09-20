import { writable } from 'svelte/store';
import { isBrowser } from '$lib/utils';
import type { Timer } from '$lib/types';

const maxItems: number = 5;
const localStorageKey: string = 'recentTimersStore';
let initialTimers: Timer[] = [];

const createRecentTimersStore = () => {
	if (isBrowser) {
		const storedTimers: string | null = localStorage.getItem(localStorageKey);
		initialTimers = storedTimers ? JSON.parse(storedTimers) : [];
	}

	const { subscribe, set, update } = writable<Timer[]>(initialTimers);

	if (isBrowser) {
		subscribe((timers: Timer[]): void => {
			localStorage.setItem(localStorageKey, JSON.stringify(timers));
		});
	}

	return {
		subscribe,
		set,
		add: (newTimer: Timer): void => {
			update((timers: Timer[]): Timer[] => {
				const updatedTimers: Timer[] = timers.filter(
					(timer: Timer) =>
						!(timer.seconds === newTimer.seconds && timer.rounds === newTimer.rounds)
				);
				updatedTimers.unshift(newTimer);
				if (updatedTimers.length > maxItems) {
					updatedTimers.pop();
				}
				return updatedTimers;
			});
		}
	};
};

export const recentTimersStore = createRecentTimersStore();
