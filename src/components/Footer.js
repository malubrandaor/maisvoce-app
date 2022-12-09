import { useHistory } from 'react-router-dom';
import '../App.css'; // import do hook

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import styles from '../styles/footer/Footer.module.scss';

function Footer() {
  const history = useHistory();

  function routeDrink() {
    history.push('/drinks'); // uso do hook para ir para a página /dogRegister
  }
  function routeMeal() {
    history.push('/meals'); // uso do hook para ir para a página /dogRegister
  }

  return (
    <div
      data-testid="footer"
      className={ styles.footer }
    >
      <img
        src={ drinkIcon }
        alt="Drink Icon"
        onClick={ routeDrink }
        aria-hidden
        data-testid="drinks-bottom-btn"
      />

      <img
        src={ mealIcon }
        alt="Meal Icon"
        onClick={ routeMeal }
        aria-hidden
        data-testid="meals-bottom-btn"
      />
    </div>
  );
}

export default Footer;
