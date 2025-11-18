// components/LibraryModal.tsx

import { useLibrary } from "@/hooks/global";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { downloadTemplate } from "@/lib/api";

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LibraryModal({ isOpen, onClose }: LibraryModalProps) {
  const { templates, loading, error } = useLibrary();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        >
          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>

          <Dialog.Title className="text-2xl font-bold mb-4">
            Your Library
          </Dialog.Title>

          {/* Loading/Error/Empty States */}
          {loading && (
            <p className="text-center py-8">Loading your templates...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && templates.length === 0 && (
            <p className="text-center py-8">
              You haven't purchased any templates yet.
            </p>
          )}

          {/* Template Grid */}
          {!loading && templates.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-gray-50 shadow-sm rounded-xl overflow-hidden border"
                >
                  <img
                    src={template.thumbnail}
                    alt={template.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-base">
                      {template.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">
                      Expires:{" "}
                      {new Date(template.expires_at).toLocaleDateString()}
                    </p>
                    <Button
                      onClick={() => downloadTemplate(template.id)}
                      className="text-sm text-indigo-600 hover:underline bg-white hover:bg-white"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
