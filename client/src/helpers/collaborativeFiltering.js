const determineSimilarityQuocient = (userOne, userTwo) => {
  let equalRates = 0;
  for (let meal of userTwo.ratings) {
    if (userOne.ratings.includes(meal)) {
      equalRates++;
    }
  }
  return equalRates / userOne.ratings.length;
};

const findMostSimilarUser = (user, userList) => {
  console.log(userList);
  let simScore = 0;
  let mostSimUser = null;
  for (let userTwo of userList) {
    if (userTwo.name === user.name) {
      continue;
    }
    let currentScore = 0;
    currentScore = determineSimilarityQuocient(user, userTwo);
    console.log(currentScore);
    if (currentScore > simScore) {
      simScore = currentScore;
      mostSimUser = userTwo;
    }
  }
  return mostSimUser;
};

//Actual implementation, this would also take a category argument, to filter to a more specific taste
const getRecommendation = (user, userList) => {
  const userToGet = findMostSimilarUser(user, userList);
  console.log(userToGet);
  if (!userToGet) {
    return ['No available movies'];
  }
  let mealsToRecommend = userToGet.ratings.filter((meal) => {
    return !user.ratings.includes(meal);
  });
  return mealsToRecommend.splice(0, 3);
};

export default getRecommendation;
