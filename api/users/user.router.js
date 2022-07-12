const { createUser, getUsers, getUserById, deleteUser, updateUser, login} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token-validation");

router.post("/", createUser);
router.get("/:id",checkToken, getUserById);
router.get("/",checkToken, getUsers);
router.patch("/",checkToken, updateUser);
router.delete("/",checkToken, deleteUser);
router.post("/login", login);


module.exports = router;