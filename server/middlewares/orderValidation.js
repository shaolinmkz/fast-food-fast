export const orderValidation = (req, res, next) => {
    let inputs;
    const {
        firstname,
        lastname,
        email,
        phone,
        addressNo,
        address,
        lga,
        state,
        foods,
        drinks
    } = req.body;

    for (inputs in req.body) {

        if (!req.body[inputs]) {
            return res.status(400).send({
                status: "Error",
                message: `${inputs} field is not defined`
            });
        } 

        if (typeof req.body[inputs] === undefined) {
            return res.status(400).send({
                status: "Error",
                message: `${inputs} field is not defined`,
            });
        }

        if (req.body[inputs] === "") {
            return res.status(400).send({
                status: "Error",
                message: `${inputs} field is empty`,
            });
        }  
    }

    if (!firstname || !lastname || !email || !phone || !addressNo || !address || !lga || !state || !foods || !drinks) {
        return res.status(400).send({
            status: "Error",
            message: "One or more input fields are empty",
        });
    }

    if (typeof firstname !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${firstname}. Should be a string data type`,
        });
    }
    if (typeof lastname !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${lastname}. Should be a string data type`,
        });
    }
    if (typeof phone !== "number" && typeof phone !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${phone}. Should be a number data type`,
        });
    }
    if (typeof email !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${email}. Should be a string data type`,
        });
    }
    if (typeof addressNo !== "number" && typeof addressNo !== "string") { 
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${addressNo}. Should be a number data type`,
        });
    }

    if (typeof address !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${address}. Should be a string data type`,
        });
    }

    if (typeof lga !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${lga}. Should be a string data type`,
        });
    }

    if (typeof state !== "string") {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${state}. Should be a string data type`,
        });
    }

    if (typeof foods !== "string" && !Array.isArray(foods)) {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${foods}. Should be an Array object or a string data type`,
        });
    }

    if (typeof drinks !== "string" && !Array.isArray(drinks)) {
        return res.status(400).send({
            status: "Error",
            message: `Invalid input ${drinks}. Should be an Array object or a string data type`,
        });
    }

    return next();
}