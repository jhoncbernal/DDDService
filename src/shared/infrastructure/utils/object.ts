namespace ObjectUtils {
  export function deleteUndefined(obj: any) {
    if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj[key] === undefined || isEmpty(obj)) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          deleteUndefined(obj[key]);
        }
      }
    }
  }

  export function isEmpty(obj: any) {
    return typeof obj === 'object' && Object.keys(obj).length === 0;
  }

  export function deleteEmptyObjects(obj: any) {
    if (!isEmpty(obj))
      Object.keys(obj).forEach(function (key) {
        if (isEmpty(obj[key])) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          deleteEmptyObjects(obj[key]);
        }
      });
  }

  export function sanitizeObject(obj: any) {
    for (const key in obj) {
      if (
        obj[key] === undefined ||
        isEmpty(obj) ||
        (Array.isArray(obj[key]) && obj[key].length === 0) ||
        obj[key] === '' ||
        obj[key] === 0
      ) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitizeObject(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    }
  }

  export function deleteEmptyArrays(obj: any) {
    if (typeof obj === 'object')
      Object.keys(obj).forEach(function (key) {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          deleteEmptyArrays(obj[key]);
        }
      });
  }

  export function deleteEmptyStrings(obj: any) {
    if (!isEmpty(obj))
      Object.keys(obj).forEach(function (key) {
        if (obj[key] === '') {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          deleteEmptyStrings(obj[key]);
        }
      });
  }

  export function deleteEmptyNumbers(obj: any) {
    if (!isEmpty(obj))
      Object.keys(obj).forEach(function (key) {
        if (obj[key] === 0) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          deleteEmptyNumbers(obj[key]);
        }
      });
  }

  export function deleteEmptyValues(
    obj: any,
    types: string[] = ['object', 'array', 'string', 'number', 'undefined']
  ) {
    if (types.includes('undefined')) deleteUndefined(obj);
    if (types.includes('object')) deleteEmptyObjects(obj);
    if (types.includes('array')) deleteEmptyArrays(obj);
    if (types.includes('string')) deleteEmptyStrings(obj);
    if (types.includes('number')) deleteEmptyNumbers(obj);
  }
}
export default ObjectUtils;
