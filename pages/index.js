import { useFetch } from '../hooks/fetch';
import getConfig from 'next/config';
import Link from 'next/link';

function HomePage({ publicRuntimeConfig }) {
  const { timesSquareApiUrl } = publicRuntimeConfig;
  const pagesDataUrl = `${timesSquareApiUrl}/v1/pages`;

  const { status, error, data: pageResources } = useFetch(pagesDataUrl);

  if (status == 'fetched') {
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

HomePage.getInitialProps = async ({}) => {
  // use getInitialProps to ensure the page isn't statically rendered
  const { publicRuntimeConfig } = getConfig();
  return { publicRuntimeConfig };
};

export default HomePage;
