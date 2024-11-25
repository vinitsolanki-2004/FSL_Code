import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const { data } = await API.get('/courses');
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Available Courses</h2>
            <ul className="list-group">
                {courses.map((course) => (
                    <li key={course._id} className="list-group-item">
                        <strong>{course.title}</strong> - {course.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;