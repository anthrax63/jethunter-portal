import React, {Component, Fragment} from 'react';
import {Card, CardBody, Row, Col, Button, FormGroup, Label} from 'reactstrap';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

import ContentHeader from '../../components/contentHead/contentHeader';
import Loader from '../../components/loader';
import makeCorrectInitialValues from '../helpers/makeCorrectInitialValues'

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  jetmanId: Yup.string()
    .matches(/^[a-z]+$/, 'Can contain only lowercase english letters')
    .required('Required'),
  description: Yup.string()
    .required('Required'),
  company: Yup.string()
    .required('Required')
});

class Profile extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  handleSubmit = async (values) => {
    this.props.fillBrokerInfo(values);
  };

  render() {
    const data = makeCorrectInitialValues(formSchema, this.props.data);
    return (
      <Loader {...this.props}>
        <Fragment>
          <ContentHeader>Profile</ContentHeader>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Formik
                    initialValues={{
                      ...data
                    }}
                    validationSchema={formSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({errors, touched}) => (
                      <Form>
                        <FormGroup>
                          <Label for="firstName">First Name</Label>
                          <Field name="firstName" id="firstName"
                                 className={`form-control ${errors.firstName && touched.firstName && 'is-invalid'}`}/>
                          {errors.firstName && touched.firstName ?
                            <div className="invalid-feedback">{errors.firstName}</div> : null}
                        </FormGroup>
                        <FormGroup>
                          <Label for="lastName">Last Name</Label>
                          <Field name="lastName" id="lastName"
                                 className={`form-control ${errors.lastName && touched.lastName && 'is-invalid'}`}/>
                          {errors.lastName && touched.lastName ?
                            <div className="invalid-feedback">{errors.lastName}</div> : null}
                        </FormGroup>
                        <FormGroup>
                          <Label for="description">Your description</Label>
                          <Field name="description" id="description"
                                 className={`form-control ${errors.description && touched.description && 'is-invalid'}`}/>
                          {errors.description && touched.description ?
                            <div className="invalid-feedback">{errors.description}</div> : null}
                        </FormGroup>
                        <FormGroup>
                          <Label for="company">Company</Label>
                          <Field name="company" id="company"
                                 className={`form-control ${errors.company && touched.company && 'is-invalid'}`}/>
                          {errors.company && touched.company ?
                            <div className="invalid-feedback">{errors.company}</div> : null}
                        </FormGroup>

                        <FormGroup>
                          <Label for="jetmanId">Jetman ID</Label>
                          <Field name="jetmanId" id="jetmanId"
                                 className={`form-control ${errors.jetmanId && touched.jetmanId && 'is-invalid'}`}/>
                          {errors.jetmanId && touched.jetmanId ?
                            <div className="invalid-feedback">{errors.jetmanId}</div> : null}
                        </FormGroup>
                        <Button type="submit">Save</Button>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fragment>
      </Loader>
    );
  }
}

export default Profile;
