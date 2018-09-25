import jwt from "jsonwebtoken";

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

	/**Hint from Brad Travesy Media*/
	/**FORMAT OF TOKEN*/
	/**Authorization: Bearer <access_token>*/

	/**
 * Token verification for aAmin
 * @param {object} req - The request body
 * @param {object} res - The response body
 * @param {object} next - function that call the next middleware
 */
	static verifyToken(req, res, next) {
		/**get auth header value*/
		const bearerHeader = req.headers["authorization"]
      || req.headers["x-access-token"]
      || req.headers.authorization
      || req.params.token;
		/**Check if bearer is undefined*/
		if (typeof bearerHeader !== "undefined") {
			/**Split at the space*/
			const bearer = bearerHeader.split(" ");
			/**Get token from array*/
			const bearerToken = bearer[1];
			/**Set the Token*/
			req.token = bearerToken || bearerHeader;

			const secret_key = process.env.ADMIN_ONLY || process.env.SECRET_KEY;

			jwt.verify(req.token, secret_key, (err, data) => {
				if (err) {
					res.status(401).json({
						status: "Error",
						message: "Invalid Token"
					});
				} else if (!data) {
					res.status(403).json({
						status: "Error",
						message: "Invalid Token"
					});
				} else{
					req.decoded = data;
					/**Next middleware*/
					return next();
				}
			});

		} else {
			/**Forbidden*/
			return res.status(400).json({
				status: "Error",
				message: "Token not provided"
			});
		}
	}


}
