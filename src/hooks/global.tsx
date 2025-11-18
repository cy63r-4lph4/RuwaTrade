import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { CUSTOMER_KEY, GUEST_CART_KEY, TOKEN_KEY } from "@/components/constants";
import { useNavigate } from "react-router";
import type { DisplayTemplate, DownloadableTemplate} from "@/components/Interfaces";

export function useTemplates(perPage: number = 10) {
  const [templates, setTemplates] = useState<DisplayTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  const fetchTemplates = useCallback(
    async (page = currentPage) => {
      try {
        setLoading(true);
        const token = localStorage.getItem(TOKEN_KEY);

        const response = await api.get(
          `/admin/templates?page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data, current_page, last_page, total } = response.data;

        setTemplates(data);
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setTotalItems(total);
        setError("");
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 401) {
            navigate("/login");
          }
          setError(
            `Error ${err.response.status}: ${
              err.response.data.message || "Something went wrong."
            }`
          );
        } else if (err.request) {
          setError(
            "No response from server. Please check your backend or network."
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    },
    [currentPage, perPage]
  );

  useEffect(() => {
    fetchTemplates(currentPage);
  }, [fetchTemplates, currentPage]);

  return {
    templates,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    refreshTemplates: () => fetchTemplates(currentPage),
    goToPage: setCurrentPage,
  };
}

export function useLogin() {}

export function useCart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState<DisplayTemplate[]>([]);

  const isLoggedIn = !!localStorage.getItem(CUSTOMER_KEY);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError("");

    if (isLoggedIn) {
      try {
        const token = localStorage.getItem(CUSTOMER_KEY);
        const response = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (err: any) {
        if (err.response) {
          setError(
            `Error ${err.response.status}: ${
              err.response.data.message || "Something went wrong."
            }`
          );
        } else if (err.request) {
          setError(
            "No response from server. Please check your backend or network."
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      }
    } else {
      const localItems = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
      setItems(localItems);
    }

    setLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToGuestCart = (template: DisplayTemplate) => {
    const current = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
    if (!current.some((item: DisplayTemplate) => item.id === template.id)) {
      const updated = [...current, template];
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updated));
      setItems(updated);
    }
  };

  const removeFromGuestCart = (id: number) => {
    const current = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
    const updated = current.filter((item: DisplayTemplate) => item.id !== id);
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updated));
    setItems(updated);
  };

  const clearGuestCart = () => {
    localStorage.removeItem(GUEST_CART_KEY);
    setItems([]);
  };

  return {
    items,
    loading,
    error,
    fetchCart,
    addToGuestCart,
    removeFromGuestCart,
    clearGuestCart,
    isLoggedIn,
  };
}



export function useLibrary() {
  const [templates, setTemplates] = useState<DownloadableTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(CUSTOMER_KEY);
    api
      .get("/library", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTemplates(res.data);
      })
      .catch(() => {
        setError("Failed to load library");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { templates, loading, error };
}
