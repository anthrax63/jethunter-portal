import React, {Component, Fragment} from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';


import BrokerCard from '../../components/cards/brokerCard';
import MinimalStatisticsChart from '../../components/cards/minimalStatisticsWithChartCard';
import {StaticCardData} from '../cards/staticCardData';
import * as Icon from 'react-feather';
import ProductsSalesChartCard from '../../components/cards/productsSalesChartCard';
import {AdvancedCardData} from '../cards/advancedCardData';
import {Link} from 'react-router-dom';
import {toastr} from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';
import commonMessages from '../../i10n/commonMessages';
import urlParse from 'url-parse';

const messages = defineMessages({
  congratulations: {
    id: 'brokerDashboard.congratulations',
    defaultMessage: 'Congratulations {firstName}!'
  },
  youHaveCompleted: {
    id: 'brokerDashboard.youHaveCompleted',
    defaultMessage: 'You have completed the creation of Jetman Profile! The Jetman ID was assigned.'
  },
  yourId: {
    id: 'brokerDashboard.yourId',
    defaultMessage: 'Your JETMAN ID'
  },
  copied: {
    id: 'brokerDashboard.copied',
    defaultMessage: 'Copied to clipboard!'
  },
  hi: {
    id: 'brokerDashboard.hi',
    defaultMessage: 'Hi {firstName}!'
  },
  youNeedToFillOut: {
    id: 'brokerDashboard.youNeedToFillOut',
    defaultMessage: 'You need to fill out your profile information before continue'
  },
  goToProfile: {
    id: 'brokerDashboard.goToProfile',
    defaultMessage: 'Go to Profile'
  }
});

class BrokerDashboard extends Component {
  async componentDidMount() {
    await this.props.fetchCurrentUser();
  }

  handleCopyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    copy(this.props.jetmanId);
    toastr.success(this.props.intl.formatMessage(messages.copied));
  };

  renderNotFilled = () => {
    return (
      <div className="text-center">
        <h1><FormattedMessage {...messages.hi} values={{firstName: this.props.firstName}} /></h1>
        <h1><FormattedMessage {...messages.youNeedToFillOut} /></h1>
        <Button tag={Link} to="/profile" color="info" className="shadow-z-2 gradient-purple-bliss">
          <FormattedMessage {...messages.goToProfile} />
        </Button>
      </div>
    );
  };

  renderFilled = () => {
    const {firstName, lastName, jetmanId, company, description, photo: {link}} = this.props;
    const domain = urlParse(window.location.href).hostname;
    let pageDomain = 'jetman.page';
    let pageProtocol = 'https';
    let pagePort = '';
    if (domain.indexOf('stage.') !== -1) {
      pageDomain = 'stage.jetman.page';
    } else if (domain === 'localhost') {
      pageDomain = 'jetman.test';
      pageProtocol = 'http';
      pagePort = '8080';
    }
    const pageUrl = `${pageProtocol}://${jetmanId}.${pageDomain}${pagePort ? `:${pagePort}` : ''}`;
    return (
      <Fragment>
        <Row>
          <Col sm="12" md="12">
            <Card>
              <CardBody className="text-center">
                <CardTitle><FormattedMessage {...messages.congratulations} values={{firstName}}/></CardTitle>
                <CardText>
                  <FormattedMessage {...messages.youHaveCompleted} />
                </CardText>
                <div>
                  <FormattedMessage {...messages.yourId} />
                </div>
                <div className="text-center">
                  <a href={pageUrl} target="_blank">{pageUrl}</a>
                  <div className="pad2">
                    <br/>
                    <Button
                      color="info"
                      className="shadow-z-2 gradient-purple-bliss"
                      size="sm"
                      onClick={this.handleCopyClick}><FormattedMessage {...commonMessages.copy} /></Button>
                    <span>&nbsp;</span>
                    <Button
                      color="info" className="shadow-z-2 gradient-pomegranate"
                      size="sm" onClick={this.handleCopyClick}><FormattedMessage {...commonMessages.share} /></Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <Card>
              <CardBody>
                <BrokerCard
                  photo={link}
                  fullName={`${firstName} ${lastName}`}
                  company={company}
                  description={description}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <h3>Your Landing Page visits</h3>
        <Row className="row-eq-height">
          <Col sm="12" md="6" xl="3">
            <MinimalStatisticsChart
              chartData={StaticCardData.ChartistData}
              cardBgColor="gradient-blackberry"
              statistics="15"
              text="Today"
              iconSide="right"
            >
              <Icon.BarChart size={36} strokeWidth="1.3" color="#fff"/>
            </MinimalStatisticsChart>
          </Col>
          <Col sm="12" md="6" xl="3">
            <MinimalStatisticsChart
              chartData={StaticCardData.ChartistData}
              cardBgColor="gradient-ibiza-sunset"
              statistics="98"
              text="Week"
              iconSide="right"
            >
              <Icon.BarChart size={36} strokeWidth="1.3" color="#fff"/>
            </MinimalStatisticsChart>
          </Col>
          <Col sm="12" md="6" xl="3">
            <MinimalStatisticsChart
              chartData={StaticCardData.ChartistData}
              cardBgColor="gradient-green-teal"
              statistics="456"
              text="Month"
              iconSide="right"
            >
              <Icon.BarChart size={36} strokeWidth="1.3" color="#fff"/>
            </MinimalStatisticsChart>
          </Col>
          <Col sm="12" md="6" xl="3">
            <MinimalStatisticsChart
              chartData={StaticCardData.ChartistData}
              cardBgColor="gradient-pomegranate"
              statistics="4566"
              text="Total"
              iconSide="right"
            >
              <Icon.BarChart size={36} strokeWidth="1.3" color="#fff"/>
            </MinimalStatisticsChart>
          </Col>
        </Row>
        <h3>Requests statistics</h3>
        <Row>
          <Col sm="12">
            <ProductsSalesChartCard
              productsSalesData={AdvancedCardData.ProductsSalesData}
              cardTitle="Products Sales"
              salesText="Sales"
              visitText="Visits"
            />
          </Col>
        </Row>
      </Fragment>
    );
  };

  render() {
    const {jetmanId} = this.props;
    return jetmanId ? this.renderFilled() : this.renderNotFilled();
  }
}

export default injectIntl(BrokerDashboard);
