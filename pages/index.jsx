import React from 'react';
import Layout from '../components/Layout';
import {
  Col,
  Row,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from 'reactstrap';
import MapWithFilters from '../components/MapWithFilters';

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout title="Vision Zero Boston">
        <div>
          <Navbar color="light" light expand="md" className="p-0 border-bottom">
            <NavbarBrand
              href="http://www.visionzeroboston.org/"
              target="_blank"
              className="p-2"
            >
              <img
                src="./static/VisionZeroLogo.png"
                style={{ width: '10em' }}
              />
            </NavbarBrand>
            <Nav className="mr-auto" navbar tabs>
              <NavItem className="mt-3">
                <NavLink href="#" active>
                  Crashes
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <TabContent activeTab>
            <Row>
              <Col>
                <MapWithFilters />
              </Col>
            </Row>
          </TabContent>
        </div>
      </Layout>
    );
  }
}
