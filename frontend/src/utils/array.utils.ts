export const isArrayWithElements = (arr: any[] | undefined) => {
  return !!arr && Array.isArray(arr) && arr.length > 0;
};
