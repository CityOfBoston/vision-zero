import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from 'reactstrap';

export default class Layout extends React.Component {
  render() {
    return (
      // create div for page content with height of the entire veiw port
      <div>
        <Head>
          <title> {this.props.title} </title>
          <link
            rel="stylesheet"
            href="https://www.boston.gov/crispus/css/public.css"
          />
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
          @import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700|Montserrat:400,700');
          body {
            font-family: 'Montserrat';
            min-height: 100vh;
            position: relative;
            margin: 0;
          }
          p,
          input,
          li {
            font-family: 'Lora';
            //font-style: italic;
          }
          a:hover {
            text-decoration: none;
            color: #fb4d42;
          }
          .btn-outline-primary {
            color: #091f2f;
            border-color: #091f2f;
          }
          .btn {
            border-radius: 0;
          }
          .btn-outline-primary.active,
          .btn-outline-primary:active,
          .btn-outline-primary:hover,
          .show > .btn-outline-primary.dropdown-toggle {
            background-color: #288be4 !important;
            border-color: #091f2f !important;
          }
          label {
            text-transform: uppercase;
            font-weight: 700;
          }
          .form-control {
            border-radius: 0;
            border-color: #091f2f;
          }
        `}</style>

        {this.props.children}

        <script src="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/6.0.1/reactstrap.full.min.js" />
        <Navbar>
          <NavbarBrand
            href="http://www.visionzeroboston.org/"
            target="_blank"
            className=""
          >
            <div className="lo">
              <div className="lo-l">
                <a href="https://www.boston.gov/">
                  <img
                    src="https://patterns.boston.gov/images/public/logo.svg"
                    alt="Boston.gov"
                    className="lo-i"
                  />
                </a>
                <span className="lo-t">Vision Zero Crash Map</span>
              </div>
            </div>
          </NavbarBrand>
          <div className="ml-auto">
            <a href="https://www.boston.gov" className="p-0">
              <img
                src="./static/VisionZeroLogo.png"
                style={{ width: '10em' }}
              />
            </a>
          </div>
        </Navbar>
        <nav className="nv-s">
          <input
            type="checkbox"
            id="nv-s-tr"
            className="nv-s-tr"
            aria-hidden="true"
          />
          <ul className="nv-s-l">
            <li className="nv-s-l-i">
              <label htmlFor="nv-s-tr" className="nv-s-l-b" type="button">
                Navigation
              </label>
            </li>

            <li className="nv-s-l-i">
              <a
                href="/index"
                title="View the map"
                className="nv-s-l-a nv-s-l-a--active"
              >
                The map
              </a>
            </li>
            <li className="nv-s-l-i">
              <a
                href="https://data.boston.gov/dataset/vision-zero-crash-records"
                title="Download the raw data"
                className="nv-s-l-a"
              >
                Download the data
              </a>
            </li>
            <li className="nv-s-l-i">
              <a href="/about" title="About this map" className="nv-s-l-a">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
