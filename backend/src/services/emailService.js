import { Resend } from "resend";
import { orderConfirmationEmail } from "../templates/orderConfirmationEmail.js";
import { adminOrderAlertEmail } from "../templates/adminOrderAlertEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send order confirmation email to customer
 */
export const sendOrderConfirmation = async (order, user) => {
  try {
    console.log("📧 Attempting to send order confirmation to:", user.email);
    const emailHtml = orderConfirmationEmail(order, user);

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Xilikha <noreply@resend.dev>",
      to: user.email,
      subject: `Order Confirmed - #${order._id.toString().slice(-8)} | Xilikha`,
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Failed to send order confirmation email:", error);
      console.error("❌ Customer email was:", user.email);
      return { success: false, error };
    }

    console.log("✅ Order confirmation email sent to:", user.email);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error sending order confirmation:", error);
    console.error("❌ Customer email was:", user.email);
    return { success: false, error: error.message };
  }
};

/**
 * Send new order alert to admin
 */
export const sendAdminOrderAlert = async (order, user) => {
  try {
    const emailHtml = adminOrderAlertEmail(order, user);

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Xilikha <noreply@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New Order Received - #${order._id.toString().slice(-8)}`,
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Failed to send admin alert email:", error);
      return { success: false, error };
    }

    console.log("✅ Admin alert email sent to:", process.env.ADMIN_EMAIL);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error sending admin alert:", error);
    return { success: false, error: error.message };
  }
};
