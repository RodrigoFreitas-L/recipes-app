/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe, storageName }) {
  const history = useHistory();
  const storage = localStorage.getItem(storageName);
  // const [] = useState(false);
  // const [isChecked, setIsChecked] = useState([]);

  const handleCheckBoxIngredient = ({ target }, result) => {
    // console.log(target.nextElementSibling.innerHTML);
    if (target.checked) {
      const getIngredient = JSON.parse(localStorage.getItem(storageName));
      const newIngredient = [...getIngredient, result];
      localStorage.setItem(storageName, JSON.stringify(newIngredient));
    } else {
      const getIngredient = JSON.parse(localStorage.getItem(storageName));
      const index = getIngredient.indexOf(result);
      getIngredient.splice(index, 1);
      localStorage.setItem(storageName, JSON.stringify(getIngredient));
    }
  };

  useEffect(() => {
    const checkVerify = () => {
      const nodeList = document.querySelectorAll('.foodIngredient');
      const makeAList = [...nodeList];
      const newList = makeAList.map((list) => (storage.includes(list.innerHTML)
        ? list.previousElementSibling.setAttribute('checked', true)
        : list.previousElementSibling.setAttribute('unchecked', true)));
      return newList;
    };
    checkVerify();
  }, [storage]);

  const renderIngredients = () => {
    // Pegando os ingredientes
    const ingredientsList = Object.entries(recipe).filter((key) => {
      if (key[0].includes('strIngredient') && key[1] !== '' && key[1] !== null) {
        return key;
      }
      return false;
    });

    const measuresList = Object.entries(recipe).filter((key) => {
      if (key[0].includes('strMeasure') && key[1] !== '' && key[1] !== null) {
        return key;
      }
      return false;
    });

    return ingredientsList.map((ingredient, index) => {
      const value = ingredient[1];
      const result = `${measuresList[index][1]} ${value}`;
      return (
        <label
          htmlFor={ ingredient[index] }
          data-testid={ `${index}-ingredient-step` }
          key={ `${index}-${ingredient}` }
        >
          <input
            type="checkbox"
            id={ ingredient[index] }
            className="checkBoxInput"
            onChange={ (e) => handleCheckBoxIngredient(e, result) }
          />
          <li
            className="foodIngredient"
          >
            {result}
          </li>
        </label>
      );
    });
  };

  return (
    <ul>
      { recipe !== undefined && renderIngredients() }
    </ul>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.shape),
}.isRequired;

export default Ingredients;
