import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  password: faker.internet.password(),
});
