import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function NewUserForm({
  showUserForm,
  editUser,
  isUserEditing,
  userId,
  updateUsersList,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { firstName: firstName, lastName: lastName, email: email };
    if (!editUser) {
      createUser(newUser);
      showUserForm(false);
      setFirstName("");
      setLastName("");
      setEmail("");
    } else {
      isUserEditing(false);
      updateUser(userId, newUser);
      showUserForm(false);
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };

  async function createUser(user) {
    try {
      const response = await axios
        .post("http://localhost:8080/api/users", user)
        .then(() => updateUsersList(true));
      console.log(response.status, "User Created!", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async function updateUser(id, user) {
    try {
      axios
        .put("http://localhost:8080/api/update/" + id, user)
        .then((res) => {
          console.log("PUT request successful:", res.data);
        })
        .then(() => updateUsersList(true));
    } catch (error) {
      console.log("Unable to edit user: ", error);
    }
  }

  return (
    <Modal
      size="sm"
      show={showUserForm}
      onHide={() => showUserForm(false)}
      aria-labelledby="example-modal-sizes-title-sm"
      animation="true"
      co
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="user__form" onSubmit={handleSubmit}>
          <div className="user__form_firstName">
            <label className="user__form_firstName--label" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="user__form_firstName--input"
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="user__form_lastName">
            <label className="user__form_lastName--label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="user__form_lastName--input"
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="user__form_email">
            <label className="user__form_email--label" htmlFor="email">
              Email:
            </label>
            <input
              className="user__form_email--input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="user__form_submitBtn" type="submit">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default NewUserForm;
