const API_BASE = "http://localhost:3000";

const fetchDataApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }

  return data;
};

export default fetchDataApi