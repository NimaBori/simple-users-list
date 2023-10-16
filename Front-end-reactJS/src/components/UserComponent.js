import React, { useEffect, useState } from "react";
import axios from "axios";
import NewUserForm from "./newUserForm";
import SearchUsers from "./SearchUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUpLong } from "@fortawesome/free-solid-svg-icons";

const USERS_REST_API_URL = "http://localhost:8080/api/users";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [updateUsersList, setUpdateUserList] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showSrollTop, setShowScrollTop] = useState(false);

  function fetchUsers() {
    axios
      .get(USERS_REST_API_URL)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, [updateUsersList, showUserForm]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleDeleteBtn(id) {
    axios.delete(USERS_REST_API_URL + "/" + id).then(() => {
      setUpdateUserList(!updateUsersList);
    });
  }

  function updateShowSubmitFormStatus(status) {
    setShowUserForm(status);
  }

  function isUserEditing(status) {
    setEditUser(status);
  }

  function handleEditUser(id) {
    setEditUser(true);
    setShowUserForm(true);
    setUserId(id);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }

  return (
    <div className="users">
      <h1 className="users__title">ALL USERS LIST</h1>
      <div className="tools__container">
        <button
          className="btns tools__container_addBtn"
          onClick={() => setShowUserForm(true)}
        >
          Add New User
        </button>
        <button
          className="btns tools__container_searchBtn"
          onClick={() => setShowUserSearch(true)}
        >
          Search Users
        </button>
      </div>

      <div className="table__container">
        <table className="users__table">
          <thead className="users__table_thead">
            <tr className="users__table_thead--tr">
              <td className="users__table_thead--tr-id">Id</td>
              <td className="users__table_thead--tr-first">First Name</td>
              <td className="users__table_thead--tr-last">Last Name</td>
              <td className="users__table_thead--tr-email">Email Address</td>
            </tr>
          </thead>
          <tbody className="users__table_body">
            {users.map((user, index) => (
              <tr key={user.id} className="users__table_body--tr">
                <td
                  className={
                    index !== users.length - 1
                      ? "users__table_body--tr-id"
                      : "users__table_body--tr-id__last"
                  }
                >
                  {user.id}
                </td>
                <td className="users__table_body--tr-first">
                  {user.firstName}
                </td>
                <td className="users__table_body--tr-last">{user.lastName}</td>
                <td
                  className={
                    index !== users.length - 1
                      ? "users__table_body--tr-email"
                      : "users__table_body--tr-email__last"
                  }
                >
                  {user.email}
                </td>
                <td className="btns__container">
                  <button
                    className="btns__container_deleteBtn"
                    onClick={() => handleDeleteBtn(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btns__container_editBtn"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSrollTop && (
        <button className="scroll-to-top-button" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faUpLong} />
        </button>
      )}

      {showUserForm && (
        <NewUserForm
          showUserForm={updateShowSubmitFormStatus}
          isUserEditing={isUserEditing}
          editUser={editUser}
          userId={userId}
          updateUsersList={(value) => {
            setUpdateUserList(value);
          }}
        />
      )}
      {showUserSearch && (
        <SearchUsers users={users} setShowUserSearch={setShowUserSearch} />
      )}
    </div>
  );
}

export default UserComponent;
