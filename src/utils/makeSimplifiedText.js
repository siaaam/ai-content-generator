export const makeSimplified = (AIArticle, setResponseStatus, mutate) => {
  mutate(
    `${AIArticle}. \n\nmake this more simplified as I am a 10 year old kid `
  );
  setResponseStatus(true);
};
