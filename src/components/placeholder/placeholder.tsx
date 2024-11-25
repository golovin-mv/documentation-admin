import {Placeholder as PlaceholderType} from "@/api/placeholder-api.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {ClipboardPaste, EllipsisIcon, InfoIcon} from "lucide-react";
import classNames from "classnames";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {pathToPlaceholder} from "@/lib/utils.ts";

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
      <>
        <div className={classNames({
          'items-top flex space-x-2  my-2 px-2 py-2 items-center rounded-sm': true,
          'bg-[var(--selected)] text-[--selected-color]': isSelected,
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
              <div className={classNames({
                'text-xs': true,
                'text-muted-foreground': !isSelected,
                'text-[--selected-color]': isSelected
              })}>
                {placeholder.description}
              </div>
            </div>
          </div>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="max-w-8 min-w-10">
                  <EllipsisIcon className="h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleInsert(placeholder)}>
                  <ClipboardPaste size="16"/>
                  <span className="ml-2">Insert</span>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <InfoIcon size="16"/>
                    <span className="ml-2">Info</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="min-w-[50%]">
              <DialogHeader>
                <DialogTitle>Info</DialogTitle>
                <div
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Description
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {placeholder.description}
                    </p>
                  </div>
                </div>
                <div
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      HRID
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {placeholder.hrid}
                    </p>
                  </div>
                </div>
                <div
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Path
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {placeholder.path}
                    </p>
                  </div>
                </div>
                <div
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Placeholder
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm ">{pathToPlaceholder(placeholder)}</code>
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </>
    )
  }

export default Placeholder

