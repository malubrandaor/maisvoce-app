import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import styles from '../styles/recipes/RecipeCard.module.scss';

function FavoriteRecipesCard(props) {
  const { recipe, index, onUnfavoriteRecipe } = props;

  const [isCopied, setIsCopied] = useState(false);
  const history = useHistory();

  const onCopyToClipboard = () => {
    const url = window.location.origin;
    const { id, type } = recipe;
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);
    setIsCopied(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => setIsCopied(false), TWO_SECONDS);
  };

  const onRedirectToDetails = () => {
    const { id, type } = recipe;
    history.push(`/${type}s/${id}`);
  };

  return (
    <div
      key={ recipe.id }
      className={ `${styles.recipe_card} ${styles.favorite}` }
    >
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt={ recipe.name }
        onClick={ onRedirectToDetails }
        className={ styles.image }
        aria-hidden
      />

      <p
        data-testid={ `${index}-horizontal-name` }
        onClick={ onRedirectToDetails }
        className={ styles.name }
        aria-hidden
      >
        { recipe.name }
      </p>

      <p
        data-testid={ `${index}-horizontal-top-text` }
        className={ styles.category }
      >
        { recipe.nationality.length > 0
               && `${recipe.nationality} - ${recipe.category}` }

        { recipe.alcoholicOrNot.length > 0 && `Alcoholic - ${recipe.category}` }
      </p>

      <div className={ styles.controls }>
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

        { isCopied && <p className={ styles.copy }>Link copied!</p> }
      </div>
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
