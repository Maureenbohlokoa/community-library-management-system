import React, { useState } from "react";

function Books({
  books,
  addBook,
  updateBook,
  deleteBook,
  currentUser
}) {
  const emptyForm = {
    title: "",
    author: "",
    genre: "",
    isbn: "",
    quantity: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (
      form.title.trim() === "" ||
      form.author.trim() === "" ||
      form.genre.trim() === "" ||
      form.isbn.trim() === "" ||
      form.quantity === ""
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (Number(form.quantity) < 0) {
      setMessage("Quantity cannot be negative.");
      return;
    }

    if (editingId !== null) {
      const oldBook = books.find(
        (book) => book.id === editingId
      );

      const difference =
        Number(form.quantity) - oldBook.quantity;

      let newAvailable =
        oldBook.available + difference;

      if (newAvailable < 0) {
        newAvailable = 0;
      }

      const updatedBook = {
        ...oldBook,
        title: form.title.trim(),
        author: form.author.trim(),
        genre: form.genre.trim(),
        isbn: form.isbn.trim(),
        quantity: Number(form.quantity),
        available: newAvailable
      };

      updateBook(updatedBook);
      setMessage("Book updated successfully.");
      setEditingId(null);
    } else {
      addBook(form);
      setMessage("Book added successfully.");
    }

    setForm(emptyForm);
  };

  const startEditing = (book) => {
    setEditingId(book.id);

    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: book.quantity
    });

    setMessage("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  };

  const handleDelete = (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmed) {
      deleteBook(bookId);
      setMessage("Book deleted successfully.");
    }
  };

  const isAdmin = currentUser.role === "Admin";

  return (
    <div className="page">
      <div className="page-header">
        <h1>Book Management</h1>
        <p>
          Add, update, delete and view library books.
        </p>
      </div>

      {isAdmin ? (
        <>
          <div className="form-section">
            <h2>
              {editingId !== null
                ? "Update Book"
                : "Add New Book"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Book title"
                  />
                </div>

                <div>
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label>Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                  />
                </div>

                <div>
                  <label>ISBN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    placeholder="ISBN"
                  />
                </div>

                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                  />
                </div>
              </div>

              <button className="primary-button" type="submit">
                {editingId !== null
                  ? "Update Book"
                  : "Add Book"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              )}
            </form>

            {message && (
              <p className="success-message">{message}</p>
            )}
          </div>
        </>
      ) : (
        <div className="info-box">
          You are logged in as a Member. You can view the
          library books, but only an Administrator can add,
          update or delete books.
        </div>
      )}

      <div className="section">
        <h2>Library Books</h2>

        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Quantity</th>
                <th>Available</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>
                  <td>{book.available}</td>

                  {isAdmin && (
                    <td>
                      <button
                        className="small-button"
                        onClick={() => startEditing(book)}
                      >
                        Update
                      </button>

                      <button
                        className="small-button delete-button"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Books;