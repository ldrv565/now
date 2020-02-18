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
          <title>Offline Next.js with Now 2.0</title>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#72B340" />
          <meta
            name="description"
            content="make your Next.js application work offline using service workers via Google's workbox"
          />

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
