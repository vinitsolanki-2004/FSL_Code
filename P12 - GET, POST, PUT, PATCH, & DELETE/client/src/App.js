import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

const App = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", description: "", price: "" });
  const [editCourse, setEditCourse] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", price: "" });

  const apiUrl = "http://localhost:5000/courses";

  // Fetch all courses
  useEffect(() => {
    axios.get(apiUrl)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new course
  const addCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.price) {
      axios.post(apiUrl, newCourse)
        .then((res) => setCourses([...courses, res.data]))
        .catch((err) => console.error(err));
      setNewCourse({ name: "", description: "", price: "" });
    }
  };

  // Update a course
  const updateCourse = (id) => {
    axios.put(`${apiUrl}/${id}`, editData)
      .then((res) => {
        setCourses(courses.map((course) => (course.id === id ? res.data : course)));
        setEditCourse(null);
        setEditData({ name: "", description: "", price: "" });
      })
      .catch((err) => console.error(err));
  };

  // Delete a course
  const deleteCourse = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => setCourses(courses.filter((course) => course.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Course Management</h1>

      {/* Add Course Section */}
      <div className="form">
        <h2>Add Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newCourse.price}
          onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
        />
        <button onClick={addCourse}>Add Course</button>
      </div>

      {/* Courses List */}
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            {editCourse === course.id ? (
              <div>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Description"
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                  placeholder="Price"
                />
                <button onClick={() => updateCourse(course.id)}>Save</button>
                <button onClick={() => setEditCourse(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <p>Price: ${course.price}</p>
                <button onClick={() => {
                  setEditCourse(course.id);
                  setEditData(course);
                }}>Edit</button>
                <button onClick={() => deleteCourse(course.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;