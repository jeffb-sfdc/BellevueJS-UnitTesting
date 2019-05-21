import { ColorNames, rbgToCmyk, getCmykFromName } from '../colorUtilities';
import { fail } from 'assert';

describe('ColorUtilities library', () => {
	it('validates black is converted to CMYK', () => {
		// Arrange
		const rgbColor = {
			r: 0,
			g: 0,
			b: 0
		};

		// Act
		const cmykColor = rbgToCmyk(rgbColor);

		// Assert
		//expect(cmykColor).toBe({
		expect(cmykColor).toEqual({
			c: 0,
			m: 0,
			y: 0,
			k: 100
		});
	});

	it('validates white is converted to CMYK', () => {
		// Arrange
		const rgbColor = {
			r: 255,
			g: 255,
			b: 255
		};

		// Act
		const cmykColor = rbgToCmyk(rgbColor);

		// Assert
		expect(cmykColor).toEqual({
			c: 0,
			m: 0,
			y: 0,
			k: 0
		});
	});

	it('validates red is converted to CMYK', () => {
		// Arrange
		const rgbColor = {
			r: 255,
			g: 0,
			b: 0
		};

		// Act
		const cmykColor = rbgToCmyk(rgbColor);

		// Assert
		expect(cmykColor).toEqual({
			c: 0,
			m: 100,
			y: 100,
			k: 0
		});
	});

	it('validates green is converted to CMYK', () => {
		// Arrange
		const rgbColor = {
			r: 0,
			g: 255,
			b: 0
		};

		// Act
		const cmykColor = rbgToCmyk(rgbColor);

		// Assert
		expect(cmykColor).toEqual({
			c: 100,
			m: 0,
			y: 100,
			k: 0
		});
	});

	it('validates blue is converted to CMYK', () => {
		// Arrange
		const rgbColor = {
			r: 0,
			g: 0,
			b: 255
		};

		// Act
		const cmykColor = rbgToCmyk(rgbColor);

		// Assert
		expect(cmykColor).toEqual({
			c: 100,
			m: 100,
			y: 0,
			k: 0
		});
	});

	it('validates cmykBlack is returned from getCmykFromName()', () => {
		// Arrange
		const expected = {
			c: 0,
			m: 0,
			y: 0,
			k: 100
		};

		// Act
		const result = getCmykFromName(ColorNames.black);

		// Assert
		expect(result).toEqual(expected);
	});

	it('validates cmykRed is returned from getCmykFromName()', () => {
		// Arrange
		const expected = {
			c: 0,
			m: 100,
			y: 100,
			k: 0
		};

		// Act
		const result = getCmykFromName(ColorNames.red);

		// Assert
		expect(result).toEqual(expected);
	});

	it('validates that an exception is throw when an unknown color is passed to getCmykFromName()', () => {
		// Arrange
		const unknownColorName = 'tangerine';

		try {
			// Act
			const result = getCmykFromName(unknownColorName);
			fail('You keep using that color...  I do not think it means what you think it means.');
		}
		catch(ex) {
			// Assert
			expect(ex).not.toBeNull();
			expect(ex.message).toEqual('getCmykFromName() - unknown color: tangerine');
		}
	});
});
