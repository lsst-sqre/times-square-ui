import styled from 'styled-components';
import { withRouter, useRouter } from '../../hooks/useRouter';

const NotebookViewLayout = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
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
  }
`;

function NotebookViewPage({ qs }) {
  const router = useRouter();
  const { nbSlug } = router.query;
  const parameters = Object.entries(qs)
    .filter((item) => item[0] != 'nbSlug')
    .map((item) => <li key={item[0]}>{`${item[0]}: ${item[1]}`}</li>);

  return (
    <NotebookViewLayout>
      <NotebookSettingsContainer>
        <h1>{nbSlug}</h1>
        <p>Notebook parameters</p>
        <ul>{parameters}</ul>
      </NotebookSettingsContainer>
      <NotebookPageContainer>
        <iframe src={`/times-square/api/v1/pages/${nbSlug}/html`}></iframe>
      </NotebookPageContainer>
    </NotebookViewLayout>
  );
}

NotebookViewPage.getInitialProps = async ({ query }) => {
  return { qs: query };
};

export default withRouter(NotebookViewPage);
