import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import type {
  ImageItem,
  SortableImageProps,
  TemplateData,
  TemplateModalProps,
  TemplateSubmitData,
} from "./Interfaces";

function SortableImage({ id, url, onRemove, isThumbnail }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="relative group rounded-lg overflow-hidden shadow hover:shadow-md border"
    >
      <img src={url} alt={id} className="w-full h-24 object-cover" />

      <div
        {...listeners}
        className="absolute top-1 left-1 cursor-grab p-1 bg-white/80 text-xs rounded shadow text-black hover:bg-white transition"
      >
        ☰
      </div>

      <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
        {isThumbnail ? "Thumbnail" : "Image"}
      </div>

      <button
        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove();
        }}
        type="button"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function TemplateModal({
  open,
  mode,
  templateData,
  onClose,
  onSubmit,
}: TemplateModalProps) {
  const [formData, setFormData] = useState<TemplateData>({
    title: "",
    category: "",
    price: 0,
    images: [],
    thumbnail: "",
    description: "",
    file: null,
  });

  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (mode === "edit" && templateData) {
      setFormData(templateData);

      const items: ImageItem[] = [];
      if (typeof templateData.thumbnail === "string") {
        items.push({
          id: "thumb",
          url: templateData.thumbnail,
          isNew: false,
        });
      }

      (templateData.images || []).forEach((img, index) => {
        items.push({ id: `img-${index}`, url: img.path, isNew: false });
      });

      setImageItems(items);
      setTemplateFile(null);
    } else {
      setFormData({
        title: "",
        category: "",
        price: 0,
        images: [],
        thumbnail: "",
        description: "",
        file: null,
      });
      setImageItems([]);
      setTemplateFile(null);
    }
  }, [mode, templateData, open]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newItems: ImageItem[] = acceptedFiles.map((file, idx) => ({
        id: `new-${Date.now()}-${idx}`,
        file,
        url: URL.createObjectURL(file),
        isNew: true,
      }));
      setImageItems((prev) => [...prev, ...newItems]);
    },
  });

  const handleRemove = (id: string) => {
    setImageItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = imageItems.findIndex((i) => i.id === active.id);
      const newIndex = imageItems.findIndex((i) => i.id === over.id);
      setImageItems(arrayMove(imageItems, oldIndex, newIndex));
    }
  };

  const handleSubmit = () => {
    if (imageItems.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!templateFile && mode === "add") {
      toast.error("Template file is required for new templates.");
      return;
    }

    const existingImages: string[] = [];
    const newImages: File[] = [];

    imageItems.forEach((item) => {
      if (item.isNew && item.file) {
        newImages.push(item.file);
      } else {
        existingImages.push(item.url);
      }
    });

    const finalThumbnail = imageItems[0]?.file || imageItems[0]?.url || "";

    const payload: TemplateSubmitData = {
      ...formData,
      thumbnail: finalThumbnail,
      file: templateFile ?? undefined,
      images: imageItems.map((item) => item.file ?? item.url), // (string | File)[]
      imageOrder: imageItems.map((i) => i.url), // string[]
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white rounded-xl shadow-lg border p-6 max-h-2/3 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-indigo-600">
            {mode === "add" ? "Add New Template" : "Edit Template"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="PPT">PPT</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price (GH₵)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="file">Template File</Label>
              <Input
                id="file"
                type="file"
                accept=".zip,.pdf,.ppt,.pptx,.xls,.xlsx,.doc,.docx"
                onChange={(e) => setTemplateFile(e.target.files?.[0] || null)}
              />
              {templateFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {templateFile.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Upload Images</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-indigo-500 transition"
            >
              <input {...getInputProps()} />
              <p className="text-sm text-gray-500">
                Drag and drop or click to select images
              </p>
            </div>

            {imageItems.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={imageItems.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {imageItems.map((item, index) => (
                      <SortableImage
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        onRemove={() => handleRemove(item.id)}
                        isThumbnail={index === 0}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Template" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
