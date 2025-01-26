import React from "react";

import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ControllerProps, useWatch } from "react-hook-form";

type SelectTokenProps = {
  tokens: TokenItem[];
} & Parameters<ControllerProps["render"]>[0]["field"];

const SelectToken = (props: SelectTokenProps) => {
  const { tokens, onChange, name } = props;
  const [open, setOpen] = React.useState(false);
  const tokenType = useWatch({
    name,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="bg-transparent">
        <Button
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[122px] p-2 border-none text-background bg-[#313C3D] rounded-full hover:bg-[#313C3D] min-h-[48px]"
        >
          {tokenType ? (
            tokens.find((token) => token.value === tokenType)?.label
          ) : (
            <p className="leading-[32px]">Select token...</p>
          )}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-transparent backdrop-blur-md border-primary w-max">
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search token..."
            className="text-background min-w-[80px]"
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-background text-sm">
              No token found.
            </CommandEmpty>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  className="hover:!bg-primary/50"
                  key={token.value}
                  value={token.value}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    onChange(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      tokenType === token.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {token.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectToken;
