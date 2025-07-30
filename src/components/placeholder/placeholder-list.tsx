import { getAllPlaceholders, Placeholder as PlaceholderType } from "@/api/placeholder-api.ts";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Placeholder from "@/components/placeholder/placeholder.tsx";
import usePlaceholdersStore from "@/stores/placeholders-store.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { copyTextToClipboard, search } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { BanIcon, CopyIcon, ListChecksIcon, MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Separator } from "../ui/separator";
import {useTranslation} from "react-i18next";

const PlaceholderList: React.FC = () => {
  const { t } = useTranslation();
  const { data: placeholders, isLoading, isError } = useQuery({
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

  const filterPlaceholders = (placeholders: PlaceholderType[]): PlaceholderType[] => {
    if (!filter) {
      return placeholders
    }

    if (filter.includes(':selected')) {
      const [, ...arr] = filter.split(' ');
      const result = (arr && arr.length > 0)
        ? search(
          placeholders?.filter(placeholder => selectedPlaceholderHrids.includes(placeholder.hrid)) || [],
          ['hrid', 'description'],
          arr.join('')
        )
        : placeholders?.filter(placeholder => selectedPlaceholderHrids.includes(placeholder.hrid))

      return result as PlaceholderType[]
    }

    return search(placeholders, ['hrid', 'description'], filter) as PlaceholderType[];
  }

  const handleCopyClick = () => {
    const placeholdersString = filterPlaceholders(placeholders ?? [])
      ?.map(el => el.hrid).join(",\n")

    copyTextToClipboard(placeholdersString);
  }

  const handleSelectClick = (selected: boolean) => {
    filterPlaceholders(placeholders ?? [])?.forEach((placeholder: PlaceholderType) => {
      selected
        ? selectPlaceholder(placeholder)
        : deselectPlaceholder(placeholder)
    });
  }

  return (
    <div className="px-2">
      <div className="flex flex-row w-full gap-2 items-center">
        <Input
          className="mt-1"
          type="email"
          placeholder={t('placeholders.filter')}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="max-w-8 min-w-10">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleCopyClick()}>
              <CopyIcon className="pr-2" />
              {t('placeholders.copy')}
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem onClick={() => handleSelectClick(true)}>
              <ListChecksIcon className="pr-2" />
              {t('placeholders.selectAll')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectClick(false)}>
              <BanIcon className="pr-2" />
              {t('placeholders.deselectAll')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="flex flex-col max-h-[90vh] p-3">
        {isLoading && <div>{t('placeholders.loading')}</div>}
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
        {isError && <div>{t('placeholders.error')}</div>}
      </ScrollArea>
    </div>
  )
};

export default PlaceholderList