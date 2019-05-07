import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {toastr} from 'react-redux-toastr';
import {ClipLoader} from 'react-spinners';

const maxFileSize = 128 * 1024;

const containerStyle = {
  width: 200,
  height: 200,
  position: 'relative'
};

const innerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
};

const imageStyle = {
  zoom: 2,
  display: 'block',
  margin: 'auto',
  height: 'auto',
  maxHeight: '100%',
  width: 'auto',
  maxWidth: '100%'
};

const overlayStyle = {
  ...innerStyle,
  pointerEvents: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.8)',
  color: 'white',
  textAlign: 'center'
};

class ProfilePhotoUploader extends Component {

  state = {
    hover: false,
    uploading: false
  };

  onDrop = async (files) => {
    const {onUploaded} = this.props;
    if (files && files.length) {
      const file = files[0];
      if (file.size > maxFileSize) {
        return toastr.info('Max file size is 128KB');
      }
      const {uploadFile} = this.props;
      this.setState((state) => ({...state, uploading: true}));
      const data = await uploadFile(file);
      if (onUploaded) {
        onUploaded(data);
      }
      this.setState((state) => ({...state, uploading: false}));
    }
  };


  render() {
    const link = this.props.link;
    const {hover, uploading} = this.state;
    return (
      <div>
        <div style={containerStyle}>
          <div
            style={innerStyle}
          >
            <div style={{...overlayStyle, backgroundColor: 'transparent'}}>
              {link && <img src={link} alt="" style={imageStyle}/>}
            </div>
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={this.onDrop}
              onMouseOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.setState((state) => ({...state, hover: true}));
              }}
              onMouseOut={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.setState((state) => ({...state, hover: false}));
              }}
            >
              {hover && link &&
              <div style={overlayStyle}>
                Click to select another photo
              </div>}
              {!link && !uploading &&
              <div style={overlayStyle}>
                Click to select photo
              </div>
              }
              {uploading &&
              <div style={{...overlayStyle, backgroundColor: 'white'}}>
                <ClipLoader
                  className="clip-loader"
                  sizeUnit={'px'}
                  size={60}
                  color={'#c3526e'}
                  loading={true}
                />
              </div>}
            </Dropzone>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePhotoUploader;
