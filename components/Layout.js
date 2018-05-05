import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title> {this.props.title} </title>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <style global jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
          body {
            font-family: 'Source Sans Pro';
          }
        `}</style>
        {this.props.children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/6.0.1/reactstrap.full.min.js" />
      </div>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
