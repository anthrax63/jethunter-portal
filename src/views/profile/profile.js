import React, {Component, Fragment} from 'react';
import {Card, CardBody, Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

import ContentHeader from '../../components/contentHead/contentHeader';
import Loader from '../../components/loader';
import makeCorrectInitialValues from '../helpers/makeCorrectInitialValues';
import ProfilePhotoUploader from '../../components/photoUpload/profilePhotoUploader';
import commonMessages from '../../i10n/commonMessages';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';
import {toastr} from 'react-redux-toastr';


const messages = defineMessages({
  title: {
    id: 'profile.title',
    defaultMessage: 'Profile'
  },
  firstName: {
    id: 'profile.firstName',
    defaultMessage: 'First Name'
  },
  lastName: {
    id: 'profile.lastName',
    defaultMessage: 'Last Name'
  },
  description: {
    id: 'profile.description',
    defaultMessage: 'Description'
  },
  company: {
    id: 'profile.company',
    defaultMessage: 'Company'
  },
  jetmanId: {
    id: 'profile.jetmanId',
    defaultMessage: 'JetmanID'
  },
  photo: {
    id: 'profile.photo',
    defaultMessage: 'Photo'
  },
  phoneNumber: {
    id: 'profile.phoneNumber',
    defaultMessage: 'Phone number'
  },
  twitter: {
    id: 'profile.twitter',
    defaultMessage: 'Twitter'
  },
  facebook: {
    id: 'profile.facebook',
    defaultMessage: 'Facebook'
  },
  telegram: {
    id: 'profile.telegram',
    defaultMessage: 'Telegram'
  },
  whatsapp: {
    id: 'profile.whatsapp',
    defaultMessage: 'WhatsApp'
  }
});

const phoneRegExp = /^\+\d+/;
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
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid'),
  photo: Yup.object()
    .nullable()
    .required('Required')
});

class Profile extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  handleSubmit = async (values) => {
    const res = await this.props.fillBrokerInfo(values);
    if (res) {
      toastr.success(this.props.intl.formatMessage(commonMessages.saved));
    }
  };

  handlePhotoUploaded = (form, file) => {
    console.log('handlePhotoUploaded', file);
    form.setFieldValue('photo', file);
  };

  render() {
    const data = makeCorrectInitialValues(formSchema, this.props.data);
    return (
      <Loader {...this.props}>
        <Fragment>
          <ContentHeader><FormattedMessage {...messages.title} /></ContentHeader>
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
                    {({values, errors, touched}) => (
                      <Form>
                        <Row form>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="photo"><FormattedMessage {...messages.photo} /></Label>
                              <Field
                                name="photo"
                                id="photo"
                                className={`form-control ${errors.photo && 'is-invalid'}`}
                                render={({form}) => (
                                  <div>
                                    <ProfilePhotoUploader
                                      uploadFile={this.props.uploadFile}
                                      onUploaded={(file) => {
                                        this.handlePhotoUploaded(form, file);
                                      }}
                                      link={values.photo && values.photo.link}
                                    />
                                  </div>
                                )}
                              />
                              {errors.photo ?
                                <div style={{color: 'red'}}>{errors.photo}</div> : null}
                            </FormGroup>
                          </Col>
                          <Col md={8}>
                            <FormGroup>
                              <Label for="firstName"><FormattedMessage {...messages.firstName} /></Label>
                              <Field
                                name="firstName" id="firstName"
                                className={`form-control ${errors.firstName && touched.firstName && 'is-invalid'}`}/>
                              {errors.firstName && touched.firstName ?
                                <div className="invalid-feedback">{errors.firstName}</div> : null}
                            </FormGroup>
                            <FormGroup>
                              <Label for="lastName"><FormattedMessage {...messages.lastName} /></Label>
                              <Field
                                name="lastName" id="lastName"
                                className={`form-control ${errors.lastName && touched.lastName && 'is-invalid'}`}/>
                              {errors.lastName && touched.lastName ?
                                <div className="invalid-feedback">{errors.lastName}</div> : null}
                            </FormGroup>
                            <FormGroup>
                              <Label for="company"><FormattedMessage {...messages.company} /></Label>
                              <Field
                                name="company" id="company"
                                className={`form-control ${errors.company && touched.company && 'is-invalid'}`}/>
                              {errors.company && touched.company ?
                                <div className="invalid-feedback">{errors.company}</div> : null}
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr/>
                        <FormGroup>
                          <Label for="description"><FormattedMessage {...messages.description} /></Label>
                          <Input
                            type="textarea"
                            tag={Field}
                            name="description" id="description"
                            className={`form-control ${errors.description && touched.description && 'is-invalid'}`}/>
                          {errors.description && touched.description ?
                            <div className="invalid-feedback">{errors.description}</div> : null}
                        </FormGroup>

                        <FormGroup>
                          <Label for="jetmanId"><FormattedMessage {...messages.jetmanId} /></Label>
                          <Field
                            name="jetmanId" id="jetmanId"
                            className={`form-control ${errors.jetmanId && touched.jetmanId && 'is-invalid'}`}/>
                          {errors.jetmanId && touched.jetmanId ?
                            <div className="invalid-feedback">{errors.jetmanId}</div> : null}
                        </FormGroup>
                        <hr/>

                        <FormGroup>
                          <Label for="phoneNumber"><FormattedMessage {...messages.phoneNumber} /></Label>
                          <Field
                            name="phoneNumber" id="phoneNumber"
                            className={`form-control ${errors.phoneNumber && touched.phoneNumber && 'is-invalid'}`}/>
                          {errors.phoneNumber && touched.phoneNumber ?
                            <div className="invalid-feedback">{errors.phoneNumber}</div> : null}
                        </FormGroup>

                        <FormGroup>
                          <Label for="facebook"><FormattedMessage {...messages.facebook} /></Label>
                          <Field
                            name="facebook" id="facebook"
                            className={`form-control ${errors.facebook && touched.facebook && 'is-invalid'}`}/>
                          {errors.facebook && touched.facebook ?
                            <div className="invalid-feedback">{errors.facebook}</div> : null}
                        </FormGroup>

                        <FormGroup>
                          <Label for="telegram"><FormattedMessage {...messages.telegram} /></Label>
                          <Field
                            name="telegram" id="telegram"
                            className={`form-control ${errors.telegram && touched.telegram && 'is-invalid'}`}/>
                          {errors.telegram && touched.telegram ?
                            <div className="invalid-feedback">{errors.telegram}</div> : null}
                        </FormGroup>

                        <FormGroup>
                          <Label for="whatsapp"><FormattedMessage {...messages.whatsapp} /></Label>
                          <Field
                            name="whatsapp" id="whatsapp"
                            className={`form-control ${errors.whatsapp && touched.whatsapp && 'is-invalid'}`}/>
                          {errors.whatsapp && touched.whatsapp ?
                            <div className="invalid-feedback">{errors.whatsapp}</div> : null}
                        </FormGroup>


                        <FormGroup>
                          <Label for="twitter"><FormattedMessage {...messages.twitter} /></Label>
                          <Field
                            name="twitter" id="twitter"
                            className={`form-control ${errors.twitter && touched.twitter && 'is-invalid'}`}/>
                          {errors.twitter && touched.twitter ?
                            <div className="invalid-feedback">{errors.twitter}</div> : null}
                        </FormGroup>
                        <Button type="submit"><FormattedMessage {...commonMessages.save} /></Button>
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

export default injectIntl(Profile);
