export class LoopHelper {
	/**
   * Loop Method that checks for the datatype of  value
   * @param {string || array} value - value you want to loop through
   * @param {string} datatype - Type of datatype you expect
   * @param {object} res - response body object
   * @param {string} responseBodyMessage The response message you want
   */
	errorLooper(value, datatype, responseBodyMessage){
		let i, res;
		for (i = 0; i < value.length; i++) {
			if (typeof value !== `${datatype}`){
				return res.status(400).json({
					status: "Error",
					message: `${responseBodyMessage}`
				});
			}
		}
	}
}