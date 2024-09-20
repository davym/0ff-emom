import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const seconds = Number(params.seconds);
	const rounds = Number(params.rounds);
	const progress = Number(params.progress);

	if (
		!isNaN(seconds) &&
		!isNaN(rounds) &&
		!isNaN(progress) &&
		seconds < 3600 &&
		seconds > 2 &&
		rounds > 0 &&
		rounds < 101 &&
		progress <= seconds * rounds
	) {
		return {
			seconds,
			rounds,
			progress
		};
	}

	error(404, 'Not found');
};
