// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

const BookList = ({ onEditBook }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch all books when the component mounts
        axios.get('http://localhost:5000/')
            .then(response => {
                setBooks(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/${id}`);
            // After deletion, filter the book from the state
            setBooks(books.filter(book => book._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Books List</h2>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <Book book={book} onEdit={() => onEditBook(book._id)} onDelete={handleDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;