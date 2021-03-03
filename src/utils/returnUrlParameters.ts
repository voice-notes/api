export const returnUrlParameters = (url: string) => {
    const splitUrl = url.split("/");
    const index = splitUrl.length;
    return [splitUrl[index - 3], splitUrl[index - 2], splitUrl[index - 1]];
  };
  