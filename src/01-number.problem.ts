// CODE

import { expect, it } from 'vitest';
import { z, ZodError } from 'zod';
//       ^ 🕵️‍♂️

// {Type}Parser is a better name
const schema = z.number();
export const toString = (num: unknown) => {
  // parsed is a better name
  const myNum = schema.parse(num);
  return String(myNum);
};

// TESTS

it('Should throw a runtime error when called with not a number', () => {
  expect(() => toString('123')).toThrowError(
    'Expected number, received string',
  );
  expect(() => toString('123')).toThrowError(ZodError);
});

it('Should return a string when called with a number', () => {
  expect(toString(1)).toBeTypeOf('string');
});
