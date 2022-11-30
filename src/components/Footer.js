import { useHistory } from 'react-router-dom'; // import do hook

function Footer() {
  const history = useHistory();

  function routeDrink() {
    history.push('/drink'); // uso do hook para ir para a página /dogRegister
  }
  function routeMeal() {
    history.push('/meal'); // uso do hook para ir para a página /dogRegister
  }

  return (
    <div data-testid="footer">
      <button
        onClick={ routeDrink }
        data-testid="drinks-bottom-btn"
        type="button"
      >
        <img src="../images/drinkIcon.svg" alt="Drink Icon" />
      </button>
      <button
        onClick={ routeMeal }
        data-testid="meals-bottom-btn"
        type="button"
      >
        <img src="../images/mealIcon.svg" alt="Meal Icon" />
      </button>

    </div>
  );
}

export default Footer;
