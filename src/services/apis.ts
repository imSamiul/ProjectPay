const BASE_URL = "http://localhost:3001";

export async function getProjectOverview() {
  const response = await fetch(`${BASE_URL}/projects`);
  return response.json();
}
