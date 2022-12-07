import React, { useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard(props) {
  const { recipe, index, onUnfavoriteRecipe } = props;

  const [isCopied, setIsCopied] = useState(false);

  const onCopyToClipboard = () => {
    const url = window.location.origin;
    const { id, type } = recipe;
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);
    setIsCopied(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => setIsCopied(false), TWO_SECONDS);
  };

  return (
    <div key={ recipe.id }>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt={ recipe.name }
      />

      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.nationality.length > 0
               && `${recipe.nationality} - ${recipe.category}` }

        { recipe.alcoholicOrNot.length > 0 && `Alcoholic - ${recipe.category}` }
      </p>

      <p data-testid={ `${index}-horizontal-name` }>
        { recipe.name }
      </p>

      <img
        src={ shareIcon }
        alt="share icon"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ onCopyToClipboard }
        aria-hidden
      />

      <img
        src={ blackHeartIcon }
        alt="favorite icon"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => onUnfavoriteRecipe(recipe.id) }
        aria-hidden
      />

      { isCopied && <p role="alert">Link copied!</p> }
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onUnfavoriteRecipe: PropTypes.func.isRequired,
};

export default FavoriteRecipesCard;
