import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title> {this.props.title} </title>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://patterns.boston.gov/css/public.css"
          />
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css"
            rel="stylesheet"
          />
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
          /> */}
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
          // set fonts for elements
          body,
          h2,
          h3,
          h4,
          h5,
          label {
            font-family: 'Montserrat';
          }
          p,
          input {
            font-family: 'Lora';
            font-size: 18px;
          }

          // update link styles
          a:hover {
            text-decoration: none;
            color: #fb4d42;
          }

          // pop-up styles
          .dl-t {
            width: 50%;
            clear: none;
          }
          .dl-d {
            width: 50%;
          }
          .dl-i {
            padding: 0.2rem !important;
          }

          // filter button styles
          .btn-outline-primary {
            color: #091f2f;
            border-color: #d2d2d2;
          }
          .btn {
            border-radius: 0;
          }
          .btn-outline-primary.active,
          .btn-outline-primary:active,
          .btn-outline-primary:hover {
            background-color: #288be4 !important;
            border-color: #d2d2d2 !important;
          }
          .form-control {
            border-radius: 0;
            border-color: #d2d2d2;
          }
        `}</style>
        {/* set container div with room for navbar  */}
        <div style={{ minHeight: 'calc(100vh - 125px)' }}>
          <Navbar>
            <NavbarBrand href="http://www.visionzeroboston.org/">
              <img
                src="/vision-zero/static/VisionZeroLogo.png"
                style={{ width: '10em' }}
              />
            </NavbarBrand>
            <div className="lo">
              <div className="lo-l">
                <a href="https://www.boston.gov/">
                  <img
                    src="https://patterns.boston.gov/images/public/logo.svg"
                    alt="Boston.gov"
                    className="lo-i"
                  />
                </a>
                <span className="lo-t">Mayor Martin J. Walsh</span>
              </div>
            </div>
          </Navbar>
          {/* add secondary navbar */}
          <nav className="nv-s">
            <input
              type="checkbox"
              id="nv-s-tr"
              className="nv-s-tr"
              aria-hidden="true"
              value="on"
            />
            <ul className="nv-s-l">
              <li className="nv-s-l-i">
                <label htmlFor="nv-s-tr" className="nv-s-l-b">
                  Navigation
                </label>
              </li>
              <li className="nv-s-l-i">
                <a
                  className={`nv-s-l-a ${
                    this.props.indexPage ? 'nv-s-l-a--active' : ''
                  }`}
                  href="/vision-zero/"
                >
                  View the map
                </a>
              </li>
              <li className="nv-s-l-i">
                <a
                  className="nv-s-l-a"
                  href="https://data.boston.gov/dataset/vision-zero-crash-records"
                >
                  Get the crash data
                </a>
              </li>
              <li className="nv-s-l-i">
                {/* waiting on link to fatality open dataset */}
                <a
                  className="nv-s-l-a"
                  href="https://data.boston.gov/dataset/vision-zero-fatality-records"
                >
                  Get the fatality data
                </a>
              </li>
              <li className="nv-s-l-i">
                <a
                  className={`nv-s-l-a ${
                    this.props.aboutPage ? 'nv-s-l-a--active' : ''
                  }`}
                  href="/vision-zero/about"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
          {this.props.children}
        </div>
        {/* add footer */}
        <footer
          className="ft"
          style={{
            position: 'relative',
            zIndex: '2',
          }}
        >
          <div className="ft-c">
            <ul className="ft-ll ft-ll--r">
              <li className="ft-ll-i">
                <a
                  href="http://www.cityofboston.gov/311/"
                  className="ft-ll-a lnk--yellow"
                >
                  <span className="ft-ll-311">BOS:311</span>
                  <span className="tablet--hidden"> - </span>Report an issue
                </a>
              </li>
            </ul>
            <ul className="ft-ll">
              <li className="ft-ll-i">
                <a
                  href="https://www.boston.gov/departments/mayors-office/martin-j-walsh"
                  className="ft-ll-a"
                >
                  Mayor Martin J Walsh
                </a>
              </li>
              <li className="ft-ll-i">
                <a
                  href="https://www.boston.gov/departments/innovation-and-technology/privacy-and-security-statement"
                  className="ft-ll-a"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="ft-ll-i">
                <a href="https://www.data.boston.gov" className="ft-ll-a">
                  Analyze Boston
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/6.0.1/reactstrap.full.min.js" />
      </div>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  indexPage: PropTypes.bool,
  aboutPage: PropTypes.bool,
};
