import styled from 'styled-components';

const StyledNav = styled.nav`
  margin: 0 0 30px 0;
  padding: 0;
  display: flex;
  justify-self: end;
  width: 100%;
  font-size: 1.2rem;
`;

const NavItem = styled.div`
  margin: 0 1em;

  color: var(--rsd-component-header-nav-text-color);
  a {
    color: var(--rsd-component-header-nav-text-color);
  }

  a:hover {
    color: var(--rsd-component-header-nav-text-hover-color);
  }
`;

const LoginNavItem = styled(NavItem)`
  margin: 0 1em 0 auto;
`;

/*
 * Navigation (within the Header).
 */
export default function HeaderNav() {
  /* eslint-disable @next/next/no-html-link-for-pages */
  /* These links are outside the app itself, but relative because of the
   * science platform routing.
   */
  return (
    <StyledNav>
      <NavItem>
        <a href="/portal/app">Portal</a>
      </NavItem>

      <NavItem>
        <a href="/nb/hub">Notebooks</a>
      </NavItem>

      <NavItem>
        <a href="/api-aspect">APIs</a>
      </NavItem>

      <NavItem>
        <a href="/docs">Documentation</a>
      </NavItem>

      <NavItem>
        <a href="/support">Support</a>
      </NavItem>

      <NavItem>
        <a href="https://community.lsst.org">Community</a>
      </NavItem>
    </StyledNav>
  );
  /* eslint-disable @next/next/no-html-link-for-pages */
}
