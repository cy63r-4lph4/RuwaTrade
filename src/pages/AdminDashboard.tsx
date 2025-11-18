import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Plus,
} from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TemplateModal } from "@/components/TemplateModal";
import { TemplateActionsProvider } from "@/context/TemplateAction";
import type {
  DisplayTemplate,
  TemplateData,
  TemplateSubmitData,
} from "@/components/Interfaces";
import { useTemplates } from "@/hooks/global";
import { api } from "@/lib/api";
import { addTemplate, updateTemplate } from "@/lib/api";
import toast from "react-hot-toast";

const links = [
  { name: "Dashboard", path: "dashboard", icon: LayoutDashboard },
  { name: "Templates", path: "templates", icon: FileText },
  { name: "Analytics", path: "analytics", icon: BarChart3 },
  { name: "Settings", path: "settings", icon: Settings },
];

export function AdminDashboard() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<TemplateData | null>(null);
  const navigate = useNavigate();
  const {
    templates,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    refreshTemplates,
  } = useTemplates();

  const handleSubmit = async (data: TemplateSubmitData) => {
    const errors: string[] = [];

    if (!data.title?.trim()) errors.push("Title is required.");
    if (!data.category?.trim()) errors.push("Category is required.");
    if (!data.price || isNaN(Number(data.price)) || Number(data.price) < 0)
      errors.push("Price must be a non-negative number.");
    if (!data.description?.trim()) errors.push("Description is required.");
    if (!data.thumbnail && !editTemplate)
      errors.push("Thumbnail image is required.");
    if (!data.images || data.images.length === 0)
      errors.push("At least one image must be uploaded.");
    if (!data.file && !editTemplate) errors.push("Template file is required.");

    if (errors.length > 0) {
      toast.error("Please fix the following errors:\n" + errors.join("\n"), {
        duration: 6000,
        style: {
          whiteSpace: "pre-line",
        },
      });
      return;
    }
    try {
      const action = editTemplate
        ? updateTemplate(editTemplate.id!, data)
        : addTemplate(data);

      await toast.promise(action, {
        loading: editTemplate ? "Updating template..." : "Creating template...",
        success: editTemplate
          ? "Template updated successfully!"
          : "Template created successfully!",
        error: "Something went wrong. Please try again.",
      });

      setModalOpen(false);
      setEditTemplate(null);
      refreshTemplates();
    } catch (err: any) {
      console.error("Submission error", err);
      toast.error("Unexpected error occurred.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this template?"
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await toast.promise(
        api.delete(`/admin/templates/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          loading: "Deleting template...",
          success: "Template deleted successfully!",
          error: "Failed to delete template.",
        }
      );

      refreshTemplates();
    } catch (err) {
      console.error("Deletion error", err);
      toast.error("An unexpected error occurred while deleting.");
    }
  };

  const handleEdit = (template: TemplateData) => {
    setEditTemplate(template);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditTemplate(null);
    setModalOpen(true);
  };

  const handleView = (template: DisplayTemplate) => {
    navigate(`templates/${template.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-cyan-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-md shadow-md text-sm font-medium">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 hidden sm:block">
        <h1 className="text-2xl font-bold mb-10 text-indigo-600">RuwaAdmin</h1>
        <nav className="space-y-4">
          {links.map(({ name, path, icon: Icon }) => (
            <Link
              to={`/admin/${path}`}
              key={path}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition-all ${
                currentPath === path
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="mr-3" size={20} />
              {name}
            </Link>
          ))}
        </nav>
        <div className="mt-20">
          <button className="flex items-center text-red-500 hover:underline">
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sm:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold capitalize">{currentPath}</h2>
          {currentPath === "templates" && (
            <Button className="flex items-center gap-2" onClick={handleAdd}>
              <Plus size={18} />
              Add Template
            </Button>
          )}
          <div className="rounded-full bg-white p-2 shadow-md sm:hidden">
            <img
              src="/images/admin-avatar.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Template Actions Context */}
        <TemplateActionsProvider
          onEdit={handleEdit}
          onDelete={handleDelete}
          handleAdd={handleAdd}
          onView={handleView}
          handleSubmit={handleSubmit}
          templates={templates}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        >
          <Outlet />
        </TemplateActionsProvider>

        {/* Template Modal */}
        <TemplateModal
          open={modalOpen}
          mode={editTemplate ? "edit" : "add"}
          templateData={
            editTemplate
              ? {
                  id: editTemplate.id,
                  title: editTemplate.title,
                  images: editTemplate.images ?? [],
                  description: editTemplate.description ?? "",
                  thumbnail: editTemplate.thumbnail,
                  category: editTemplate.category,
                  price: editTemplate.price,
                }
              : undefined
          }
          onClose={() => {
            setModalOpen(false);
            setEditTemplate(null);
          }}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
