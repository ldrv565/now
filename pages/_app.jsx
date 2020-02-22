import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;

    @media (max-width: 700px) {
      font-size: 8px;
    }
  }

  body {
      font-family: 'Roboto';
      font-size: 1.6rem;
      margin: 0;
      overflow-x: hidden;

      color: white;

    }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Твоя жопа</title>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000" />
          <meta name="description" content="твоя жопа" />

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
