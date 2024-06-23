import {Placeholder as PlaceholderType} from "@/api/placeholder-api.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronsUp} from "lucide-react";
import classNames from "classnames";

interface PlaceholderProps {
  placeholder: PlaceholderType,
  isSelected: boolean,
  onSelect: (placeholder: PlaceholderType) => void,
  onDeselect: (placeholder: PlaceholderType) => void,
  onInsert: (placeholder: PlaceholderType) => void
}

const Placeholder: React.FC<PlaceholderProps> =
  ({
     placeholder,
     isSelected,
     onSelect,
     onDeselect,
     onInsert
   }) => {

    const handleInsert = (placeholder: PlaceholderType) => {
      onInsert(placeholder);
      onSelect(placeholder);
    }

    return (
      <div className={classNames({
        'items-top flex space-x-2  my-2 px-2 py-2 items-center rounded-sm': true,
        'bg-red-800 text-white': isSelected,
      })}>
        <Checkbox className="self-center"
                  id={placeholder.hrid}
                  checked={isSelected}
                  onCheckedChange={() => (isSelected ? onDeselect(placeholder) : onSelect(placeholder))}
        />
        <div className="grow pl-1">
          <div className="flex flex-col">
            <label
              style={{wordBreak: "break-word"}}
              className="text-m leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={placeholder.hrid}
            >
              {placeholder.hrid}
            </label>
            <div className="text-xs text-muted-foreground">
              {placeholder.description}
            </div>
          </div>
        </div>
        <Button variant="outline" size="icon" className="max-w-8 min-w-10"
                onClick={() => handleInsert(placeholder)}>
          <ChevronsUp className="h-4 w-4"/>
        </Button>
      </div>
    )
  }

export default Placeholder

