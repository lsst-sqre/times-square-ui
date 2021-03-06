import styled from 'styled-components';
import Error from 'next/error';
import getConfig from 'next/config';

import { withRouter, useRouter } from '../../hooks/useRouter';
import { useFetch } from '../../hooks/fetch';
import NotebookIframe from '../../components/notebookIframe';

const NotebookViewLayout = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  // FIXME need a more reliable of making the viewer use all whitespace
  height: calc(100vh - 200px);
`;

const NotebookSettingsContainer = styled.div`
  flex: 0 0 auto;
  width: 18rem;
`;

const NotebookPageContainer = styled.div`
  // border: 1px solid red;
  width: 100%;

  iframe {
    --shadow-color: 0deg 0% 74%;
    --shadow-elevation-medium: 0.1px 0.7px 0.9px hsl(var(--shadow-color) / 0.16),
      0.4px 2.4px 3px -0.6px hsl(var(--shadow-color) / 0.2),
      0.8px 5.3px 6.7px -1.1px hsl(var(--shadow-color) / 0.24),
      1.9px 11.9px 15px -1.7px hsl(var(--shadow-color) / 0.28);
    border: 0px solid black;
    box-shadow: var(--shadow-elevation-medium);
    width: 100%;
    height: 100%;
  }
`;

function TSNotebookViewer({ nbSlug, userParameters }) {
  // Get data about the page itself
  const { publicRuntimeConfig } = getConfig();
  const { timesSquareApiUrl } = publicRuntimeConfig;
  const pageDataUrl = `${timesSquareApiUrl}/v1/pages/${nbSlug}`;
  const { status, error, data } = useFetch(pageDataUrl);

  if (status === 'fetched') {
    const {
      parameters,
      html_url: htmlApiUrl,
      html_status_url: htmlStatusApiUrl,
    } = data;

    // Merge user-set parameters with defaults
    const updatedParameters = Object.entries(parameters).map((item) => {
      if (item[0] in userParameters) {
        return [item[0], userParameters[item[0]]];
      } else {
        return [item[0], item[1].default];
      }
    });

    // List items for the parameters
    const parameterListItems = updatedParameters.map((item) => (
      <li key={item[0]}>{`${item[0]}: ${item[1]}`}</li>
    ));

    return (
      <NotebookViewLayout>
        <NotebookSettingsContainer>
          <h1>{nbSlug}</h1>
          <p>Notebook parameters</p>
          <ul>{parameterListItems}</ul>
          <p>Status: {status}</p>
        </NotebookSettingsContainer>
        <NotebookPageContainer>
          <NotebookIframe
            tsHtmlUrl={htmlApiUrl}
            tsHtmlStatusUrl={htmlStatusApiUrl}
            parameters={updatedParameters}
          />
        </NotebookPageContainer>
      </NotebookViewLayout>
    );
  } else if (status === 'fetching') {
    return <p>Loading...</p>;
  } else {
    return <Error statusCode={404} />;
  }
}

function NotebookViewPage({ qs }) {
  const router = useRouter();
  const { nbSlug } = router.query;
  const userParameters = Object.fromEntries(
    Object.entries(qs)
      .filter((item) => item[0] != 'nbSlug')
      .map((item) => item)
  );

  return <TSNotebookViewer nbSlug={nbSlug} userParameters={userParameters} />;
}

NotebookViewPage.getInitialProps = async ({ query }) => {
  return { qs: query };
};

export default withRouter(NotebookViewPage);
