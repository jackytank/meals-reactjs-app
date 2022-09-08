import { useState } from 'react';
import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import { useGlobalContext } from './context';


export default function App() {

  const { showModal } = useGlobalContext();

  return (
    <main>
      <Search></Search>
      {/* <Favorites></Favorites>  */}
      <Meals></Meals>
      {showModal && <Modal />}
    </main>
  );
}

