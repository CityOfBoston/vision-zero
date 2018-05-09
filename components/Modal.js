import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div className="align-middle">
        <Button
          color="warning"
          onClick={this.toggle}
          className="p-0 pr-1 pl-1 ml-2 mt-3"
          style={{ borderRadius: '70px' }}
        >
          <FontAwesome name="info-circle" />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Traffic Crashes Information
          </ModalHeader>
          <ModalBody>
            <p>
              The information in this map is for the time period July 1, 2014
              through three months from the present. We will upload new data
              each month, always three months behind to allow for data
              verification.
            </p>
            <p>
              For the purposes of this map, “crash” is defined as a traffic
              incident in the City of Boston that resulted in a response by
              Boston Emergency Medical Services. These include incidents on
              streets owned by the City, as well as incidents on state-owned
              roadways. Note the following:
            </p>
            <ol>
              <li>
                Only one dot per incident is shown, regardless of the number of
                patients.
              </li>
              <li>
                If there was more than one patient per incident, the mode is
                assigned to the most vulnerable user (i.e. pedestrians more
                vulnerable than bicyclists more vulnerable than motorists).
              </li>
            </ol>
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
            <p>
              Thanks to NYC DOT for sharing code to help make this map possible.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
