import React from "react";
import { useQuery } from "@tanstack/react-query";
import { templateList, TemplateListItem } from "@/api/templates-api.ts";
import TemplateList from "@/components/template/template-list.tsx";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/ui/spinner";

const Templates: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: templates,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['templateList'],
    queryFn: templateList,
    refetchOnMount: 'always'
  })

  return (
    <div className="w-4xl mt-4 m-auto">
      {isLoading && <div className="size-full"><Spinner>Loading</Spinner></div>}
      {templates &&
        <TemplateList
          templates={templates}
          onEdit={(template: TemplateListItem) => navigate(`/edit/${template.id}`)}
        />
      }
      {isError && <div>Error: {(error as Error).message}</div>}
    </div>
  )
}

export default Templates
