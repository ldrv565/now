import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
      font-family: 'Roboto';
      font-size: 1.6rem;
      margin: 0;
      overflow-x: hidden;

      background: white;
      background-size: cover;
      background-position: top;

    }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>ldrv</title>

          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} pageContext={this.pageContext} />
      </>
    );
  }
}

export default MyApp;
