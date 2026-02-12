/**
 * Admin order alert email template
 */
export const adminOrderAlertEmail = (order, user) => {
  const orderId = order._id.toString().slice(-8).toUpperCase();
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
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
  <title>New Order Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">🔔 New Order Received</h1>
              <p style="margin: 10px 0 0 0; color: #dbeafe; font-size: 14px;">Xilikha Admin Alert</p>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 600;">Order #${orderId}</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 5px 0;">
                    <strong style="color: #374151;">Customer:</strong>
                    <span style="color: #6b7280;">${user.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <strong style="color: #374151;">Email:</strong>
                    <a href="mailto:${user.email}" style="color: #3b82f6; text-decoration: none;">${user.email}</a>
                  </td>
                </tr>
                ${
                  user.phone
                    ? `
                <tr>
                  <td style="padding: 5px 0;">
                    <strong style="color: #374151;">Phone:</strong>
                    <span style="color: #6b7280;">${user.phone}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 5px 0;">
                    <strong style="color: #374151;">Date:</strong>
                    <span style="color: #6b7280;">${orderDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <strong style="color: #374151;">Payment:</strong>
                    <span style="color: #6b7280; padding: 4px 8px; background-color: ${order.paymentMethod === "COD" ? "#fef3c7" : "#dbeafe"}; border-radius: 4px; font-size: 12px; font-weight: 500;">
                      ${order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Items -->
              <h3 style="margin: 20px 0 10px 0; color: #111827; font-size: 16px; font-weight: 600;">Order Items</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 10px 8px; text-align: left; color: #374151; font-weight: 600; font-size: 13px;">Product</th>
                    <th style="padding: 10px 8px; text-align: center; color: #374151; font-weight: 600; font-size: 13px;">Qty</th>
                    <th style="padding: 10px 8px; text-align: right; color: #374151; font-weight: 600; font-size: 13px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal:</td>
                  <td style="padding: 8px 0; text-align: right; color: #374151; font-size: 14px;">₹${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Shipping:</td>
                  <td style="padding: 8px 0; text-align: right; color: #374151; font-size: 14px;">₹${order.shipping.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #111827; font-size: 16px; font-weight: 600;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; color: #3b82f6; font-size: 16px; font-weight: 600;">₹${order.total.toFixed(2)}</td>
                </tr>
              </table>

              <!-- Shipping Address -->
              <h3 style="margin: 20px 0 10px 0; color: #111827; font-size: 16px; font-weight: 600;">Shipping Address</h3>
              <div style="background-color: #f9fafb; padding: 12px; border-radius: 6px; color: #374151; font-size: 14px; line-height: 1.5;">
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
                PIN: ${order.shippingAddress.pincode}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px;">
                This is an automated notification from Xilikha E-commerce
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
