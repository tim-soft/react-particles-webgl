import { createGlobalStyle } from 'styled-components';

const App = ({ Component, pageProps }) => {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
};

export default App;

const GlobalStyle = createGlobalStyle`
      body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        `;
