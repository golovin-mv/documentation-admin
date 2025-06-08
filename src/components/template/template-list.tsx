import { TemplateListItem } from "@/api/templates-api.ts";
import React, { HTMLAttributes } from "react";
import Tag from "@/components/ui/tag.tsx";
import randomColor from "randomcolor";
import { useTheme } from "@/components/theme-provider.tsx";
import { Button } from "@/components/ui/button.tsx";
import { EditIcon } from "lucide-react";

interface TemplateListProps extends HTMLAttributes<HTMLUListElement> {
  templates: TemplateListItem[],
  onEdit: (template: TemplateListItem) => void,
}

const TemplateList: React.FC<TemplateListProps> =
  ({ templates, onEdit, ...props }) => {
    const { theme } = useTheme();
    return (
      <ul {...props}>
        {templates.map(template => (
          <li
            key={template.id}
            className="flex group flex-row items-center hover:bg-(--selected) mb-2 shadow-sm rounded-md px-4 py-2 cursor-pointer"
            onDoubleClick={() => onEdit(template)}
          >
            <div className="grow">
              <div className="flex gap-2 group-hover:text-(--selected-color)">
                <span>{template.hrid}</span>
                <Tag
                  style={{
                    backgroundColor: randomColor({ seed: 'version', luminosity: theme === 'system' ? 'dark' : theme }),
                  }}
                >v{template.version}</Tag>
              </div>
              <div className="mt-1.5">
                <span className="text-sm text-muted-foreground group-hover:text-(--selected-color)">{template.description}</span>
                <Tag
                  style={{
                    backgroundColor: randomColor({ seed: template.contentType.name, luminosity: theme === 'system' ? 'dark' : theme }),
                  }}
                >{template.contentType.name}</Tag>
                <span className="text-xs text-muted-foreground">From: {new Date(template.startDate).toLocaleDateString()}</span>
                <span className="text-xs text-muted-foreground ml-2">To: {new Date(template.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="h-full"
              onClick={() => onEdit(template)}
            >
              <EditIcon className="group-hover:text-(--selected-color) group-hover:inline-flex hidden" />
            </Button>
          </li>
        ))
        }
      </ul >
    );
  }

export default TemplateList
