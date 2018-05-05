import React from 'react';
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
import Filters from '../components/Filters';
import Map from '../components/Map';

const navLinkStyle = {
  padding: '10px',
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Vision Zero Boston</NavbarBrand>
          <Nav className="mr-auto" navbar tabs>
            <NavItem>
              <NavLink href="#" active style={navLinkStyle}>
                Crashes
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <TabContent activeTab={this.state.activeTab}>
          <Row>
            <Col>
              <Filters />
            </Col>
            <Col>
              <Map />
            </Col>
          </Row>
        </TabContent>
      </div>
    );
  }
}
