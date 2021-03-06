/* Hook to get the current URL */

import getConfig from 'next/config';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();

export const useCurrentUrl = () => {
  const { baseUrl } = publicRuntimeConfig;
  const router = useRouter();
  return new URL(router.pathname, baseUrl);
};
