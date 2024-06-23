import React from "react";
import {useQuery} from "@tanstack/react-query";
import {testTemplate} from "@/api/placeholder-api.ts";
import useHtmlStore from "@/stores/html-store.ts";
import usePlaceholdersStore from "@/stores/placeholders-store.ts";
import {Input} from "@/components/ui/input.tsx";
import Preview from "@/components/editor/preview.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {RefreshCw} from "lucide-react";

const Result: React.FC = () => {
  const {code, idForTest, setIdForTest, } = useHtmlStore();
  const selectedPlaceholders = usePlaceholdersStore(
    ({selectedPlaceholders}) => selectedPlaceholders.map(el => el.path)
  )

  const {parsedContext} = usePlaceholdersStore(
    ({parsedContext, enableContext}) => ({
      parsedContext: enableContext ? parsedContext : '{}',
    })
  );

  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['result', idForTest, code.length, parsedContext],
    queryFn: () => testTemplate({id: idForTest, template: code, placeholders: selectedPlaceholders, context: JSON.parse(parsedContext)}),
    enabled: false,
    retry: false
  });

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-center w-1/4 m-auto">
        <Input
          className="mt-1"
          placeholder="Id"
          value={idForTest}
          onChange={(e) => setIdForTest(e.target.value)}
          disabled={isLoading}
        />
        <Button
          className="mt-1"
          onClick={() => refetch()}
          variant="outline"
          size="icon"
          disabled={isLoading}
        >
          <RefreshCw />
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {data &&
          <ScrollArea className="mt-2">
            <Preview code={data.template} />
          </ScrollArea>
      }
      {(!data && isError) && <div>Error: {error.message}</div>}
    </>
  )
}

export default Result
