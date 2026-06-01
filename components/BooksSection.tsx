import { sampleBooks } from "@/lib/constants";
import BookCard from "./BookCard";

const BooksSection = () => {
  return (
    <>
      <main className="wrapper container">
        <div className="library-books-grid">
          {sampleBooks.map((book) => (
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
