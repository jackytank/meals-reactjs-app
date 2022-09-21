import React, { useContext, useEffect, useState } from 'react';
const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    } else {
        favorites = [];
    }
    return favorites;
};


function AppProvider({ children }) {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
        if (alreadyFavorite) return;
        const updatedFavorite = [...favorites, meal];
        setFavorites(updatedFavorite);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorite));
    };

    const removeFromFavorites = (idMeal) => {
        const updatedFavorite = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorite);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorite));
    };

    function closeModal() {
        setShowModal(false);
    }

    function selectMeal(idMeal, favoriteMeal) {
        let meal;
        meal = meals.find((meal) => meal.idMeal === idMeal);
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl);
    };

    useEffect(() => {
        fetchMeals(allMealsUrl);
    }, []);

    useEffect(() => {
        if (!searchTerm) return;
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return (
        <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }} >
            {children}
        </AppContext.Provider >
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };