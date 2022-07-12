const { verify, decode } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "test123", (error, decode) => {
                if (error) {
                    res.status(403).json({
                        success: 0,
                        message: "Invalid Token",
                    });
                } else {
                    console.log(decode);
                    next();
                }
            });
        } else {
            res.status(403).json({
                success: 0,
                message: "Access  denied. Unauthorized user",
            });
        }


    },
}