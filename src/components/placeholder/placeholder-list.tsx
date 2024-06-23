import {getAllPlaceholders, Placeholder as PlaceholderType} from "@/api/placeholder-api.ts";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Placeholder from "@/components/placeholder/placeholder.tsx";
import usePlaceholdersStore from "@/stores/placeholders-store.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";
import {search} from "@/lib/utils.ts";

const PlaceholderList: React.FC = () => {
  const {data: placeholders, isLoading, isError} = useQuery({
    queryKey: ['placeholders'],
    queryFn: getAllPlaceholders,
  });
  const [filter, setFilter] = useState<string>('')

  const {
    selectedPlaceholders,
    selectPlaceholder,
    deselectPlaceholder,
    insertPlaceholder
  } = usePlaceholdersStore();

  const selectedPlaceholderHrids = selectedPlaceholders.map(placeholder => placeholder.hrid)

  const filterPlaceholders = (placeholders: PlaceholderType[]) => {
    if (!filter) {
      return placeholders
    }

    if (filter === ':selected') {
      return placeholders?.filter(placeholder => selectedPlaceholderHrids.includes(placeholder.hrid))
    }

    return search(placeholders, ['hrid', 'description'], filter);
  }

  return (
    <div className="px-2">
      <div className="flex flex-row w-full gap-2 items-center">
      <Input
        className="mt-1"
        type="email"
        placeholder="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      </div>
      <ScrollArea className="flex flex-col h-svh p-3">
        {isLoading && <div>Loading...</div>}
        {placeholders && filterPlaceholders(placeholders)?.map((placeholder: PlaceholderType) => (
          <Placeholder
            key={placeholder.id}
            placeholder={placeholder}
            isSelected={selectedPlaceholderHrids.includes(placeholder.hrid)}
            onSelect={selectPlaceholder}
            onDeselect={deselectPlaceholder}
            onInsert={insertPlaceholder}
          />
        ))}
        {isError && <div>Error</div>}
      </ScrollArea>
    </div>
  )
};

export default PlaceholderList
