export const testDB = () => {
	return process.env.PGTEST_URL;
};

import "./testRoutes";
import "./userTestRoutes";
