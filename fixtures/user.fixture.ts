import { faker } from '@faker-js/faker';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export const generateUser = (): User => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  password: faker.internet.password(),
});

export type CheckoutUser = User & {
  address1: string;
  city: string;
  postCode: string;
  country: string;
  region: string;
};

export const generateCheckoutUser = (): CheckoutUser => {
  const baseUser = generateUser();
  return {
    ...baseUser,
    address1: faker.location.streetAddress(),
    city: faker.location.city(),
    postCode: faker.location.zipCode(),
    country: 'United Kingdom',
    region: 'Lancashire',
  };
};
