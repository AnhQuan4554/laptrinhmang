import express, { Router, Request, Response, NextFunction } from "express";
import paymentControl from "../controller/paymentControl";
import verifyToken from "../middleware/User";
const router = Router();
router.get("/", verifyToken, paymentControl.renderPayment);
router.post("/creatPayment", verifyToken, paymentControl.creatPayment);
export default router;
