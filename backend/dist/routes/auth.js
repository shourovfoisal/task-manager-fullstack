var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
export const router = express.Router();
const prisma = new PrismaClient();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const userList = yield prisma.user.findMany();
        const matchingUser = userList === null || userList === void 0 ? void 0 : userList.find((eachUser) => eachUser.username === username);
        if (matchingUser) {
            if (yield bcrypt.compare(password, matchingUser.password)) {
                const userSignInfo = {
                    name: matchingUser.name,
                    email: matchingUser.email,
                };
                const secretKey = process.env.JWT_SECRET;
                if (secretKey) {
                    const token = jwt.sign({ userSignInfo }, secretKey, {
                        expiresIn: "1h",
                    });
                    res.header("Authorization", token).send(userSignInfo);
                }
                else {
                    res.status(500);
                }
            }
            else {
                res.status(400).json({ message: "Wrong credentials" });
            }
        }
        else {
            res.status(400).json({ message: "Wrong credentials" });
        }
    }
    catch (error) { }
}));
