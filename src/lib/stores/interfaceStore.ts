import { writable } from 'svelte/store';
import { isBrowser } from '$lib/utils';
import type { Interface } from '$lib/types';

let initialState: Interface = {
	colorMode: 'dark',
	sound: 'enabled',
	animations:
		isBrowser && window.matchMedia('(prefers-reduced-motion)').matches ? 'disabled' : 'enabled'
};

if (isBrowser) {
	const storedInterface: string | null = localStorage.getItem('interface');
	initialState = storedInterface ? JSON.parse(storedInterface) : initialState;
}

export const interfaceStore = writable<Interface>(initialState);

if (isBrowser) {
	interfaceStore.subscribe((value) => {
		localStorage.setItem('interface', JSON.stringify(value));
	});
}
