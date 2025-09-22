import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "https://ozi-backend-4dij.onrender.com/", // yahan aapka base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Interceptors for request/response
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);


// upload csv rider

export const uploadRiderCSV = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/rider-activity/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response; // backend se response
  } catch (error) {
    console.error("CSV Upload Error:", error.response || error.message);
    throw error;
  }
};

// 
export const uploadCSV = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/raw-pickers/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response; // backend se response
  } catch (error) {
    console.error("CSV Upload Error:", error.response || error.message);
    throw error;
  }
};

export const uploadClaverTabCSV = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/reports/dynamic-event-uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response; // backend se response
  } catch (error) {
    console.error("CSV Upload Error:", error.response || error.message);
    throw error;
  }
};



export default api;
