import React, { useState } from "react";

function Users({
  users,
  currentUser,
  addUser,
  updateUser,
  deleteUser
}) {
  const emptyForm = {
    name: "",
    membershipId: "",
    role: "Member"
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
      form.name.trim() === "" ||
      form.membershipId.trim() === ""
    ) {
      setMessage("Please fill in the name and Membership ID.");
      return;
    }

    const duplicate = users.some(
      (user) =>
        user.membershipId.toLowerCase() ===
          form.membershipId.trim().toLowerCase() &&
        user.id !== editingId
    );

    if (duplicate) {
      setMessage("That Membership ID already exists.");
      return;
    }

    if (editingId !== null) {
      updateUser({
        id: editingId,
        name: form.name.trim(),
        membershipId: form.membershipId.trim(),
        role: form.role
      });

      setMessage("User updated successfully.");
      setEditingId(null);
    } else {
      addUser(form);
      setMessage("User added successfully.");
    }

    setForm(emptyForm);
  };

  const startEditing = (user) => {
    setEditingId(user.id);

    setForm({
      name: user.name,
      membershipId: user.membershipId,
      role: user.role
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  };

  const handleDelete = (user) => {
    if (user.id === currentUser.id) {
      setMessage(
        "You cannot delete the account that is currently logged in."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete ${user.name}?`
    );

    if (confirmed) {
      deleteUser(user.id);
      setMessage("User deleted successfully.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>
          Add, update and delete library users.
        </p>
      </div>

      <div className="form-section">
        <h2>
          {editingId !== null
            ? "Update User"
            : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
              />
            </div>

            <div>
              <label>Membership ID</label>

              <input
                type="text"
                name="membershipId"
                value={form.membershipId}
                onChange={handleChange}
                placeholder="Example: MEM002"
              />
            </div>

            <div>
              <label>Role</label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <button className="primary-button" type="submit">
            {editingId !== null
              ? "Update User"
              : "Add User"}
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
          <p className="message">{message}</p>
        )}
      </div>

      <div className="section">
        <h2>Library Users</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.membershipId}</td>
                <td>{user.role}</td>

                <td>
                  <button
                    className="small-button"
                    onClick={() => startEditing(user)}
                  >
                    Update
                  </button>

                  <button
                    className="small-button delete-button"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;