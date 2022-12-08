import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard(props) {
  const { recipe, index } = props;

  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);

  const onCopyToClipboard = () => {
    const url = window.location.origin;
    const { id, type } = recipe;
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);
    setIsCopied(true);
    // const TWO_SECONDS = 2000;
    // setTimeout(() => setIsCopied(false), TWO_SECONDS);
  };

  const onRedirectToDetails = () => {
    const { id, type } = recipe;
    history.push(`/${type}s/${id}`);
  };

  return (
    <div key={ recipe.id }>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt={ recipe.name }
        onClick={ onRedirectToDetails }
        aria-hidden
        style={ { width: '100%' } }
      />

      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.nationality.length > 0
       && `${recipe.nationality} - ${recipe.category}` }

        { recipe.alcoholicOrNot.length > 0 && `Alcoholic - ${recipe.category}` }
      </p>

      <p
        data-testid={ `${index}-horizontal-name` }
        onClick={ onRedirectToDetails }
        aria-hidden
      >
        { recipe.name }
      </p>

      {recipe.tags.length !== 0 && recipe.tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      )) }

      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>

      <img
        src={ shareIcon }
        alt="share icon"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ onCopyToClipboard }
        aria-hidden
      />

      { isCopied && <p role="alert">Link copied!</p> }
    </div>
  );
}

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipesCard;
