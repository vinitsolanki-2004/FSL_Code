// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ bookId, onBookSaved }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        if (bookId) {
            axios.get(`http://localhost:5000/${bookId}`)
                .then(response => {
                    const { title, author, year } = response.data;
                    setTitle(title);
                    setAuthor(author);
                    setYear(year);
                })
                .catch(err => console.error(err));
        } else {
            // Reset form fields when no book is selected for editing
            setTitle('');
            setAuthor('');
            setYear('');
        }
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = { title, author, year };
        try {
            let response;
            if (bookId) {
                response = await axios.put(`http://localhost:5000/${bookId}`, bookData); // Update book
            } else {
                response = await axios.post('http://localhost:5000/', { bookData }); // Create new book
            }
            onBookSaved(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
            />
            <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
                required
            />
            <button type="submit">{bookId ? 'Update Book' : 'Save Book'}</button>
        </form>
    );
};

export default BookForm;