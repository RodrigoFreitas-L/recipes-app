// import React from 'react';
// import { useSelector } from 'react-redux';

// // fazer a rota da tela de detalhes para essa tela de receitas em andamento
// function CardDrinkInProgress() {
//   const { drinks } = useSelector((state) => state.drinks);
//   const riscaTarget = (item) => {
//     const taskItem = item.target;
//     if (taskItem.className === 'completed') {
//       taskItem.classList.remove('completed');
//     } else {
//       taskItem.classList.add('completed');
//     }
//   };

//   const riscaTargetOnClick = () => {
//     const taskTarget = document.querySelectorAll('li');
//     for (let i = 0; i < taskTarget.length; i += 1) {
//       taskTarget[i].addEventListener('dblclick', riscaTarget);
//     }
//   };

//   // Função que faz o item ser riscado quando completo
//   return (
//   //  const listDrinkInProgress = drinks.map((drink, index) => (
//     <div
//       data-testid={ `${index}-recipe-card` }
//       key={ drink.idDrink }
//     >
//       <img
//         data-testid="recipe-photo"
//         src={ drink.strDrinkThumb }
//         alt={ drink.strDrink }
//       />
//       <h1
//         data-testid={ `${index}-recipe-title` }
//       >
//         { drink.strDrink }
//       </h1>
//       <button
//         data-testid={ `${index}-share-btn` }
//         type="button"
//         // onClick={ () => { handleClickShere } }
//         // precisa redirecionar para a tela de compartilhamento
//         // colocar aqui o EMOJI
//         // pede pra ser um botton mas posso colocar button dentro do link?
//       >
//         Share
//       </button>
//       <button
//         data-testid={ `${index}-favorite-btn` }
//         type="button"
//         // onClick={ () => {
//         // colocar aqui o EMOJI e o código para adicionar a receita aos favoritos
//       >
//         Favorite
//       </button>
//       <p
//         data-testid={ `${index}-recipe-category` }
//       >
//         { drink.strCategory }
//       </p>

//       <label
//         htmlFor={ ingredients[index] }
//       >
//         <input
//           data-testid={ `${index}-ingredient-step` }
//           type="checkbox"
//           name="ingredient-step"
//           value="ingredient-step"
//           onClick={ () => { drink.ingredientStep = !drink.ingredientStep; } }
//           checked={ drink.ingredientStep }
//         />
//       </label>

//       <p
//         data-testid={ `${index}-instructions` }
//       >
//         { drink.strInstructions }
//       </p>
//       <button
//         data-testid={ `${index}-finish-recipe-btn` }
//         type="button"
//         // onClick={ () => { handleClickBackHome } } // cadê a logica para voltar para a tela de receitas prontas
//       >
//         Finish
//       </button>
//     </div>
//   // ));
//   );
// }

// export default CardDrinkInProgress;
