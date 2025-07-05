// components/common/MultiSelect.jsx
"use client";

import { useState, useCallback, useRef } from "react"; // <-- UPDATED: Import hooks directly
import { X, Check, ChevronsUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function MultiSelect({ options, selected, onChange, placeholder }) {
  const inputRef = useRef(null); // <-- UPDATED: Use useRef directly
  const [open, setOpen] = useState(false); // <-- UPDATED: Use useState directly
  const [inputValue, setInputValue] = useState(""); // <-- UPDATED: Use useState directly

  const handleSelect = useCallback((value) => { // <-- UPDATED: Use useCallback directly
    const option = options.find((o) => o.value === value);
    if (!option) return;

    let newSelected;
    if (selected.includes(option.value)) {
      newSelected = selected.filter((s) => s !== option.value);
    } else {
      newSelected = [...selected, option.value];
    }
    onChange(newSelected);
    setInputValue("");
  }, [selected, onChange, options]);

  const handleRemove = useCallback((value) => { // <-- UPDATED: Use useCallback directly
    const newSelected = selected.filter((s) => s !== value);
    onChange(newSelected);
  }, [selected, onChange]);

  const handleKeyDown = useCallback((e) => { // <-- UPDATED: Use useCallback directly
    if (e.key === "Backspace" && inputValue === "" && selected.length > 0) {
      handleRemove(selected[selected.length - 1]);
    }
  }, [inputValue, selected, handleRemove]);

  const availableOptions = options.filter(
    (option) => !selected.includes(option.value)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-[36px] flex-wrap"
        >
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selected.map((value) => {
              const option = options.find((o) => o.value === value);
              return (
                <Badge
                  key={value}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  {option?.label}
                  <span
                    role="button"
                    tabIndex={0}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemove(value);
                      }
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </span>
                </Badge>
              );
            })}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search skills..."
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {availableOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                  className="flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {selected.includes(option.value) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}