import styled from 'styled-components';
import { withRouter, useRouter } from '../../hooks/useRouter';

const NotebookViewLayout = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
`;

const NotebookSettingsContainer = styled.div`
  flex: 0 0 auto;
  width: 20rem;
`;

const NotebookPageContainer = styled.div`
  background-color: red;
  width: 100%;
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
        <p>The notebook</p>
      </NotebookPageContainer>
    </NotebookViewLayout>
  );
}

NotebookViewPage.getInitialProps = async ({ query }) => {
  return { qs: query };
};

export default withRouter(NotebookViewPage);
