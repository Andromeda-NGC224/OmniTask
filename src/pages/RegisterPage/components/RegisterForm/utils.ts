export function pickFilledFields<T extends object>(
  data: T,
  fields: readonly (keyof T)[],
): Partial<T> {
  return fields.reduce<Partial<T>>((acc, key) => {
    if (data[key]) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
}
