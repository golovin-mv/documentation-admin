import {getAllPlaceholders, Placeholder as PlaceholderType} from "@/api/placeholder-api.ts";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Placeholder from "@/components/placeholder/placeholder.tsx";
import usePlaceholdersStore from "@/stores/placeholders-store.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";
import {copyTextToClipboard, search} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {CopyIcon} from "lucide-react";

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

  const [onCopy, setOnCopy] = useState<boolean>(false);

  const selectedPlaceholderHrids = selectedPlaceholders.map(placeholder => placeholder.hrid)

  const filterPlaceholders = (placeholders: PlaceholderType[]) => {
    if (!filter) {
      return placeholders
    }

    if (filter.includes(':selected')) {
      const [_, ...arr] = filter.split(' ');
      return (arr && arr.length > 0)
        ? search(
          placeholders?.filter(placeholder => selectedPlaceholderHrids.includes(placeholder.hrid)) || [],
          ['hrid', 'description'],
          arr.join('')
        )
        : placeholders?.filter(placeholder => selectedPlaceholderHrids.includes(placeholder.hrid))
    }

    return search(placeholders, ['hrid', 'description'], filter);
  }

  const handleCopyClick = () => {
    setOnCopy(true);
    const placeholdersString = filterPlaceholders(placeholders)
      ?.map(el => el.hrid).join(",\n")

    copyTextToClipboard(placeholdersString)
      .finally(() => setOnCopy(false));
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
        <Button
          className="mt-1"
          onClick={() => handleCopyClick()}
          variant="outline"
          size="icon"
          disabled={onCopy}
        >
          <CopyIcon/>
        </Button>
      </div>
      <ScrollArea className="flex flex-col max-h-[90vh] p-3">
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
