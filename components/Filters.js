import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Modal from '../components/Modal';

export default function Filters(props) {
  return (
    <div>
      <Row className="ml-1">
        <h5 className="mt-3 font-weight-bold">FILTER CRASHES</h5>
        {/* <Modal /> */}
      </Row>
      <Card className="border-0">
        <ButtonGroup className="m-1" color="primary">
          <Button
            outline
            color="primary"
            onClick={() => props.modeChange('mv')}
            active={props.modeSelection === 'mv'}
            className="w-25"
          >
            <FontAwesome name="car" />
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => props.modeChange('ped')}
            active={props.modeSelection === 'ped'}
            className="w-25"
          >
            <FontAwesome name="street-view" />
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => props.modeChange('bike')}
            active={props.modeSelection === 'bike'}
            className="w-25"
          >
            <FontAwesome name="bicycle" />
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => props.modeChange('all')}
            active={props.modeSelection === 'all'}
            className="w-25"
          >
            All
          </Button>
        </ButtonGroup>
        <Form className="m-1">
          <FormGroup>
            <Label for="from">From Date:</Label>
            <Input
              id="from"
              type="date"
              onChange={props.fromChange}
              name="from"
              value={props.fromDate}
              className="mb-2"
            />
            <Label for="to">To Date:</Label>
            <Input
              id="to"
              type="date"
              onChange={props.toChange}
              name="to"
              value={props.toDate}
            />
          </FormGroup>
        </Form>
      </Card>
      <Card className="mt-1 border-0">
        {/* <CardTitle className="m-2 text-uppercase font-weight-bold">
          LEGEND
        </CardTitle> */}
        <Row>
          <img
            src="./static/marker-11-red.svg"
            width="20px"
            height="20px"
            className="ml-4"
          />
          <p>Pedestrian crash</p>
        </Row>
        <Row>
          <img
            src="./static/marker-11-yellow.svg"
            width="20px"
            height="20px"
            className="ml-4"
          />
          <p>Bicyclist crash</p>
        </Row>
        <Row>
          <img
            src="./static/marker-11-blue.svg"
            width="20px"
            height="20px"
            className="ml-4"
          />
          <p>Motor vehicle crash</p>
        </Row>
      </Card>
      <Row className="mt-1 ml-1 align-middle">
        <img
          src="./static/emsSeal.png"
          width="50px"
          height="50px"
          className="p-1"
        />
        <img
          src="./static/bpdSeal.jpg"
          width="50px"
          height="55px"
          className="p-1"
        />
        <img
          src="./static/gisSeal.jpg"
          width="50px"
          height="50px"
          className="p-1"
        />
      </Row>
    </div>
  );
}

Filters.propTypes = {
  fromDate: PropTypes.string,
  fromChange: PropTypes.func,
  toDate: PropTypes.string,
  toChange: PropTypes.func,
  modeSelection: PropTypes.string,
  modeChange: PropTypes.func,
};
