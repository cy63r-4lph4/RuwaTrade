import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const sampleTemplates = [
  {
    id: 1,
    title: "Modern HTML Template",
    category: "HTML",
    price: 10,
    thumbnail: "/images/business-2.png",
    images: ["/images/business-2.png", "/images/preview1.jpg", "/images/preview2.jpg"],
    description:
      "A clean and modern HTML5/CSS3 template perfect for portfolios, startups, or landing pages.",
    features: ["Responsive Layout", "Dark Mode", "Clean Code", "SEO Friendly"],
    fileType: ".html",
  },
  // ... other templates
];

export function TemplateDetail() {
  const { id } = useParams<{ id: string }>();
  const template = sampleTemplates.find((t) => t.id === parseInt(id || ""));

  const [mainImage, setMainImage] = useState(template?.thumbnail || "");

  if (!template) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Template not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Image Gallery */}
        <div className="flex flex-col gap-6">
          {/* Main Image */}
          <div className="aspect-w-16 aspect-h-10">
            <img
              src={mainImage}
              alt="Main preview"
              className="w-full h-full object-cover rounded-xl border shadow-md"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto">
            {template.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border ${
                  mainImage === img ? "ring-2 ring-indigo-500" : "hover:opacity-80"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between p-2">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
              {template.title}
            </h1>
            <p className="text-gray-600 mb-6">{template.description}</p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              {template.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>

            <p className="text-sm text-gray-500 mb-1">
              <strong>Category:</strong> {template.category}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>File Type:</strong> {template.fileType}
            </p>

            <p className="text-3xl font-bold text-indigo-600 mb-4">
              ${template.price}
            </p>
          </div>

          <Button className="w-full text-lg py-3 rounded-full shadow-lg">
            Add to Cart
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
