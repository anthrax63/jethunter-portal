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
  Label,
  Card,
  CardBody,
  CardFooter
} from 'reactstrap';

class Register extends Component {
  state = {
    form: {}
  };

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
    e.preventDefault();
    const form = this.state.form;
    this.props.register(form);
  };

  render() {
    return (
      <div className="container">
        <Row className="full-height-vh">
          <Col xs="12" className="d-flex align-items-center justify-content-center">
            <Card className="gradient-indigo-purple text-center width-400">
              <CardBody>
                <h2 className="white py-4">Register</h2>
                <Form className="pt-2" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Col md="12">
                      <Input
                        type="text"
                        className="form-control"
                        name="inputName"
                        id="inputName"
                        placeholder="FirstName"
                        required
                        onChange={(e) => this.handleChange(e, 'firstName')}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col md="12">
                      <Input
                        type="text"
                        className="form-control"
                        name="inputName"
                        id="inputName"
                        placeholder="LastName"
                        required
                        onChange={(e) => this.handleChange(e, 'lastName')}
                      />
                    </Col>
                  </FormGroup>
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
                      <Button type="submit" color="danger" block className="btn-pink btn-raised">
                                    Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <NavLink to="/signin" className="text-white">
                              Login
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

export default Register;
