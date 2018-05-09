import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Map from '../components/Map';
import Modal from '../components/Modal';
import FontAwesome from 'react-fontawesome';

// set default months - we start with 2 months ago because data is always two months behind
const getDefaultDates = () => {
  const date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  const twoMonth = mm - 2;
  const threeMonths = mm - 3;
  const from = yyyy + '-' + '0' + threeMonths + '-' + dd;
  const to = yyyy + '-' + '0' + twoMonth + '-' + dd;
  return {
    fromDate: from,
    toDate: to,
  };
};

export default class MapWithFilters extends React.Component {
  constructor(props) {
    super(props);

    // get default dates to set
    const { fromDate, toDate } = getDefaultDates();
    this.state = {
      modeSelection: 'all',
      fromDate,
      toDate,
    };
  }

  filterModes = modeSelection => {
    this.setState({ modeSelection });
  };

  filterFromDate = e => {
    this.setState({ fromDate: e.target.value });
  };

  filterToDate = e => {
    this.setState({ toDate: e.target.value });
  };

  render() {
    return (
      <div>
        <Row>
          <Col lg="3" className="pr-0">
            <Container>
              <Row className="ml-2">
                <h3 className="mt-3 font-weight-bold">Traffic Crashes</h3>
                <Modal />
              </Row>
              <Card>
                <CardTitle className="m-2">Filters</CardTitle>
                <ButtonGroup className="m-2" color="info">
                  <Button
                    outline
                    onClick={() => this.filterModes('mv')}
                    active={this.state.modeSelection === 'mv'}
                    className="w-25"
                  >
                    <FontAwesome name="car" />
                  </Button>
                  <Button
                    outline
                    onClick={() => this.filterModes('ped')}
                    active={this.state.modeSelection === 'ped'}
                    className="w-25"
                  >
                    <FontAwesome name="street-view" />
                  </Button>
                  <Button
                    outline
                    onClick={() => this.filterModes('bike')}
                    active={this.state.modeSelection === 'bike'}
                    className="w-25"
                  >
                    <FontAwesome name="bicycle" />
                  </Button>
                  <Button
                    outline
                    onClick={() => this.filterModes('all')}
                    active={this.state.modeSelection === 'all'}
                    className="w-25"
                  >
                    All
                  </Button>
                </ButtonGroup>
                <Form className="m-2">
                  <FormGroup>
                    <Label for="from">From Date:</Label>
                    <Input
                      id="from"
                      type="date"
                      onChange={this.filterFromDate}
                      name="from"
                      value={this.state.fromDate}
                      className="mb-1"
                    />
                    <Label for="to">To Date:</Label>
                    <Input
                      id="from"
                      type="date"
                      onChange={this.filterToDate}
                      name="to"
                      value={this.state.toDate}
                    />
                  </FormGroup>
                </Form>
              </Card>

              <Card className="mt-2">
                <CardTitle className="m-2">Legend</CardTitle>
                <Row>
                  <img
                    src="../static/marker-11-red.svg"
                    width="20px"
                    height="20px"
                    className="ml-4"
                  />
                  <p>Pedestrian</p>
                </Row>
                <Row>
                  <img
                    src="../static/marker-11-yellow.svg"
                    width="20px"
                    height="20px"
                    className="ml-4"
                  />
                  <p>Bicyclist</p>
                </Row>
                <Row>
                  <img
                    src="../static/marker-11-blue.svg"
                    width="20px"
                    height="20px"
                    className="ml-4"
                  />
                  <p>Motor Vehicle</p>
                </Row>
              </Card>
              <Row className="mt-2 ml-1 align-middle">
                <img
                  src="../static/emsSeal.png"
                  width="50px"
                  height="50px"
                  className="p-1"
                />
                <img
                  src="../static/bpdSeal.jpg"
                  width="50px"
                  height="55px"
                  className="p-1"
                />
                <img
                  src="../static/gisSeal.jpg"
                  width="50px"
                  height="50px"
                  className="p-1"
                />
              </Row>
            </Container>
          </Col>
          <Col lg="9" className="p-0">
            <Container className="mt-2">
              <Map
                modeSelection={this.state.modeSelection}
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
              />
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}
