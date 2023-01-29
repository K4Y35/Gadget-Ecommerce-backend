import shortid from "shortid";
import SSLCommerzPayment from "sslcommerz-lts";

export const sslRequest = async (req, res) => {
  /**
   * Create ssl session request
   */
  const { name, email, phone, fullAddress, city, postCode, total } = req.body;

  const totalString = total.toString();
  console.log(totalString);

  const data = {
    total_amount: totalString,
    currency: "BDT",
    tran_id: shortid.generate(),
    success_url: `${process.env.SERVER_URL}/ssl-payment-success`,
    fail_url: `${process.env.SERVER_URL}/ssl-payment-fail`,
    cancel_url: `${process.env.SERVER_URL}/ssl-payment-cancel`,
    shipping_method: "No",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: fullAddress,
    cus_add2: "Dhaka",
    cus_city: city,
    cus_state: "Dhaka",
    cus_postcode: postCode,
    cus_country: "Bangladesh",
    cus_phone: phone,
    cus_fax: "01711111111",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
    ipn_url: `${process.env.CLIENT_URL}/ssl-payment-notification`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.SSLCOMMERZ_STORE_ID,
    process.env.SSLCOMMERZ_STORE_PASSWORD,
    false //true for live default false for sandbox
  );

  sslcommerz.init(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters

    console.log(data);
    if (data?.GatewayPageURL) {
      return res.status(200).json({
        link: data?.GatewayPageURL,
      });
    } else {
      return res.status(400).json({
        message: "Session was not successful",
      });
    }
  });
};

export const sslPaymentNotification = async (req, res) => {
  /**
   * If payment notification
   */

  return res.status(200).json({
    data: req.body,
    message: "Payment notification",
  });
};

export const sslPaymentSuccess = async (req, res) => {
  /**
   * If payment successful
   */

  console.log(req.body);

  return res.status(200).json({
    data: req.body,
    message: `Payment success, please go back to the website, redirecting not working donno why :(`,
  });
};

export const sslPaymentFail = async (req, res) => {
  /**
   * If payment failed
   */

  return res.status(200).json({
    data: req.body,
    message: "Payment failed",
  });
};
export const sslPaymentCancell = async (req, res) => {
  /**
   * If payment cancelled
   */

  return res.status(200).json({
    data: req.body,
    message: "Payment cancelled",
  });
};
