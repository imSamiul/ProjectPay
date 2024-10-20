import axios from "axios";
import { getAuthToken } from "../utils/auth";
import { PaymentType } from "../types/paymentType";

const MONGOOSE_URL = "http://192.168.31.207:4000/payment";
const defaultOptions = {
  baseURL: MONGOOSE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = getAuthToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

// GET:

// POST:
// add payment for specific project and decrease the due amount
export async function addPayment(paymentObject: PaymentType) {
  try {
    const response = await instance.post("/add", paymentObject);
    return response.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
}

// PATCH:

// DELETE:
