import React, {Component, Fragment} from 'react';
import {
  Row,
  Col, Card, CardBody, Button
} from 'reactstrap';


import {defineMessages, injectIntl} from 'react-intl';
import Loader from '../../../components/loader';
import ContentHeader from '../../../components/contentHead/contentHeader';
import ContentSubHeader from '../../../components/contentHead/contentSubHeader';
import StepZilla from '../../../components/stepZilla/StepZilla';
import Select from 'react-select';


import '../../../assets/scss/views/form/wizard.scss';

import {toastr} from 'react-redux-toastr';


const messages = defineMessages({
  step1ProvideAccess: {
    id: 'facebookSalesChannel.step1ProvideAccess',
    defaultMessage: 'Provide access'
  },
  step2SelectPage: {
    id: 'facebookSalesChannel.step2SelectPage',
    defaultMessage: 'Select page'
  },
  step3Complete: {
    id: 'facebookSalesChannel.step3Complete',
    defaultMessage: 'Complete'
  }
});


class EnableChannelStep1 extends Component {
  handleClick = async () => {
    const data = await this.props.stepProps.signInWithFacebook();
    if (data) {
      await this.props.stepProps.loadPages(data.credential.accessToken);
      this.props.jumpToStep(1);
    } else {
      toastr.error('Authorization error');
    }
  };

  render() {
    return (
      <Row>
        <Col md="12" className="text-center">
          <p>Click the button below, then login to your Facebook account and provide requested permissions.</p>
          <div>
            <Button color="primary" onClick={this.handleClick}>Authorize</Button>
          </div>
        </Col>
      </Row>
    );
  }
}


class PageSelectOption extends Component {
  render() {
    console.log('option.props', this.props);
    const {innerProps, innerRef, data} = this.props;
    return (
      <div ref={innerRef} {...innerProps} className={this.props.className}>
        <img src={data.logoUrl} style={{marginRight: 4, marginLeft: 4, width: 20, height: 20}} alt=""/>
        <span>{data.title}</span>
      </div>
    );
  }
}

class EnableChannelStep2 extends Component {
  state = {
    selectedOption: null
  };

  handleClick = () => {
    const option = this.state.selectedOption || this.pageToOption(this.props.stepProps.pages[0]);
    this.props.stepProps.setPage({name: option.title, id: option.value});
    this.props.jumpToStep(2);
  };

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
    console.log(`Option selected:`, selectedOption);
  };

  pageToOption = (page) => ({
    value: page.id,
    title: page.name,
    logoUrl: page.logoUrl
  });

  render() {
    const data = this.props.stepProps.pages.map((page) => this.pageToOption(page));
    return (
      <div>
        <Row className="text-center">
          <Col md="12">
            <p>Select the page you want to use</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={data[0]}
              name="color"
              options={data}
              components={{Option: PageSelectOption, SingleValue: PageSelectOption}}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <br/>
        <Row className="text-center">
          <Col md="12">
            <Button color="primary" onClick={this.handleClick}>Continue</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

class EnableChannelStep3 extends Component {
  handleClick = () => {
    this.props.stepProps.connect();
  };

  render() {
    return (
      <div>
        <Row className="text-center">
          <Col md="12">
            <p>You selected page {this.props.stepProps.page.name} to connect with your Jetman profile.</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md="12">
            <p>Click "Complete" to finish creating your Facebook sales channel!</p>
          </Col>
        </Row>
        <br/>
        <Row className="text-center">
          <Col md="12">
            <Button color="primary" onClick={this.handleClick}>Complete</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

class ChannelEnabled extends Component {
  handleDisconnect = async () => {
    await this.props.disable();
    await this.props.get();
  };

  render() {
    return (
      <div>
        <ContentHeader>Facebook sales channel</ContentHeader>
        <ContentSubHeader>
          <p>You have successfully connect your page</p>
        </ContentSubHeader>
        <Card>
          <CardBody>
            <Row>
              <Col md="1">
                <img src={this.props.pageLogo.link} alt="" className="width-50 height-50"/>
              </Col>
              <Col md="9">
                <h2><a href={`https://facebook.com/${this.props.pageId}`} target="_blank">{this.props.pageName}</a> is connected</h2>
              </Col>
              <Col md="2">
                <Button color="danger" onClick={this.handleDisconnect}>Disconnect</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class ChannelNotEnabled extends Component {
  state = {
    step: 0,
    pages: [],
    page: null,
    accessToken: null
  };

  loadPages = async (accessToken) => {
    const pages = await this.props.loadPages({accessToken});
    this.setState((state) => ({
      ...state,
      pages,
      accessToken
    }));
  };

  setPage = (page) => {
    this.setState((state) => ({
      ...state,
      page
    }));
  };

  connect = async () => {
    const {page: {id: pageId}, accessToken} = this.state;
    await this.props.enable({accessToken, pageId});
    await this.props.get();
  };


  render() {
    const steps = [
      {
        name: this.props.intl.formatMessage(messages.step1ProvideAccess),
        component: <EnableChannelStep1/>
      },
      {
        name: this.props.intl.formatMessage(messages.step2SelectPage),
        component: <EnableChannelStep2/>
      },
      {
        name: this.props.intl.formatMessage(messages.step3Complete),
        component: <EnableChannelStep3/>
      }
    ];
    return (
      <div>
        <ContentHeader>Facebook sales channel</ContentHeader>
        <ContentSubHeader>
          <p>You have not yet enabled your Facebook sales channel. To enable this channel, follow the steps below.</p>
        </ContentSubHeader>
        <Card>
          <CardBody>
            <div className="step-progress">
              <StepZilla
                steps={steps}
                preventEnterSubmission={true}
                nextTextOnFinalActionStep={'Save'}
                startAtStep={0}
                onStepChange={(step) => {
                }}
                showNavigation={false}
                stepsNavigation={false}
                stepProps={{
                  signInWithFacebook: this.props.signInWithFacebook,
                  loadPages: this.loadPages,
                  setPage: this.setPage,
                  connect: this.connect,
                  ...this.state
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class FacebookSalesChannelPage extends Component {
  async componentDidMount() {
    await this.props.get();
  }

  render() {
    return (
      <Loader {...this.props}>
        <Fragment>
          <Row>
            <Col sm="12" md="12">
              {this.props.enabled ? <ChannelEnabled {...this.props}/> : <ChannelNotEnabled {...this.props}/>}
            </Col>
          </Row>
        </Fragment>
      </Loader>
    );
  }
}

export default injectIntl(FacebookSalesChannelPage);
