import { withRouter, useRouter } from '../../hooks/useRouter';

function NotebookViewPage({ qs }) {
  const router = useRouter();
  const { nbSlug } = router.query;
  const parameters = Object.entries(qs)
    .filter((item) => item[0] != 'nbSlug')
    .map((item) => <li key={item[0]}>{`${item[0]}: ${item[1]}`}</li>);

  return (
    <div>
      <h1>{nbSlug}</h1>
      <p>Notebook parameters</p>
      <ul>{parameters}</ul>
    </div>
  );
}

NotebookViewPage.getInitialProps = async ({ query }) => {
  return { qs: query };
};

export default withRouter(NotebookViewPage);
