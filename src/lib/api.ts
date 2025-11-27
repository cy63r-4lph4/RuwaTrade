import type { TemplateSubmitData } from "@/components/Interfaces";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required if you use Laravel Sanctum
});

// Request interceptor to inject token automatically
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("TOKEN_KEY") || localStorage.getItem("CUSTOMER_KEY");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized globally, e.g., redirect to login
      console.log("Unauthorized, redirecting...");
    }
    return Promise.reject(error);
  }
);

export const authApi = (path: string) => `/api/auth${path}`;
export const apiRoute = (path: string) => `/api${path}`;
export async function downloadTemplate(templateId: number) {
  const response = await api.get(apiRoute(`/download/${templateId}`), {
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  const disposition = response.headers["content-disposition"];
  const match = disposition?.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] ?? `template-${templateId}`;

  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
export async function addToCart(id: number) {
  return api.post(apiRoute("/cart"), { template_id: id });
}

export async function removeFromCart(id: number) {
  return api.delete(apiRoute(`/cart/item/${id}`));
}
export async function updateTemplate(id: number, data: TemplateSubmitData) {
  const formData = buildTemplateFormData(data);
  formData.append("_method", "PUT"); // Laravel expects this for PUT via POST
  return api.post(apiRoute(`/admin/templates/${id}`), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export async function addTemplate(data: TemplateSubmitData) {
  const formData = buildTemplateFormData(data);
  return api.post(apiRoute("/admin/templates"), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
function buildTemplateFormData(data: TemplateSubmitData): FormData {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("price", String(data.price));
  formData.append("description", data.description || "");
  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail);
  }
  data.images.forEach((img, index) => {
    if (img instanceof File) {
      formData.append(`images[${index}]`, img);
    }
  });
  if (data.file instanceof File) {
    formData.append("file", data.file);
  }
  if (data.imageOrder) {
    data.imageOrder.forEach((url, index) => {
      formData.append(`imageOrder[${index}]`, url);
    });
  }
  return formData;
}
