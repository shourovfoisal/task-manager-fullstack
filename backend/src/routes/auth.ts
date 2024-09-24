import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

export const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { username, password }: UserLoginRequestType = req.body;

  try {
    const userList = await prisma.user.findMany();

    const matchingUser = userList?.find(
      (eachUser) => eachUser.username === username
    );

    if (matchingUser) {
      if (await bcrypt.compare(password, matchingUser.password)) {
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
        } else {
          res.status(500);
        }
      } else {
        res.status(400).json({ message: "Wrong credentials" });
      }
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {}
});

// create a user
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ id: user.id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
