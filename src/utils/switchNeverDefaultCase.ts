export const switchNeverDefaultCase = (x: never): never => {
  throw new Error(`Unhandled case: ${x}`);
};
