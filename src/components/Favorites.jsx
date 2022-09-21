import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';


function Favorites() {
    const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();


    return (
        <section className='favorites'>
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {favorites.map((item) => {
                        const { idMeal, strMealThumb: image } = item;
                        return (
                            <div key={idMeal} className="favorite-item">
                                <img src={image} alt="" className="favorites-img img" />
                                <button className="remove-btn" onClick={() => removeFromFavorites(idMeal)}>Remove</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Favorites;