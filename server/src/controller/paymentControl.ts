import express, { Request, Response, NextFunction, Router } from "express";
import PaymentModel from "../model/PaymentModel";
import dotenv from "dotenv";
dotenv.config();
class PaymentController {
  async renderPayment(req: any, res: Response) {
    try {
      const data = await PaymentModel.find({ userID: req.userID });
      res.json({ data: data });
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
  async creatPayment(req: any, res: Response) {
    try {
      const data = req.body;
      const newPay = new PaymentModel({ ...data, userID: req.userID });
      await newPay.save();
    } catch (error) {
      console.log("chua luu dc");
    }
  }
}
export default new PaymentController();
