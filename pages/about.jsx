import React from 'react';
import Layout from '../components/Layout';
import { Col } from 'reactstrap';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <Layout title="Vision Zero Boston" aboutPage>
          <Col className="pl-5 pr-5">
            <div className="sh mt-4 mb-4">
              <h2 className="sh-title">Vision Zero Crash Records Map</h2>
            </div>
            <p>
              <a href="http://visionzeroboston.org">Vision Zero Boston</a> is
              our commitment to focus the city’s resources on proven strategies
              to eliminate fatal and serious traffic crashes in the city by
              2030. We are inspired by the belief that even one fatality is too
              many.
            </p>
            <a href="https://data.boston.gov/dataset/vision-zero-crash-records">
              <h2
                className="pt-2"
                style={{ fontFamily: 'Lora', fontStyle: 'italic' }}
              >
                Crash Data
              </h2>
            </a>
            <p>
              This dataset, provided as part of the Vision Zero Boston program,
              contains records of the date, time, location, and type of crash
              for incidents requiring public safety response which may involve
              injuries or fatalities. All records are compiled by the Department
              of Innovation and Technology from the City’s Computer-Aided
              Dispatch (911) system and verified as having required a response
              from a public safety agency. To protect the privacy of individuals
              involved in these incidents, we do not indicate the severity of
              specific crashes or whether medical care was provided in any
              specific case.
            </p>
            <p>Additional notes:</p>
            <ul
              style={{
                fontFamily: 'Lora',
                fontSize: '18px',
              }}
            >
              <li>
                Each incident is included only once regardless of the number of
                individuals involved.
              </li>
              <li>
                The date and time of an incident reflects when public safety
                response was dispatched to the location, not the crash itself.
              </li>
              <li>
                Records are typically updated on a monthly basis, but because
                the verification process involves manual confirmation of
                incidents, exact posting schedules may vary.
              </li>
              <li>
                Records may be updated after their initial posting if new
                information becomes available.
              </li>
            </ul>

            <a href="">
              <h2
                className="pt-2"
                style={{ fontFamily: 'Lora', fontStyle: 'italic' }}
              >
                Fatality Data
              </h2>
            </a>
            <p>Placeholder fatality data text.</p>

            <p style={{ fontStyle: 'italic' }}>
              Please note that the data and information on this website is for
              informational purposes only. While we seek to provide accurate
              information, note that errors may be present and information
              presented may not be complete. Accordingly, the City of Boston
              makes no representation as to the accuracy of the information or
              its suitability for any purpose and disclaim any liability for
              omissions or errors that may be contained therein.
            </p>
          </Col>
        </Layout>
      </div>
    );
  }
}
