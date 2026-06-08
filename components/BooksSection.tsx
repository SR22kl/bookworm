import BookCard from "./BookCard";
import BookSearchBar from "./BookSearchBar";
import { getAllBooks } from "@/lib/actions/book.actions";

export const dynamic = "force-dynamic";

const BooksSection = async ({
  searchParams,
}: {
  searchParams?: { search?: string } | Promise<{ search?: string }>;
}) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const searchQuery = resolvedSearchParams?.search?.toString() ?? "";
  const bookResults = await getAllBooks(searchQuery);
  const books = bookResults.success ? (bookResults.data ?? []) : [];

  return (
    <main className="wrapper container">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-(--text-primary)">
            Recent Books
          </h2>
          <p className="mt-2 text-sm text-(--text-muted)">
            Search by title or author to find the book you want.
          </p>
        </div>
        <BookSearchBar />
      </div>

      <div className="library-books-grid">
        {books?.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            coverURL={book.coverURL}
            slug={book.slug}
          />
        ))}
      </div>
    </main>
  );
};

export default BooksSection;
