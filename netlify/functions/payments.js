const axios = require("axios");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const { action, paymentId } = JSON.parse(event.body || "{}");
  const API_KEY = process.env.PI_API_KEY;

  try {
    if (action === "approve") {
      await axios.post(
        `https://api.minepi.com/v2/payments/${paymentId}/approve`,
        {},
        { headers: { Authorization: `Key ${API_KEY}` } }
      );
      return { statusCode: 200, headers, body: JSON.stringify({ approved: true }) };
    }

    if (action === "complete") {
      await axios.post(
        `https://api.minepi.com/v2/payments/${paymentId}/complete`,
        {},
        { headers: { Authorization: `Key ${API_KEY}` } }
      );
      return { statusCode: 200, headers, body: JSON.stringify({ completed: true }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid action" }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
