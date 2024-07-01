"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";
import { Loader2, SearchIcon, XCircleIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isSearching, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const q = searchParams.get("query")?.toString();

  const handleSearch = useDebouncedCallback((query: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("query", query);
        params.set("page", "1");
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleSearch("");
    }
  };
  return (
    <div className='min-w-40 relative flex  items-center gap-1.5'>
      {isSearching ? (
        <Loader2 className='size-5 z-20 absolute left-4 animate-spin text-muted-foreground' />
      ) : (
        <SearchIcon className='size-5 z-20 absolute left-4 text-muted-foreground dark:text-white' />
      )}
      <div className='relative w-full'>
        <div className='flex items-center w-full'>
          <Input
            className='w-full p-5 pl-12'
            placeholder='Search...'
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={q}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                inputRef?.current?.blur();
              }
            }}
            ref={inputRef}
          />
          {q && (
            <Button
              className='absolute right-0 mr-2 z-10 dark:bg-black'
              onClick={handleClearInput}
              variant={"ghost"}
              size={"icon"}
            >
              <XCircleIcon className='w-5 h-5 text-muted-foreground ' />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
