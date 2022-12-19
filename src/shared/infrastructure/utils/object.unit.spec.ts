import ObjectUtils from '@/shared/infrastructure/utils/object';

describe('Validate Unit Test on ObjectUtils', () => {
  let objectUtils = ObjectUtils;

  it('should be defined', () => {
    expect(objectUtils).toBeDefined();
  });

  it('should be an object', () => {
    expect(typeof objectUtils).toBe('object');
  });

  it('should have a deleteUndefined method', () => {
    expect(objectUtils.deleteUndefined).toBeDefined();
  });
  it('should have a isEmpty method', () => {
    expect(objectUtils.isEmpty).toBeDefined();
  });
  it('should have a deleteEmptyObjects method', () => {
    expect(objectUtils.deleteEmptyObjects).toBeDefined();
  });
  it('should have a sanitizeObject method', () => {
    expect(objectUtils.sanitizeObject).toBeDefined();
  });
  it('should not do anything if is not an object', () => {
    const obj = 'test';
    objectUtils.deleteUndefined(obj);
    objectUtils.deleteEmptyArrays(obj);
    objectUtils.deleteEmptyObjects(obj);
    objectUtils.deleteEmptyStrings(obj);
    objectUtils.sanitizeObject(obj);
    objectUtils.deleteEmptyNumbers(obj);
    objectUtils.deleteEmptyValues(obj);
    expect(obj).toEqual('test');
  });
  describe('deleteUndefined method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.deleteUndefined).toBe('function');
    });
    it('should delete undefined values', () => {
      const obj = {
        name: 'John',
        age: undefined,
        city: 'New York',
        country: undefined,
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: undefined
        }
      };
      objectUtils.deleteUndefined(obj);
      expect(obj).toEqual({
        name: 'John',
        city: 'New York',
        address: { street: '123 Main St', zip: 10001 }
      });
    });

    it('should not do anything if object is empty', () => {
      const obj = {};
      objectUtils.deleteUndefined(obj);
      expect(obj).toEqual({});
    });
  });

  describe('isEmpty method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.isEmpty).toBe('function');
    });
    it('should return true if object is empty', () => {
      const obj = {};
      expect(objectUtils.isEmpty(obj)).toBe(true);
    });
    it('should return false if object is not empty', () => {
      const obj = { name: 'John' };
      expect(objectUtils.isEmpty(obj)).toBe(false);
    });
  });

  describe('deleteEmptyObjects method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.deleteEmptyObjects).toBe('function');
    });
    it('should delete empty objects', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: {},
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: {},
          email: 'test@gmail.com'
        }
      };
      objectUtils.deleteEmptyObjects(obj);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        address: { street: '123 Main St', zip: 10001, email: 'test@gmail.com' }
      });
    });
  });

  describe('sanitizeObject method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.sanitizeObject).toBe('function');
    });
    it('should sanitize object', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: {},
        address: {
          street: '',
          zip: 0,
          phone: undefined,
          email: ''
        }
      };
      objectUtils.sanitizeObject(obj);
      expect(obj).toEqual({ name: 'John', age: 30, city: 'New York' });
    });
  });

  describe('deleteEmptyArrays method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.deleteEmptyArrays).toBe('function');
    });
    it('should delete empty arrays', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: [],
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: [],
          email: 'test@gmail.com'
        }
      };
      objectUtils.deleteEmptyArrays(obj);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        address: { street: '123 Main St', zip: 10001, email: 'test@gmail.com' }
      });
    });
  });

  describe('deleteEmptyStrings method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.deleteEmptyStrings).toBe('function');
    });
    it('should delete empty strings', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: '',
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: '',
          email: 'test@gmail.com'
        }
      };
      objectUtils.deleteEmptyStrings(obj);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        address: { street: '123 Main St', zip: 10001, email: 'test@gmail.com' }
      });
    });

    it('should not delete strings with spaces', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: ' ',
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: ' ',
          email: ' '
        }
      };
      objectUtils.deleteEmptyStrings(obj);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        country: ' ',
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: ' ',
          email: ' '
        }
      });
    });
  });

  describe('deleteEmptyNumbers method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.deleteEmptyNumbers).toBe('function');
    });
    it('should delete empty numbers', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: 0,
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: 0,
          email: ''
        }
      };
      objectUtils.deleteEmptyNumbers(obj);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        address: { street: '123 Main St', zip: 10001, email: '' }
      });
    });
  });

  describe('deleteEmptyValues method', () => {
    it('should be a function', () => {
      expect(typeof objectUtils.deleteEmptyValues).toBe('function');
    });
    it('should delete empty values', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: 'New York',
        country: 0,
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: 0,
          email: ''
        }
      };
      objectUtils.deleteEmptyValues(obj);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        address: { street: '123 Main St', zip: 10001 }
      });
    });

    it('should delete empty values number and string', () => {
      const obj = {
        name: 'John',
        age: 30,
        city: '',
        country: 0,
        address: {
          street: '123 Main St',
          zip: 10001,
          phone: 0,
          email: undefined
        }
      };
      objectUtils.deleteEmptyValues(obj, ['number', 'string']);
      expect(obj).toEqual({
        name: 'John',
        age: 30,
        address: { street: '123 Main St', zip: 10001, email: undefined }
      });
    });

    it('should delete empty values undefined and object', () => {
      const obj = {
        name: '',
        age: 30,
        city: undefined,
        country: [],
        address: {
          street: {},
          zip: 10001,
          phone: 0,
          email: undefined
        }
      };
      objectUtils.deleteEmptyValues(obj, ['undefined', 'object', 'array']);
      expect(obj).toEqual({
        name: '',
        age: 30,
        city: undefined,
        address: { zip: 10001, phone: 0 }
      });
    });
  });
});
