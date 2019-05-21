//export default class ColorUtilities {

	export const ColorNames = {
		'black': 'black',
		'white': 'white',
		'red': 'red',
		'green': 'green',
		'blue': 'blue'
	}

	export function rbgToCmyk(rgb) {
		// based off of code from https://gist.github.com/felipesabino/5066336
		const r = rgb.r / 255;
		const g = rgb.g / 255;
		const b = rgb.b / 255;

		const k = Math.min(1 - r, 1 - g, 1 - b);
		const cmyk = {
			c: (k !== 1) ? Math.round(100 * (1 - r - k) / (1 - k)) : 0,
			m: (k !== 1) ? Math.round(100 * (1 - g - k) / (1 - k)) : 0,
			y: (k !== 1) ? Math.round(100 * (1 - b - k) / (1 - k)) : 0,
			k: Math.round(k * 100)
		};

		return cmyk;
	}

	export function getCmykFromName(colorName) {
		switch(colorName) {
			case ColorNames.black:
				return {
					c: 0,
					m: 0,
					y: 0,
					k: 100
				};

			case ColorNames.white:
				return {
					c: 0,
					m: 0,
					y: 0,
					k: 0
				};

			case ColorNames.red:
				return {
					c: 0,
					m: 100,
					y: 100,
					k: 0
				};

			case ColorNames.green:
				return {
					c: 100,
					m: 0,
					y: 100,
					k: 0
				};

			case ColorNames.blue:
				return {
					c: 100,
					m: 100,
					y: 0,
					k: 0
				};

			default:
				throw new Error('getCmykFromName() - unknown color: ' + colorName);
		}
	}


//}
