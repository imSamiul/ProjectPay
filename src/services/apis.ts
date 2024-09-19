import axios from "axios";
import { ClientType } from "../types/clientType";

const BASE_URL = "http://localhost:3001";
const MONGOOSE_URL = "http://localhost:4000";

// GET:
export async function getProjectOverview() {
  const response = await fetch(`${BASE_URL}/projects`);
  return response.json();
}
export async function getClientList() {
  return (await axios.get(`${MONGOOSE_URL}/client`)).data;
}

// POST:
export async function createClient(clientObj: ClientType) {
  return await axios.post(`${MONGOOSE_URL}/client`, clientObj);
}
