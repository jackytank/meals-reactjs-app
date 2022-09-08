import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';

function Search() {
    const { setSearchTerm, fetchRandomMeal } = useGlobalContext();
    const [text, setText] = useState('');

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (text) {
            setSearchTerm(text);
            setText('');
        }
    }

    function handleRandomMeal() {
        setSearchTerm('');
        setText('');
        fetchRandomMeal();
    }

    return (
        <header className="search-container">
            <form action="" onSubmit={handleSubmit}>
                <input onChange={handleChange} value={text} type="text" className="form-input" placeholder='Type fovorite meals' />
                <button className="btn" type='submit'>Search</button>
                <button className="btn btn-hipster" type='button' onClick={handleRandomMeal}>Surprise me!</button>
            </form>
        </header>
    );
}

export default Search;