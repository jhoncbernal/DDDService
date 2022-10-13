import 'reflect-metadata';

beforeEach(async () => {
  global.gc && global.gc();

  jest.resetModules();
});
