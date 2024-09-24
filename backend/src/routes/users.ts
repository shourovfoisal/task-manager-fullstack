import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export const router = express.Router();

// get all the users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
