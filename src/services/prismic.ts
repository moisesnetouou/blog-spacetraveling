/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import Prismic from '@prismicio/client';
// import { DefaultClient } from '@prismicio/client/types/client';

// export function getPrismicClient(req?: unknown): DefaultClient {
//   const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
//     req,
//   });

//   return prismic;
// }

import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(process.env.PRISMIC_ENDPOINT, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
}
