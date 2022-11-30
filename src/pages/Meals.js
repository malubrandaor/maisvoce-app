import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Meals() {
  return (
    <>
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
