type DateToString<TModel> = {
  [Key in keyof TModel]: TModel[Key] extends Date ? string : TModel[Key];
};

export const dateToString = <T extends Record<string, any>>(
  object: T,
  fields: string[] = ['updatedAt', 'createdAt'],
): DateToString<T> => {
  Object.keys(object).forEach((key: keyof T) => {
    if (fields.includes(key as string)) {
      object[key] = object[key].toString();
    }
  });

  return object;
};
