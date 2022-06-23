import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CardDrink() {
  const { location } = useHistory();
  const [idDrink, setIdDrink] = useState('');
  useEffect(() => {
    const id = location.pathname.split('/')[2];
    setIdDrink(id);
  }, [location]);
  return (
    <h2>{`Hello World - ${idDrink}`}</h2>
  );
}

export default CardDrink;
