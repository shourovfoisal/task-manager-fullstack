var _a;
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { logger } from "./middlewares/logger.js";
import { router as authRouter } from "./routes/auth.js";
import { router as userRouter } from "./routes/users.js";
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // To use authorization as well, we can use "Content-Type, Authorization" as the second argument
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();
});
app.use(logger);
const authorize = (req, res, next) => {
    const token = req.headers["authorization"];
    const JwtSecret = process.env.JWT_SECRET;
    if (!JwtSecret) {
        return res.status(503).send("Could not verify");
    }
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const parsedValue = jwt.verify(token, JwtSecret);
        req.user = parsedValue.userSignInfo;
        next();
    }
    catch (error) {
        return res.status(400).send("Invalid token");
    }
};
app.use("/auth", authRouter);
app.use("/users", authorize, userRouter);
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
app.listen(port, () => {
    console.log("Server started");
});
