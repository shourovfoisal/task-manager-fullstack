import express from "express";
export const router = express.Router();
router.get("/login", (req, res) => {
    const user = req.body;
});
