import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const seconds = Number(params.seconds);
	const rounds = Number(params.rounds);

	if (
		!isNaN(seconds) &&
		!isNaN(rounds) &&
		seconds < 3600 &&
		seconds > 2 &&
		rounds > 0 &&
		rounds < 101
	) {
		throw redirect(301, `/${seconds}/${rounds}/0`);
	}

	error(404, 'Not found');
};
