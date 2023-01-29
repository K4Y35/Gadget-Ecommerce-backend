import express from "express";
import {
  sslPaymentCancell,
  sslPaymentFail,
  sslPaymentNotification,
  sslPaymentSuccess,
  sslRequest,
} from "../controllers/sslCommerzControllers.js";

const router = express.Router();

router.post("/ssl-request", sslRequest);
router.post("/ssl-payment-notification", sslPaymentNotification);
router.post("/ssl-payment-success", sslPaymentSuccess);
router.post("/ssl-payment-fail", sslPaymentFail);
router.post("/ssl-payment-cancel", sslPaymentCancell);

export default router;
