"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const DEBOUNCE_DELAY = 400;

const BookSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";

  const [query, setQuery] = useState(initialSearch);
  const isMounted = useRef(false);

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const timeout = setTimeout(() => {
      const trimmed = query.trim();
      const params = new URLSearchParams();

      if (trimmed) {
        params.set("search", trimmed);
      }

      const href = trimmed ? `/?${params.toString()}` : "/";
      router.push(href);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [query, router]);

  return (
    <div className="library-search-wrapper">
      <Search className="library-search-icon" size={18} />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="library-search-input"
        placeholder="Search books, authors..."
        aria-label="Search books"
      />
    </div>
  );
};

export default BookSearchBar;
