import React, { useState } from "react";

function Transactions({
  books,
  transactions,
  changeStock
}) {
  const [bookId, setBookId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("Add");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (bookId === "" || quantity === "") {
      setMessage("Please select a book and enter a quantity.");
      return;
    }

    const amount = Number(quantity);

    if (amount <= 0) {
      setMessage("Quantity must be greater than zero.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(bookId)
    );

    if (!selectedBook) {
      setMessage("Book not found.");
      return;
    }

    if (
      type === "Borrow" &&
      amount > selectedBook.available
    ) {
      setMessage(
        `Only ${selectedBook.available} copy/copies are currently available.`
      );
      return;
    }

    const success = changeStock(
      Number(bookId),
      amount,
      type
    );

    if (success) {
      setMessage("Transaction completed successfully.");
      setBookId("");
      setQuantity("");
    } else {
      setMessage("Transaction could not be completed.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Transactions</h1>
        <p>
          Manage book stock and record borrowing transactions.
        </p>
      </div>

      <div className="form-section">
        <h2>New Transaction</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Book</label>

              <select
                value={bookId}
                onChange={(event) =>
                  setBookId(event.target.value)
                }
              >
                <option value="">Select a book</option>

                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} - {book.available} available
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Transaction Type</label>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >
                <option value="Add">Add Stock</option>
                <option value="Borrow">Borrow Book</option>
              </select>
            </div>

            <div>
              <label>Quantity</label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
                placeholder="Enter quantity"
              />
            </div>
          </div>

          <button className="primary-button" type="submit">
            Save Transaction
          </button>
        </form>

        {message && (
          <p className="message">{message}</p>
        )}
      </div>

      <div className="section">
        <h2>Transaction History</h2>

        {transactions.length === 0 ? (
          <p>No transactions have been recorded yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.bookTitle}</td>
                  <td>
                    {transaction.type === "Add"
                      ? "Stock Added"
                      : "Book Borrowed"}
                  </td>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Transactions;