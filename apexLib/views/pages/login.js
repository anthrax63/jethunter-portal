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

  render() {
    return (
      <div className="container">
        <Row className="full-height-vh">
          <Col xs="12" className="d-flex align-items-center justify-content-center">
            <Card className="gradient-indigo-purple text-center width-400">
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
                      <Button type="submit" color="danger" block className="btn-pink btn-raised">
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <NavLink to="/register" className="text-white">
                    Register Now
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
