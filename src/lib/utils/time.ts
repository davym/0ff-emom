export const getFormattedTime = (seconds: number, isMinimal: boolean = false): string => {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (isMinimal) {
		if (hrs > 0) {
			return `${hrs}:${mins}:${String(secs).padStart(2, '0')}`;
		}
		if (mins > 0) {
			return `${mins}:${String(secs).padStart(2, '0')}`;
		}
		return `${secs}`;
	} else {
		if (hrs > 0) {
			return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
		}
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}
};

export const getTimeArray = (seconds: number): string[] => getFormattedTime(seconds).split('');

export const getVerboseTime = (seconds: number, isMinimal: boolean = false): string => {
	const hrs: number = Math.floor(seconds / 3600);
	const mins: number = Math.floor((seconds % 3600) / 60);
	const secs: number = Math.floor(seconds % 60);

	let result: string[] = [];

	if (isMinimal) {
		if (hrs > 0) {
			result.push(`${hrs}h`);
		}
		if (mins > 0) {
			result.push(`${mins}m`);
		}
		if (secs > 0 || result.length === 0) {
			result.push(`${secs}s`);
		}
	} else {
		if (hrs > 0) {
			result.push(`${hrs} ${hrs === 1 ? 'hour' : 'hours'}`);
		}
		if (mins > 0) {
			result.push(`${mins} ${mins === 1 ? 'minute' : 'minutes'}`);
		}
		if (secs > 0 || result.length === 0) {
			result.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);
		}
	}

	return result.join(' ');
};
