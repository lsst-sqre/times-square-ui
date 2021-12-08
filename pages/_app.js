import { ThemeProvider } from 'next-themes';

// Source Sans Pro Font from Font Source
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/400-italic.css';
import '@fontsource/source-sans-pro/700.css';

// Global CSS
import 'normalize.css';
import '@lsst-sqre/rubin-style-dictionary/dist/tokens.css';
import '@lsst-sqre/rubin-style-dictionary/dist/tokens.dark.css';
import '../styles/globals.css';

import Page from '../components/page';

export default function App({ Component, pageProps }) {
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <ThemeProvider defaultTheme="system">
      <Page>
        <Component {...pageProps} />
      </Page>
    </ThemeProvider>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}
