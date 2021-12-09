import styled from 'styled-components';

import { ContentMaxWidth } from '../styles/sizes';

const StyledMain = styled.main`
  margin: 1rem auto;
  max-width: ${ContentMaxWidth};
  padding: 0 var(--size-screen-padding-min);

  @media (min-width: ${ContentMaxWidth}) {
    padding: 0;
  }
`;

/*
 * Main content wrapper (contained within a Page component).
 */
export default function MainContent({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
