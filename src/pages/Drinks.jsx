import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { setDrinks } from '../redux/reducers/drinksSlice';

function Drinks() {
  const { drinks } = useSelector((state) => state.drinks);
  const [filteredDrink, setFilteredDrink] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setFilteredDrink(drinks);
    if (filteredDrink.length === 1) {
      history.push(`/drinks/${filteredDrink[0].idDrink}`);
      setFilteredDrink([]);
      dispatch(setDrinks([]));
    }
  }, [dispatch, filteredDrink, drinks, history]);

  return (
    <>
      <Header title="Drinks" />
      { drinks.length !== 0 && filteredDrink.map((drink) => (
        <div key={ drink.idDrink }>
          <h1>{ drink.strDrink }</h1>
        </div>
      )) }
    </>
  );
}
export default Drinks;

// import React from 'react';
// import Header from '../components/Header';

// const Drinks = () => (
//   <div>
//     <Header title="Drinks" />
//   </div>
// );

// export default Drinks;
