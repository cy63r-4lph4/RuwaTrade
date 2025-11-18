
import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});








import { CUSTOMER_KEY, TOKEN_KEY } from "@/components/constants";
import type { TemplateSubmitData } from "@/components/Interfaces";

export async function addTemplate(data: TemplateSubmitData) {
  const token = localStorage.getItem(TOKEN_KEY);
  const formData = buildTemplateFormData(data);

  return api.post("/admin/templates", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
export async function addToCart(id:number) {
  const token = localStorage.getItem(CUSTOMER_KEY);
  return api.post(
    `/cart`,
    { template_id:id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

}

export async function updateTemplate(id: number, data: TemplateSubmitData) {
  const token = localStorage.getItem(TOKEN_KEY);
  const formData = buildTemplateFormData(data);
  formData.append("_method", "PUT");

  return api.post(`/admin/templates/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function removeFromCart(id:number){
  const token=localStorage.getItem(CUSTOMER_KEY);
  if(!token){
    return
  }
  return api.delete(
    `/cart/item/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

}

function buildTemplateFormData(data: TemplateSubmitData): FormData {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("price", String(data.price));
  formData.append("description", data.description || "");

  if (data.thumbnail ) {
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


export async function downloadTemplate(templateId: number) {
  const token = localStorage.getItem(CUSTOMER_KEY );

  const response = await api.get(`/download/${templateId}`, {
    responseType: "blob", // Important: get binary data
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = new Blob([response.data], { type: response.headers["content-type"] });
  
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  // Try to extract filename from Content-Disposition header
  const disposition = response.headers["content-disposition"];
  const match = disposition?.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] ?? `template-${templateId}`;

  a.download = filename; // Use correct filename from backend
  a.click();

  window.URL.revokeObjectURL(url);
}


