import { z } from 'zod';
import { Equal, Expect } from './helpers/type-utils';

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */

// more interested in exploring options

const User = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const IdObj = User.pick({ id: true });

// new tipe
const Post = IdObj.extend({
  title: z.string(),
  body: z.string(),
});

// better for two zod objects.
const Comment = IdObj.merge(
  z.object({
    text: z.string(),
  }),
);

type cases = [
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>,
];
