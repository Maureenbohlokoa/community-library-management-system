import React from "react";

function Dashboard({ books, currentUser }) {
  const totalCopies = books.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const availableCopies = books.reduce(
    (total, book) => total + book.available,
    0
  );

  const lowStockBooks = books.filter(
    (book) => book.available < 2
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome, {currentUser.name}. Here is the current
            library overview.
          </p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Book Titles</h3>
          <p>{books.length}</p>
        </div>

        <div className="card">
          <h3>Total Copies</h3>
          <p>{totalCopies}</p>
        </div>

        <div className="card">
          <h3>Available Copies</h3>
          <p>{availableCopies}</p>
        </div>

        <div className="card low-card">
          <h3>Low Stock</h3>
          <p>{lowStockBooks.length}</p>
        </div>
      </div>

      <div className="section">
        <h2>Book Availability</h2>

        {books.length === 0 ? (
          <p>No books have been added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className={
                    book.available < 2 ? "low-stock" : ""
                  }
                >
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.quantity}</td>
                  <td>{book.available}</td>
                  <td>
                    {book.available === 0
                      ? "Unavailable"
                      : book.available < 2
                      ? "Low Stock"
                      : "Available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;