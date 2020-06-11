const TOKEN_KEY = "stampTokens";

const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

const getTokens = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};

const deleteTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};

module.exports = { saveTokens, getTokens, deleteTokens };
