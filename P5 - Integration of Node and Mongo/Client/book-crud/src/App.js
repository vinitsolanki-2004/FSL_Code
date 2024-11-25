// src/App.js
import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
    const [editBookId, setEditBookId] = useState(null); // State to track the book being edited
    const [updatedBook, setUpdatedBook] = useState(null); // Store the updated book

    const handleBookSaved = (book) => {
        setUpdatedBook(book);
        setEditBookId(null); // Reset edit mode after saving
    };

    const handleEditBook = (id) => {
        setEditBookId(id); // Set the ID of the book to be edited
    };

    return (
        <div className="App">
            <h1>Book CRUD</h1>
            <BookForm bookId={editBookId} onBookSaved={handleBookSaved} />
            <BookList onEditBook={handleEditBook} />
            {updatedBook && (
                <div>
                    <h3>Last Updated Book:</h3>
                    <p>Title: {updatedBook.title}</p>
                    <p>Author: {updatedBook.author}</p>
                    <p>Year: {updatedBook.year}</p>
                </div>
            )}
        </div>
    );
}

export default App;