export const isObject = value =>
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value);

export const normalizeBoolean = (value) => {
    if (value === true || value === "true") return true;
    return false;
};

export const normalizeString = (value) => {
  if (typeof value === 'string') return value.trim();
  return value;
}

export const transformObjToArray = (array, item) => [...array, item];

export const isStringBlank = value =>
  typeof value === 'string' && value.trim().length === 0;