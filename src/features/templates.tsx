import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { templateList, TemplateListItem } from "@/api/templates-api.ts";
import TemplateList from "@/components/template/template-list.tsx";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: templates,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['templateList'],
    queryFn: templateList,
    refetchOnMount: 'always'
  });

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];
    if (!searchQuery) return templates;

    return templates.filter(template =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.hrid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [templates, searchQuery]);

  return (
    <div className="h-dvh w-5/6 m-auto flex flex-col gap-4 p-4">
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <Spinner>Loading</Spinner>
        </div>
      )}
      {isError && <div>Error: {(error as Error).message}</div>}
      {!isLoading && !isError && templates && (
        <>
          <Input
            type="text"
            placeholder={t('templates.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-shrink-0"
          />
          <ScrollArea className="min-h-0 flex-grow rounded-md border">
            <TemplateList
              templates={filteredTemplates}
              onEdit={(template: TemplateListItem) => navigate(`/edit/${template.id}`)}
            />
          </ScrollArea>
        </>
      )}
    </div>
  )
}

export default Templates;
