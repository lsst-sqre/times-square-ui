import { useFetch } from '../hooks/fetch';
import getConfig from 'next/config';
import Link from 'next/link';

function HomePage() {
  const { publicRuntimeConfig } = getConfig();
  const { timesSquareApiUrl } = publicRuntimeConfig;
  const pagesDataUrl = `${timesSquareApiUrl}/v1/pages`;
  const { status, error, data } = useFetch(pagesDataUrl);

  if (status == 'fetched') {
    const { data: pageResources } = data;

    return (
      <>
        <h1>Times Square</h1>
        <p>
          View Jupyter Notebooks on the Rubin Science Platform, computed
          on-demand with configurable parameters.
        </p>
        <h2>Pages</h2>
        <ul>
          {pageResources.map((page) => (
            <li key={page.name}>
              <Link href={`/nb/${page.name}`}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default HomePage;
