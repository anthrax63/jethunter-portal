import React from 'react';
import {ClipLoader} from 'react-spinners';
import {Row, Col} from 'reactstrap';

class InitLoader extends React.Component {
  state = {
    loading: true
  };

  render() {
    const {loaded, loading} = this.props;
    return (
      <div>
        {
          loading && <Row className="text-center">
            <Col>
              <ClipLoader
                className="clip-loader"
                sizeUnit={'px'}
                size={60}
                color={'#c3526e'}
                loading={true}
              />
            </Col>
          </Row>}
        {loaded && this.props.children}
      </div>
    );
  }
}

export default InitLoader;
