import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export default function Filters(props) {
  return (
    <div>
      <Row className="ml-1">
        <h5 className="mt-3 font-weight-bold text-uppercase">Filter crashes</h5>
      </Row>
      <Card className="border-0">
        {/* buttons for mode selection */}
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
        {/* buttons for dataset selection */}
        <ButtonGroup className="m-1" color="primary">
          <Button
            outline
            color="primary"
            onClick={() => props.datasetChange('crash')}
            active={props.dataset === 'crash'}
            className="w-50"
          >
            Crashes
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => props.datasetChange('fatality')}
            active={props.dataset === 'fatality'}
            className="w-50"
          >
            Fatalities
          </Button>
        </ButtonGroup>
        {/* form for date selection */}
        <Form className="m-1">
          <FormGroup>
            <Label htmlFor="from" className="font-weight-bold text-uppercase">
              From Date:
            </Label>
            <Input
              id="from"
              type="date"
              onChange={props.fromChange}
              name="from"
              value={props.fromDate}
              className="mb-2"
            />
            <Label htmlFor="to" className="font-weight-bold text-uppercase">
              To Date:
            </Label>
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
  dataset: PropTypes.string,
  datasetChange: PropTypes.func,
};
