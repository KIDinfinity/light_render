export const objectToSearchParams = (paramsObject) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(paramsObject)) {
    searchParams.append(key, value);
  }

  const queryString = searchParams.toString();

  return queryString;
};
