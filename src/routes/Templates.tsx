import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTemplateActions } from "@/context/TemplateAction";

export function Templates() {
  // optionally pass perPage: useTemplates(6)
  const {
    onEdit,
    onDelete,
    onView,
    handleAdd,
    templates,
    currentPage,
    totalPages,
    goToPage,
  } = useTemplateActions();

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <img
          src="/images/void.svg"
          alt="No templates"
          className="w-48 h-48 opacity-80"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          No templates yet
        </h2>
        <p className="text-sm text-gray-500 max-w-md">
          You haven't created any templates yet. Once you do, they'll appear
          here for easy access and management.
        </p>
        <Button
          size="lg"
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          + Create your first template
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border"
          >
            <img
              src={template.thumbnail ?? undefined}
              alt={template.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {template.title}
              </h3>
              <p className="text-sm text-gray-500">
                Category: {template.category}
              </p>
              <p className="text-lg font-bold text-indigo-600">
                GH₵ {template.price}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => onView?.(template)}
                >
                  <Eye size={16} />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => onEdit?.(template)}
                >
                  <Pencil size={16} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() =>
                    template.id !== undefined && onDelete?.(template.id)
                  }
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 pt-8">
        <Button
          onClick={() => goToPage?.((currentPage ?? 1) - 1)}
          disabled={(currentPage ?? 1) === 1}
          variant="outline"
        >
          ← Previous
        </Button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          onClick={() => goToPage?.((currentPage ?? 1) + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
