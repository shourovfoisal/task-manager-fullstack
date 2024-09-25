import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export const router = express.Router();

// get all the tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a task
router.post("/", async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: { ...req.body },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update task
router.put("/:id", async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
