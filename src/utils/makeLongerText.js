export const makeLonger = (AIArticle, setResponseStatus, mutate) => {
  mutate(
    `${AIArticle}. \n\nmake this more elaborate and descriptive in between 100 to 200 words`
  );
  setResponseStatus(true);
};
