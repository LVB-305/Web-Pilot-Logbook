"use client";

import * as React from "react";
import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchCommandProps {
  items: Array<{ value: string; label: string }>;
  placeholder: string;
  emptyMessage?: string;
  value?: string;
  onValueChange: (value: string) => void;
}

export function SearchCommand({
  items,
  placeholder,
  emptyMessage = "No results found.",
  value,
  onValueChange,
}: SearchCommandProps) {
  const [search, setSearch] = React.useState("");

  return (
    <Command className="bg-[#f5f5f5] rounded-none">
      <CommandInput
        placeholder={placeholder}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandGroup className="overflow-auto">
          {items
            .filter(
              (item) =>
                item.label.toLowerCase().includes(search.toLowerCase()) ||
                item.value.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => {
                  onValueChange(item.value);
                  setSearch("");
                }}
                className="flex items-center justify-between cursor-pointer border-b p-3 rounded-none"
              >
                <span>{item.label}</span>
                {value === item.value && <Check className="h-4 w-4" />}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
