require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./api/users/user.router");

app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "REST API Test",
    });
});

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port
    ${process.env.APP_PORT}...`);
});