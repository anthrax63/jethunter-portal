// import external modules
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Button,
  Card,
  CardBody,
  CardFooter
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {toastr} from 'react-redux-toastr';

class Login extends Component {
  state = {
    form: {}
  };

  constructor(props) {
    super(props);
  }


  handleChange = (e, name) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [name]: e.target.value
      }
    });
  };

  handleSubmit = (e) => {
    console.log('handleSubmit', this.state);
    e.preventDefault();
    const form = this.state.form;
    this.props.login(form);
  };

  handleGoogleClick = async () => {
    const data = await this.props.signInWithGoogle();
    if (data) {
      await this.props.loginWithGoogle({accessToken: data.credential.accessToken});
    } else {
      toastr.error(this.props.error);
    }
  };

  handleFacebookClick = async () => {
    const data = await this.props.signInWithFacebook();
    console.log('data', data);
    if (data) {
      await this.props.loginWithFacebook({accessToken: data.credential.accessToken});
    } else {
      toastr.error(this.props.error);
    }
  };

  render() {
    return (
      <div className="container full-height-vh">
        <Row className="">
          <Col xs="12" className="d-flex justify-content-center">
            <Card className="text-center width-400" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <CardBody>
                <h2 className="white py-4">Login</h2>
                <Form className="pt-2" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Col md="12">
                      <Input
                        type="email"
                        className="form-control"
                        name="inputEmail"
                        id="inputEmail"
                        placeholder="Email"
                        required
                        onChange={(e) => this.handleChange(e, 'login')}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col md="12">
                      <Input
                        type="password"
                        className="form-control"
                        name="inputPass"
                        id="inputPass"
                        placeholder="Password"
                        required
                        onChange={(e) => this.handleChange(e, 'password')}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col md="12">
                      <Button type="submit" color="primary" block className="shadow-z-2">
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
                <div className="text-center">
                  <p>
                    or sign in using social networks
                  </p>
                  <Row>
                    <Col md="4"/>
                    <Col md="2">
                      <Button className="gradient-blackberry" onClick={this.handleGoogleClick}><FontAwesomeIcon icon={faGoogle} size="lg"/></Button>
                    </Col>
                    <Col md="2">
                      <Button className="gradient-pomegranate" onClick={this.handleFacebookClick}><FontAwesomeIcon icon={faFacebook} size="lg"/></Button>
                    </Col>
                    <Col md="4"/>
                  </Row>
                </div>
              </CardBody>
              <CardFooter style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="float-right">
                  <NavLink to="/register" className="text-white">
                    Register
                  </NavLink>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
