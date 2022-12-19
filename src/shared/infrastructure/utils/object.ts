namespace ObjectUtils {
  export function deleteUndefined(obj: any) {
    try {
      for (const key in obj) {
        if (obj[key] === undefined || isEmpty(obj)) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          deleteUndefined(obj[key]);
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
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
}
export default ObjectUtils;
