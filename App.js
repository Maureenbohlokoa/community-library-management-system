import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

const defaultBooks = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Fiction",
    isbn: "9780385474542",
    quantity: 3,
    available: 3
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    isbn: "9780062315007",
    quantity: 2,
    available: 1
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Technology",
    isbn: "9780132350884",
    quantity: 4,
    available: 4
  }
];

const defaultUsers = [
  {
    id: 1,
    name: "Library Administrator",
    membershipId: "ADMIN001",
    role: "Admin"
  }
];

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("libraryBooks");

    return savedBooks
      ? JSON.parse(savedBooks)
      : defaultBooks;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("libraryUsers");

    return savedUsers
      ? JSON.parse(savedUsers)
      : defaultUsers;
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      "libraryTransactions"
    );

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "libraryCurrentUser"
    );

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    localStorage.setItem(
      "libraryBooks",
      JSON.stringify(books)
    );
  }, [books]);

  useEffect(() => {
    localStorage.setItem(
      "libraryUsers",
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "libraryTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "libraryCurrentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("libraryCurrentUser");
    }
  }, [currentUser]);

  // LOGIN
  const login = (membershipId) => {
    const enteredId = membershipId
      .trim()
      .toLowerCase();

    const foundUser = users.find(
      (user) =>
        user.membershipId.toLowerCase() === enteredId
    );

    if (!foundUser) {
      return false;
    }

    setCurrentUser(foundUser);

    return true;
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
  };

  // REGISTER NEW MEMBER
  // New members will receive:
  // MEMBER111
  // MEMBER112
  // MEMBER113
  // MEMBER114
  // and so on
  const registerUser = (name) => {
    const memberNumbers = users
      .filter((user) =>
        user.membershipId.startsWith("MEMBER")
      )
      .map((user) =>
        parseInt(
          user.membershipId.replace("MEMBER", ""),
          10
        )
      )
      .filter(
        (number) => !Number.isNaN(number)
      );

    const highestNumber =
      memberNumbers.length > 0
        ? Math.max(...memberNumbers)
        : 110;

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      membershipId: `MEMBER${highestNumber + 1}`,
      role: "Member"
    };

    setUsers((previousUsers) => [
      ...previousUsers,
      newUser
    ]);

    return newUser;
  };

  // ADD BOOK
  const addBook = (bookData) => {
    const quantity = Number(
      bookData.quantity
    );

    const newBook = {
      id: Date.now(),
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      genre: bookData.genre.trim(),
      isbn: bookData.isbn.trim(),
      quantity: quantity,
      available: quantity
    };

    setBooks((previousBooks) => [
      ...previousBooks,
      newBook
    ]);
  };

  // UPDATE BOOK
  const updateBook = (updatedBook) => {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === updatedBook.id
          ? updatedBook
          : book
      )
    );
  };

  // DELETE BOOK
  const deleteBook = (bookId) => {
    setBooks((previousBooks) =>
      previousBooks.filter(
        (book) => book.id !== bookId
      )
    );
  };

  // CHANGE BOOK STOCK
  const changeStock = (
    bookId,
    amount,
    type
  ) => {
    const selectedBook = books.find(
      (book) => book.id === bookId
    );

    if (!selectedBook) {
      return false;
    }

    // Do not allow borrowing more books
    // than are available
    if (
      type === "Borrow" &&
      amount > selectedBook.available
    ) {
      return false;
    }

    const newAvailable =
      type === "Add"
        ? selectedBook.available + amount
        : selectedBook.available - amount;

    const newQuantity =
      type === "Add"
        ? selectedBook.quantity + amount
        : selectedBook.quantity;

    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              quantity: newQuantity,
              available: newAvailable
            }
          : book
      )
    );

    const newTransaction = {
      id: Date.now(),
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      type: type,
      quantity: amount,
      date: new Date().toLocaleString()
    };

    setTransactions(
      (previousTransactions) => [
        newTransaction,
        ...previousTransactions
      ]
    );

    return true;
  };

  // ADD USER
  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      membershipId:
        userData.membershipId.trim(),
      role: userData.role
    };

    setUsers((previousUsers) => [
      ...previousUsers,
      newUser
    ]);
  };

  // UPDATE USER
  const updateUser = (updatedUser) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );

    if (
      currentUser &&
      currentUser.id === updatedUser.id
    ) {
      setCurrentUser(updatedUser);
    }
  };

  // DELETE USER
  const deleteUser = (userId) => {
    // Prevent the currently logged-in user
    // from deleting themselves
    if (
      currentUser &&
      currentUser.id === userId
    ) {
      return false;
    }

    setUsers((previousUsers) =>
      previousUsers.filter(
        (user) => user.id !== userId
      )
    );

    return true;
  };

  // PROTECTED ROUTE
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    return children;
  };

  // ADMIN-ONLY ROUTE
  const AdminRoute = ({ children }) => {
    if (!currentUser) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    if (currentUser.role !== "Admin") {
      return (
        <Navigate
          to="/"
          replace
        />
      );
    }

    return children;
  };

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      {currentUser && (
        <Navbar
          currentUser={currentUser}
          logout={logout}
        />
      )}

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
              <Login
                login={login}
                registerUser={registerUser}
              />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard
                books={books}
                currentUser={currentUser}
              />
            </ProtectedRoute>
          }
        />

        {/* BOOKS */}
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books
                books={books}
                addBook={addBook}
                updateBook={updateBook}
                deleteBook={deleteBook}
                currentUser={currentUser}
              />
            </ProtectedRoute>
          }
        />

        {/* TRANSACTIONS */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions
                books={books}
                transactions={transactions}
                changeStock={changeStock}
              />
            </ProtectedRoute>
          }
        />

        {/* USERS - ADMIN ONLY */}
        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users
                users={users}
                currentUser={currentUser}
                addUser={addUser}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            </AdminRoute>
          }
        />

        {/* ANY UNKNOWN PAGE */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;