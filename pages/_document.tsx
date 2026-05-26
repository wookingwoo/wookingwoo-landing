import { Html, Head, Main, NextScript } from 'next/document';
import { THEME_STORAGE_KEY } from '../lib/theme';

const themeScript = `
(function () {
  try {
    var storedTheme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : prefersDark
        ? 'dark'
        : 'light';
    var root = document.documentElement;

    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (_) {}
})();
`;

export default function Document() {
    return (
        <Html lang="en" suppressHydrationWarning>
            <Head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
