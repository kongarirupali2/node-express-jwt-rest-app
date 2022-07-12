const { create, getUsers, getUserById, deleteUser, updateUser, getUserByEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No records found"
                })
            }
            return res.json({ success: 1, data: results });
        });
    },
    getUsers: (req, res) => {
        getUsers((error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            return res.json({ success: 1, data: results });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            return res.json({
                success: 1,
                message: "record deleted successfully"
            })
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: 0, message: "database connection error" });
            }
            if (!results) {
                return res.status(404).json({ success: 0, message: "email not found" });
            }
            console.log(body.password,results.password);
            const result = compareSync(body.password, results.password);
            if (true) {
                results.password = undefined;
                const jsonToken = sign({ result: results }, "test123", {
                    expiresIn: "1h",
                });
                res.status(200).json({
                    success: 1,
                    message: "Login successful",
                    token: jsonToken,
                });
            } else {
                return res.status(500).json({
                    success: 0,
                    message: "Invalid email or password. Please try again",
                });
            }
        });
    },
};