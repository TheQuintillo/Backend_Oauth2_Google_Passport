import nodemailer from "nodemailer";

export default nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});
