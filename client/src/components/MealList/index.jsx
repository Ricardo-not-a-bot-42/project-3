import React from "react";

function MealList(props) {
  console.log(props.meals);
  return (
    <>
      {props.meals.map((meal) => (
        <h4>{meal.name}</h4>
      ))}
    </>
  );
}

export default MealList;
