import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default class Layout extends React.Component {
  render() {
    return (
      // create div for page content with height of the entire veiw port
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
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        {/* Make sure the heigh of the body element is the entire view port */}
        <style global jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,600');
          body {
            font-family: 'Roboto';
            min-height: 100vh;
            position: relative;
            margin: 0;
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
