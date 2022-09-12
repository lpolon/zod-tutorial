import { expect, it } from 'vitest';
import { number, Schema, z } from 'zod';
import { Equal, Expect } from './helpers/type-utils';

const MetricsSchema = z.object({
  totalSessions: z.number(),
  totalUsers: z.number(),
  totalNewUsers: z.number(),
});

type Metrics = z.infer<typeof MetricsSchema>;

type PickKeys = Record<keyof Metrics, true>;

const checkSchemaKeys = ({
  schema,
  testObj,
  pickKeys,
}: {
  schema: typeof MetricsSchema;
  pickKeys: Partial<PickKeys>;
  testObj: unknown;
}) => {
  return schema.pick(pickKeys).safeParse(testObj);
};
const genericCheckSchemaKeys = <
  ZS extends z.ZodType<object, Record<string, unknown>>,
  // ?
>({
  schema,
  testObj,
  pickKeys,
}: {
  schema: ZS;
  pickKeys: Partial<Record<keyof ZS, true>>;
  testObj: unknown;
}) => {
  return schema.pick(pickKeys).safeParse(testObj);
  //     ^?
};

it('Should not fail with a proper schema', async () => {
  const completeSchema: z.infer<typeof MetricsSchema> = {
    totalSessions: 10,
    totalUsers: 20,
    totalNewUsers: 30,
  };

  expect(() => MetricsSchema.parse(completeSchema)).not.toThrowError();
});
it('Should fail with against a partial schema', async () => {
  const completeSchema = {
    totalSessions: 10,
    // totalUsers: 20,
    totalNewUsers: 30,
  };

  expect(() => MetricsSchema.parse(completeSchema)).toThrowError();
});
it('Should be able to check one key of the schema', async () => {
  const incompleteSchema = {
    totalSessions: 10,
    // totalUsers: 20,
    totalNewUsers: 30,
  };

  expect(
    checkSchemaKeys({
      schema: MetricsSchema,
      testObj: incompleteSchema,
      pickKeys: { totalNewUsers: true },
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": {
        "totalNewUsers": 30,
      },
      "success": true,
    }
  `);
});
