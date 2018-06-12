import React from 'react';
import Layout from '../components/Layout';
import { Col } from 'reactstrap';
import MapContainer from '../components/MapContainer';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Layout title="Vision Zero Boston">
          <Col className="m-1">
            <p>
              The information in this map is for the time period July 1, 2014
              through three months from the present. New data is uploaded each
              month but always three months behind to allow for data
              verification.
            </p>
            <p>
              For the purposes of this map, “crash” is defined as a traffic
              incident in the City of Boston that resulted in a response by
              Boston Emergency Medical Services. These include incidents on
              streets owned by the City, as well as incidents on state-owned
              roadways. Note the following:
            </p>
            <ul>
              <li>
                Only one dot per incident is shown, regardless of the number of
                patients.
              </li>
              <li>
                If there was more than one patient per incident, the mode is
                assigned to the most vulnerable user (i.e. pedestrians more
                vulnerable than bicyclists more vulnerable than motorists).
              </li>
            </ul>
            <p>
              “Fatalities” includes traffic fatalities that occurred on
              city-owned streets as reported by Boston Police Department. We are
              in the process of including fatalities on state-owned roadways
              with the exception of interstate highways.
            </p>
            <p className="font-weight-bold">
              Please note that the data and information on this website is for
              informational purposes only. While we seek to provide accurate
              information, please note that errors may be present and
              information presented may not be complete. Accordingly, the City
              of Boston makes no representation as to the accuracy of the
              information or its suitability for any purpose and disclaim any
              liability for omissions or errors that may be contained therein.
            </p>
          </Col>
        </Layout>
      </div>
    );
  }
}
