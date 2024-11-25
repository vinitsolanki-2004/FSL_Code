import React, { useState, useEffect } from "react";
import API from "../utils/api";

const CourseForm = ({ fetchCourses, editingCourse, setEditingCourse }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData(editingCourse);
    } else {
      setFormData({ name: "", description: "", price: "" });
    }
  }, [editingCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // Update course
        await API.put(`/courses/${editingCourse.id}`, formData);
      } else {
        // Add new course
        await API.post("/courses", formData);
      }
      fetchCourses();
      setEditingCourse(null);
      setFormData({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-success">
        {editingCourse ? "Update Course" : "Add Course"}
      </button>
      {editingCourse && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => setEditingCourse(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CourseForm;