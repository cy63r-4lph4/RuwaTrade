import type {
  DisplayTemplate,
  TemplateActionsContextType,
} from "@/components/Interfaces";
import { createContext, useContext } from "react";

const TemplateActionsContext = createContext<TemplateActionsContextType | null>(
  null
);

export const TemplateActionsProvider = ({
  children,
  onEdit,
  onDelete,
  handleAdd,
  handleSubmit,
  onView,
  templates,
  currentPage,
  totalPages,
  goToPage,
}: {
  children: React.ReactNode;
  onEdit: (template: any) => void;
  onDelete: (templateId: number) => void;
  handleAdd: () => void;
  handleSubmit: (data: any) => void;
  onView: (template: any) => void;
  templates: DisplayTemplate[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}) => {
  return (
    <TemplateActionsContext.Provider
      value={
        {
          onEdit,
          onDelete,
          handleAdd,
          onView,
          handleSubmit,
          templates,
          totalPages,
          currentPage,
          goToPage,
        } as TemplateActionsContextType
      }
    >
      {children}
    </TemplateActionsContext.Provider>
  );
};

export const useTemplateActions = () => {
  const context = useContext(TemplateActionsContext);
  if (!context) {
    throw new Error(
      "useTemplateActions must be used within TemplateActionsProvider"
    );
  }
  return context;
};
