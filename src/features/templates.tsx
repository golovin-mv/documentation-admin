import React from "react";
import {useQuery} from "@tanstack/react-query";
import {templateList} from "@/api/templates-api.ts";
import TemplateList from "@/components/template/template-list.tsx";

const Templates: React.FC = () => {
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
    <>
      {isLoading && <div>Loading...</div>}
      {templates &&
          <section
              className="w-full flex flex-col items-center"
          >
              <TemplateList
                  className="w-3/4 mt-4"
                  templates={templates}
              />
          </section>
      }
      {isError && <div>Error: {(error as Error).message}</div>}
    </>
  )
}

export default Templates
