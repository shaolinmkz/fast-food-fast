/**
 * @class \{{{object}}\} {{Helper}}{{Methods for validation}}
 */
export class Helper {


	/**
   * Validates an email field
   * @param {string} email - users email
   */
	static isValidEmail(email) {  /**hint from code mentor tutorials @OlawaleAladeusi*/
		return /\S+@\S+\.\S+/.test(email);
	}

	/**
   * Validates a number field
   * @param {string} number - set of stringed number(s)
   */
	static isValidNumber(number) { /**hint from www.regextester.com/21 */
		return /^[0-9]*$/gm.test(number);
	}

	/**
 * Validates a string field
 * @param {string} number - set of numbers
 */
	static isValidAlphabet(string) {
		return /^[a-z]*$/gm.test(string);
	}
}
