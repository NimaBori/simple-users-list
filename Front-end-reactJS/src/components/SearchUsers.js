import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function SearchUsers({ users, setShowUserSearch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emails, setEmails] = useState([]);

  function handleOnSearch(e) {
    e.preventDefault();
    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      if (
        user.firstName.toLowerCase() === firstName ||
        user.lastName.toLowerCase() === lastName
      ) {
        if (!emails.includes(user.email)) {
          setEmails((prev) => [...prev, user.email]);
        } else {
          setEmails([]);
        }
      }
    });
    console.log(emails);
  }

  return (
    <>
      <Modal
        size="lg"
        show={setShowUserSearch}
        onHide={() => setShowUserSearch(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Search Users
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="search__form" onSubmit={(e) => handleOnSearch(e)}>
            <input
              className="search__form_firstName--input"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              className="search__form_lastName--input"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <button className="search__form_submitBtn" type="submit">
              Search
            </button>
          </form>
          <div>
            {emails.length > 0 &&
              emails.map((email, index) => (
                <div key={index}>
                  <div>email: {email}</div>
                  <div>
                    {users.map(
                      (user) => user.email === email && user.firstName
                    )}
                  </div>
                  <div>
                    {users.map((user) => user.email === email && user.lastName)}
                  </div>
                  <div>
                    {users.map((user) => user.email === email && user.id)}
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SearchUsers;
