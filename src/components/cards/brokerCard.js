import React, {PureComponent} from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



// Chsrtis JS
// Chsrtis CSS
import 'chartist/dist/chartist.min.css';
// Component specific chart CSS
import '../../assets/scss/components/cards/userStatisticChartCard.scss';

class BrokerCard extends PureComponent {


  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm="3" className="text-center">
              <div>
                <img
                  src={this.props.photo}
                  className="bg-danger width-100 height-100 rounded-circle img-fluid mb-4"
                  alt="Card cap 02"
                />
              </div>
              <div>
                <Button tag={Link} to="/profile" color="info" className="shadow-z-2 gradient-nepal"
                  size="sm">Edit profile</Button>
              </div>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <h3 className="font-large-1">
                    {this.props.fullName}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Broker at <a href="#">{this.props.company}</a></h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>We help to alleviate the expense and burden of recruiting and subsequent administrative support functions through our crew leasing and recruiting services. </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

BrokerCard.propTypes = {
  fullName: PropTypes.string,
  department: PropTypes.string,
  userStatisticData: PropTypes.object
};

export default BrokerCard;
