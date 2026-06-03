import { sampleBooks } from "@/lib/constants";
import BookCard from "./BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";

const BooksSection = async () => {
  const bookResults = await getAllBooks();
  const books = bookResults.success ? (bookResults.data ?? []) : [];
  return (
    <>
      <main className="wrapper container">
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
    </>
  );
};

export default BooksSection;
