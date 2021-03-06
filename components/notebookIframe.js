/*
 * The NotebookIframe controls the iframe with HTML content
 * from Times Square with a notebook render.
 */

import styled from 'styled-components';

import useHtmlStatus from '../hooks/htmlStatus';

const StyledIframe = styled.iframe`
  --shadow-color: 0deg 0% 74%;
  --shadow-elevation-medium: 0.1px 0.7px 0.9px hsl(var(--shadow-color) / 0.16),
    0.4px 2.4px 3px -0.6px hsl(var(--shadow-color) / 0.2),
    0.8px 5.3px 6.7px -1.1px hsl(var(--shadow-color) / 0.24),
    1.9px 11.9px 15px -1.7px hsl(var(--shadow-color) / 0.28);
  border: 0px solid black;
  box-shadow: var(--shadow-elevation-medium);
  width: 100%;
  height: 100%;
`;

export default function NotebookIframe({
  tsHtmlUrl,
  tsHtmlStatusUrl,
  parameters,
}) {
  const htmlUrl = new URL(tsHtmlUrl);
  parameters.forEach((item) => htmlUrl.searchParams.set(item[0], item[1]));

  const htmlStatus = useHtmlStatus(tsHtmlStatusUrl, parameters);

  if (htmlStatus.error) {
    return (
      <div>
        <p>Error contacting API at {`${tsHtmlStatusUrl}`}</p>
      </div>
    );
  }

  if (htmlStatus.loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <StyledIframe
      src={htmlStatus.htmlUrl || htmlUrl.toString()}
      key={htmlStatus.iframeKey}
    ></StyledIframe>
  );
}
