import { isBrowser } from '$lib/utils';
export const navigateBack = (event: Event): void | false => {
	if (isBrowser) {
		if (window.history.length > 1) {
			event.preventDefault();
			window.history.back();
		}
	}
};
