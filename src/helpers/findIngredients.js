const findIngredients = (obj) => {
  const ingredients = [];
  const ingredientsWithMeasures = [];
  Object.keys(obj)
    .filter((obj1) => obj1.includes('strIngredient')).forEach((obj3) => {
      if (obj[obj3] !== null && obj[obj3] !== '') {
        ingredients.push(obj[obj3]);
      }
    });

  let counter = 1;
  ingredients.forEach((obj4, i) => {
    if (i === 0) { counter = 1; }
    ingredientsWithMeasures.push({ name: obj4, measure: obj[`strMeasure${counter}`] });
    counter += 1;
  });
  return ingredientsWithMeasures;
};

export default findIngredients;
