export const Color = {
	White: '#edf2f4',
	Black: '#1b1b1e',
	BlackLight: '#6d6d6d',
	Gray: '#d7dadb',
	GrayLight: '#e3e7e9',
	Red: '#ef233c',
	Blue: '#2b2d42',
	BlueLight: '#8d99ae',
	FacebookBlue: '#3b5998',
	GoogleOrange: '#dc483c',
}

export const Font = (weight, size) => {
	return `
		font-family: 'Roboto', sans-serif;
		font-weight: ${weight};
		font-size: ${size}
	`
}

export const Depth = (depth) => {
	switch (depth) {
		case 'top':
			return `z-index: 3`;
			break;
		case 'middle':
			return `z-index: 2`;
			break;
		case 'bottom':
			return `z-index: 1`;
			break;
		default:
			return 'z-index: inherit';
	}
}

export const Animation = (property, time, ease = 'ease', delay = '0s') => {
	switch (ease) {
		case 'ease-in':
			return `transition: ${property} ${time} cubic-bezier(0.895, 0.03, 0.685, 0.22) ${delay};`
			break;
		case 'ease-out':
			return `transition: ${property} ${time} cubic-bezier(0.165, 0.84, 0.44, 1) ${delay};`
			break;
		case 'ease-in-out':
			return `transition: ${property} ${time} cubic-bezier(0.77, 0, 0.175, 1) ${delay};`
			break;
		default:
			return `transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);`
	}
}

export const Shadow = (shadowDepth) => {
	switch (shadowDepth) {
		case 1:
			return `box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`
			break;
		case 2:
			return `box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`
			break;
		case 3:
			return `box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`
			break;
		case 4:
			return `box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`
			break;
		case 5:
			return `box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`
			break;
		
	}
}