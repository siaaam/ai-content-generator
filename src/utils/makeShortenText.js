export const makeShorter = (AIArticle, setResponseStatus, mutate) => {
  mutate(`${AIArticle}. \n\nmake This more short , brief and precised text `);
  setResponseStatus(true);
};
