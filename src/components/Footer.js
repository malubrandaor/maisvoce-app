import { useHistory } from 'react-router-dom';
import '../App.css'; // import do hook

function Footer() {
  const history = useHistory();

  function routeDrink() {
    history.push('/drinks'); // uso do hook para ir para a página /dogRegister
  }
  function routeMeal() {
    history.push('/meals'); // uso do hook para ir para a página /dogRegister
  }

  return (
    <div data-testid="footer" className="divFooter">
      <button
        onClick={ routeDrink }
        type="button"
      >
        <img
          src="../images/drinkIcon.svg"
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        onClick={ routeMeal }
        type="button"
      >
        <img
          src="../images/mealIcon.svg"
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
        />
      </button>

    </div>
  );
}

export default Footer;
