import React, { useEffect } from "react";
import HtmlEditor from "@/features/editor.tsx";
import Context from "@/features/context.tsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { mapApiResponseToTemplate } from "@/types/template";
import Spinner from "@/components/ui/spinner";
import { getTemplate } from "@/api/templates-api";
import usePlaceholdersStore from "@/stores/placeholders-store";

const EditTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: template, isLoading, isError, error } = useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplate(id),
    refetchOnMount: 'always',
  });

  const mappedTemplate = template && mapApiResponseToTemplate(template);

  const {
    setSelectedPlaceholders,
  } = usePlaceholdersStore();

  useEffect(() => {
    if (mappedTemplate?.placeholders) {
      setSelectedPlaceholders(mappedTemplate.placeholders);
    }
  }, [mappedTemplate?.placeholders]);

  if (isLoading) {
    return <div><Spinner>Loading</Spinner></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!mappedTemplate && !isLoading) {
    return <div>Template not found</div>;
  }

  return (
    <div className="flex flex-row overflow-hidden h-screen ">
      <div className="w-3/4">
        <HtmlEditor
          template={mappedTemplate}
          onSave={() => { }}
        />
      </div>
      <div style={{
        backgroundColor: 'hsl(var(--secondary))'
      }} className="w-1/4 h-full overflow-hidden border-solid px-2 ">
        <Context />
      </div>
    </div>
  )
}

export default EditTemplate
