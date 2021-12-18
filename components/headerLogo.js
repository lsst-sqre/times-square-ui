import Image from 'next/image';
import getConfig from 'next/config';

import { useCurrentUrl } from '../hooks/currentUrl';

/*
 * Logo (within the Header).
 */
export default function HeaderLogo() {
  const logoHeightPx = 150;
  const logoWidthPx = logoHeightPx * 1.4882;

  const currentUrl = useCurrentUrl();
  const homepage = new URL('/', currentUrl);

  const { publicRuntimeConfig } = getConfig();
  const { basePath } = publicRuntimeConfig;

  return (
    <a href={homepage.href}>
      <Image
        src={`${basePath}/rubin-imagotype-color-on-black.svg`}
        alt="Rubin Observatory Logo"
        height={logoHeightPx}
        width={logoWidthPx}
      />
    </a>
  );
}
