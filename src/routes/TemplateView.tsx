import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { DisplayTemplate } from "@/components/Interfaces";
import { api } from "@/lib/api";

import { FiArrowLeft } from "react-icons/fi";

export function TemplateView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [template, setTemplate] = useState<DisplayTemplate | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTemplate = async () => {
      try {
        const res = await api.get(`/templates/${id}`);
        const data = res.data as DisplayTemplate;

        const allImages = [
          ...(data.thumbnail ? [{ id: -1, path: data.thumbnail }] : []),
          ...(data.images || []),
        ];

        setTemplate({ ...data, images: allImages });
        setMainImage(data.thumbnail || data.images?.[0]?.path || "");
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-500">Loading...</div>
    );
  }

  if (!template) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Template not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12">
      <div className="max-w-10/12 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <FiArrowLeft size={20} /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Panel: Image Preview */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 w-full h-[500px] bg-white">
              <img
                src={mainImage}
                alt="Main Preview"
                className="w-full h-full object-contain  transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1">
              {template.images.map((imgObj) => (
                <img
                  key={imgObj.id}
                  src={imgObj.path}
                  alt=""
                  onClick={() => setMainImage(imgObj.path)}
                  className={`w-24 h-24 object-cover rounded-xl border cursor-pointer transition-all snap-start ${
                    mainImage === imgObj.path
                      ? "ring-2 ring-indigo-500 scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Panel: Info */}
          <motion.div
            className="backdrop-blur-md bg-white/80 p-8 rounded-3xl shadow-2xl border border-gray-100 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {template.title}
            </h1>
            <p className="text-gray-600 text-lg">{template.description}</p>

            <div className="space-y-2 text-sm text-gray-500">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {template.category}
              </p>
              <p>
                <span className="font-medium">Tags:</span>{" "}
                {template.tags?.join(", ") || "N/A"}
              </p>
               <p className="text-4xl font-extrabold text-indigo-600">
                GH₵ {template.price}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
