import React from 'react';
import './RecipeCard.css';

let RecipeCard = props => {
  const {name, category, authorFirst, authorLast, ingredients, instructions } = props;
  const ingredientsDisplay = ingredients.map((ingredient, i) => {
    return <li key={i}>{ingredient}</li>
  })
  const instructionsDisplay = instructions.map((instruction, i) => {
    return <li key={i}>{instruction}</li>;
  });
  return (
    <div className="RecipeCard">
      <div className="title_container">
        <h2>{name}</h2>
        <p>#{category}</p>
      </div>
      <p>
        by {authorFirst} {authorLast}
      </p>
        <h3>Ingredients</h3>
      <div className="ingredients_container">
        <ul className="list">{ingredientsDisplay}</ul>
      </div>
        <h3>Instructions</h3>
      <div className="instructions_container">
        <ol className="list">{instructionsDisplay}</ol>
      </div>
    </div>
  );
}

export default RecipeCard;