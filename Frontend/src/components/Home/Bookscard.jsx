import BooksSingleCard from "./BooksSingleCard";

// eslint-disable-next-line react/prop-types
const Bookscard = ({ books }) => {
  console.log(books);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {books.map((item) => (
        <BooksSingleCard key={item._id} book={item} />
        // <BooksSingleCard key={book._id} book={book} />

      ))}
    </div>
  );
};

export default Bookscard;
