import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard(props) {
  const { recipe, index } = props;

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
      />

      <img
        src={ blackHeartIcon }
        alt="favorite icon"
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
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
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipesCard;
