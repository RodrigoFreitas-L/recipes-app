import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CardFood() {
  const { location } = useHistory();
  const [idMeal, setIdMeal] = useState('');
  useEffect(() => {
    const id = location.pathname.split('/')[2];
    setIdMeal(id);
  }, [location]);
  return (
    <h2>{`Hello World - ${idMeal}`}</h2>
  );
}

export default CardFood;
