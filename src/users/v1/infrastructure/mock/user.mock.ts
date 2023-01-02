export const MOCK_USERS = [
  {
    uuid: '06a84abb-4249-4fcc-bde5-1423f8394161',
    name: 'Max',
    email: 'test@gmail.com',
    phone: 123456789,
    company: 'test company',
    password: '$2b$10$HpiIQA/a4WIJ.v039YW7fuWMSL3TuqVmLJ3tf2tbv0YGoFfybo17O',
    country_code: 'CO',
    role: 'admin',
    permissions: [
      {
        resource: 'users',
        actions: ['read', 'update', 'delete']
      },
      {
        resource: 'auth',
        actions: ['read', 'update']
      }
    ]
  },
  {
    uuid: '459bed5e-c78b-49de-902d-9e0e46c91160',
    name: 'Max2',
    email: 'test2@gmail.com',
    phone: 123456782,
    company: 'test2 company',
    password: '$2b$10$HpiIQA/a4WIJ.v039YW7fuWMSL3TuqVmLJ3tf2tbv0YGoFfybo17O',
    country_code: 'MX',
    role: 'user',
    permissions: [
      {
        resource: 'users',
        actions: ['read', 'update', 'delete']
      }
    ]
  }
];
export const MOCK_USER = {
  uuid: '06a84abb-4249-4fcc-bde5-1423f8394161',
  name: 'Max',
  email: 'test@gmail.com',
  phone: 123456789,
  company: 'test company',
  password: '$2b$10$HpiIQA/a4WIJ.v039YW7fuWMSL3TuqVmLJ3tf2tbv0YGoFfybo17O',
  country_code: 'CO',
  role: 'admin',
  permissions: [
    {
      resource: 'users',
      actions: ['read', 'update', 'delete']
    }
  ]
};

export const MOCK_NEW_USER = {
  uuid: '06a84abb-4249-4fcc-bde5-1423f8394161',
  name: 'Max',
  email: 'test@gmail.com',
  phone: 123456789,
  company: 'test company',
  password: 'String123!',
  country_code: 'CO',
  role: 'admin',
  permissions: [
    {
      resource: 'users',
      actions: ['read', 'update', 'delete']
    }
  ]
};
export const MOCK_UPDATED_USER = {
  name: 'MAX new',
  email: 'new@gmail.com',
  phone: 1011121314,
  company: 'new company',
  password: 'NewPassword123!',
  country_code: 'CO',
  role: 'admin',
  permissions: [
    {
      resource: 'users',
      actions: ['read', 'update', 'delete']
    }
  ]
};

export const MOCK_INVALID_USER = {
  name: 'NA',
  email: 'test.gmail.com',
  phone: 1,
  company: 'test company',
  password: 'INVALID_PASSWORD',
  country_code: 'INVALID',
  role: 'invalid',
  permissions: [
    {
      resource: 'invalid',
      actions: ['invalid']
    }
  ]
};
