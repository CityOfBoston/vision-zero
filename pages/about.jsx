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

            <a href="https://data.boston.gov/dataset/vision-zero-fatality-records">
              <h2
                className="pt-2"
                style={{ fontFamily: 'Lora', fontStyle: 'italic' }}
              >
                Fatality Data
              </h2>
            </a>
            <p>
              This dataset, provided as part of the Vision Zero Boston program,
              contains records of the date, time, location, and type of fatality
              for Vision Zero related crashes resulting in a fatality. All
              records are compiled by the Department of Innovation and
              Technology from the City’s Computer-Aided Dispatch (911) system
              and verified by the Boston Police Department as being a Vision
              Zero related fatality. To protect the privacy of individuals
              involved in these incidents, we do not provide any descriptions of
              the incident or whether medical care was provided in any specific
              case.
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
                The location of an incident reflects where public safety
                response was dispatched to, not the incident itself.
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
              <li>
                The data includes traffic fatalities that take place on streets
                that are within the jurisdiction of the Boston Police
                Department. It does not include traffic fatalities on streets
                that are within the jurisdiction of the Massachusetts State
                Police.
              </li>
              <li>
                The following are excluded: fatal crashes that occur on private
                property or on streets that are not owned by the City of Boston;
                fatalities due to driver medical emergencies, intentional
                assault, or suicide; fatalities where the driver or passenger
                fell out of a car.
              </li>
            </ul>

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
