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
import express from "express";
const prisma = new PrismaClient();
export const router = express.Router();
// get all the tasks
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// create a task
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield prisma.task.create({
            data: Object.assign({}, req.body),
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// update task
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield prisma.task.update({
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// delete a task
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield prisma.task.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
