const generateKey = () => {
  return new Date().getTime() * Math.random();
};

export default generateKey;
