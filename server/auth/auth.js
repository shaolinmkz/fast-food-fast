import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.load();

/**
 * @class \{{{object}}\} {{Helper}}{{Methods for validation}}
 */
export class Helper {
	/**
   * Validates an email field
   * @param {string} email - users email
   */
	static isValidEmail(email) {  /**hint from code mentor tutorials @OlawaleAladeusi*/
		return (/\S+@\S+\.\S+/.test(email) && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
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
   * Token verification for Admin
   * @param {object} req - The request body
   * @param {object} res - The response body
   * @param {object} next - function that call the next middleware
   */
	static verifyAdminsToken(req, res, next) {
		/**get auth header value*/
		const bearerHeader = req.headers["authorization"] || req.headers["x-access-token"];
		/**Check if bearer is undefined*/
		if (typeof bearerHeader !== "undefined") {
			/**Set the Token*/
			req.token =  bearerHeader;

			jwt.verify(req.token, process.env.ADMIN_ONLY, (err, decodedToken) => {
				if (err) {
					res.status(401).json({
						status: "Error",
						message: "Invalid Token"
					});
				} if (decodedToken) {
					req.adminInfo = decodedToken;
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



	/**
  * Token verification for Users
  * @param {object} req - The request body
  * @param {object} res - The response body
  * @param {object} next - function that call the next middleware
  */
	static verifyUsersToken(req, res, next) {
		/**get auth header value*/
		const bearerHeader = req.headers["authorization"] || req.headers["x-access-token"];
		/**Check if bearer is undefined*/
		if (typeof bearerHeader !== "undefined") {
			/**Set the Token*/
			req.token = bearerHeader;

			jwt.verify(req.token, process.env.SECRET_KEY, (err, decodedToken) => {
				if (err) {
					res.status(401).json({
						status: "Error",
						message: "Invalid Token"
					});
				} if (decodedToken) {
					req.userInfo = decodedToken;
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
