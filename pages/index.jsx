import React from 'react';
import Layout from '../components/Layout';
import {
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from 'reactstrap';
import MapContainer from '../components/MapContainer';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Layout title="Vision Zero Boston" />
        <div>
          <Col>
            <MapContainer />
          </Col>
        </div>
      </div>
    );
  }
}
