// src/components/Book.js
import React from 'react';

const Book = ({ book, onEdit, onDelete }) => {
    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={() => onDelete(book._id)}>Delete</button>
        </div>
    );
};

export default Book;