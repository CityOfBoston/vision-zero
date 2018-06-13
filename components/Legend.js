import React from 'react';
import { Card, Row } from 'reactstrap';

export default function Legend() {
  return (
    <div>
      <Card className="mt-1 border-0">
        <Row>
          <img
            src="./static/marker-11-red.svg"
            width="30px"
            height="30px"
            className="ml-3"
          />
          <p className="font-italic">Pedestrian crash</p>
        </Row>
        <Row>
          <img
            src="./static/marker-11-yellow.svg"
            width="30px"
            height="30px"
            className="ml-3"
          />
          <p className="font-italic">Bicyclist crash</p>
        </Row>
        <Row>
          <img
            src="./static/marker-11-blue.svg"
            width="30px"
            height="30px"
            className="ml-3"
          />
          <p className="font-italic">Motor vehicle crash</p>
        </Row>
      </Card>
      <Row className="mt-1 ml-1 align-middle">
        <img
          src="./static/emsSeal.png"
          width="60px"
          height="60px"
          className="p-1"
        />
        <img
          src="./static/bpdSeal.jpg"
          width="60px"
          height="65px"
          className="p-1"
        />
        <img
          src="./static/gisSeal.jpg"
          width="60px"
          height="60px"
          className="p-1"
        />
      </Row>
    </div>
  );
}
