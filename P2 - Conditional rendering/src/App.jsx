import { useState } from 'react';
import './App.css';

function App() {
  const [current, setCurrent] = useState("");
  const [users, setUsers] = useState([
    { name: "User 1", age: 20, gender: "Male" },
    { name: "User 2", age: 29, gender: "Male" },
    { name: "User 3", age: 17, gender: "Female" },
    { name: "User 4", age: 19, gender: "Female" },
    { name: "User 5", age: 15, gender: "Male" },
    { name: "User 6", age: 23, gender: "Male" }
  ]);

  const [originalUsers] = useState([...users]);

  const filterUsers = (gender) => {
    if (current === gender) {
      setUsers(originalUsers);
      setCurrent("");
    } else {
      setUsers(originalUsers.filter(user => user.gender === gender));
      setCurrent(gender);
    }
  };

  return (
    <div className="App">
      <h1>User List</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="filter-buttons">
        <button
          className="filter-btn"
          onClick={() => filterUsers("Male")}
        >
          {current === "Male" ? "Clear Filter" : "Filter Male"}
        </button>
        <button
          className="filter-btn"
          onClick={() => filterUsers("Female")}
        >
          {current === "Female" ? "Clear Filter" : "Filter Female"}
        </button>
      </div>
    </div>
  );
}

export default App;
