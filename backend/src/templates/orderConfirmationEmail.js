/**
 * Order confirmation email template for customers
 */
export const orderConfirmationEmail = (order, user) => {
  const orderId = order._id.toString().slice(-8).toUpperCase();
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${item.name}</strong><br>
        <span style="color: #6b7280; font-size: 14px;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        ₹${item.price.toFixed(2)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>
      </td>
    </tr>
  `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Xilikha</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 14px;">Heritage Wellness from Assam</p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 30px 20px 30px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: #d1fae5; border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 30px;">✓</span>
              </div>
              <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: 600;">Thank You for Your Order!</h2>
              <p style="margin: 0; color: #6b7280; font-size: 16px;">Your order has been confirmed and will be processed soon.</p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong style="color: #374151;">Order ID:</strong>
                    <span style="color: #6b7280;">#${orderId}</span>
                  </td>
                  <td style="padding-bottom: 10px; text-align: right;">
                    <strong style="color: #374151;">Date:</strong>
                    <span style="color: #6b7280;">${orderDate}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 10px;">
                    <strong style="color: #374151;">Payment Method:</strong>
                    <span style="color: #6b7280;">${order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600;">Order Items</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #374151; font-weight: 600; font-size: 14px;">Item</th>
                    <th style="padding: 12px; text-align: right; color: #374151; font-weight: 600; font-size: 14px;">Price</th>
                    <th style="padding: 12px; text-align: right; color: #374151; font-weight: 600; font-size: 14px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Subtotal:</td>
                  <td style="padding: 8px 0; text-align: right; color: #374151;">₹${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Shipping:</td>
                  <td style="padding: 8px 0; text-align: right; color: #374151;">₹${order.shipping.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #111827; font-size: 18px; font-weight: 600;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; color: #10b981; font-size: 18px; font-weight: 600;">₹${order.total.toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600;">Shipping Address</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; color: #374151; line-height: 1.6;">
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
                PIN: ${order.shippingAddress.pincode}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Questions? Contact us at <a href="mailto:support@xilikha.com" style="color: #10b981; text-decoration: none;">support@xilikha.com</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2026 Xilikha. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
