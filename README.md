# Community Library Management System

## Web Applications Development Individual Assignment

This project is a Community Library Management System built with React.

The implementation is intentionally kept at the level of the Web Applications Development material covered up to Week 7.

## Technologies and concepts used

- JavaScript
- React
- JSX
- Functional components
- Props
- useState
- useEffect
- Forms and form submission
- Basic validation
- React Router
- Local Storage
- HTML tables
- CSS

No backend database or server-side authentication is used.

## Main pages

- Login/Register
- Dashboard
- Books
- Transactions
- Users

## Administrator demonstration account

Membership ID:

ADMIN001

Role:

Admin

The administrator account is created automatically the first time the application is opened.

## Normal member registration

A normal user can select Register on the login page.

The system automatically creates a Membership ID such as:

MEM001

The user can then use that Membership ID to log in.

## Administrator functions

The Administrator can:

- View the dashboard
- Add books
- Update books
- Delete books
- View book availability
- Add stock
- Record borrowed books
- View transaction history
- Add users
- Update users
- Delete users

## Local Storage

The application stores books, users, transactions and the current login session in the browser's Local Storage.

This means the information remains available after refreshing the page.

## How to run

Open Command Prompt inside the project folder.

Run:

npm install

Then run:

npm start

The application should open in the browser.

## Important

JavaScript/React code goes inside the files in the `src` folder.

Commands such as `npm install` and `npm start` are typed into Command Prompt.

Do not paste React code into Command Prompt.
