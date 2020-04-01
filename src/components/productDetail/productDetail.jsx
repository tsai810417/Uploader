import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AndroidIcon from '../uiElements/AndroidIcon';
import PcIcon from '../uiElements/PcIcon';
import Card from '../uiElements/Card';
import BackIcon from '../uiElements/BackIcon';
import LoadingButton from '../uiElements/LoadingButton';
import UploadedModal from '../uploadedModal/uploadedModal';

import './productDetail.style.css';
import IBFReader from '../../util/uploader/IBFReader';
import LibreParser from '../../util/libreParser';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.handleBackToList = this.handleBackToList.bind(this);
    this.renderInstruction = this.renderInstruction.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.props.requestProductDetail(this.props.id);
    this.props.requestLastRecord(this.props.token, this.props.id);
  }

  handleBackToList() {
    this.props.history.push('/dashboard')
  }

  handleUpload(e) {
    let file = e.target.files[0];
    e.target.value = null;
    let token = this.props.token;
    let productId = this.props.detail.id
    let lastRecordTimestamp = this.props.lastRecordTimestamp;

    switch (productId) {
      case 96:
        IBFReader(file, productId)
        .then(records => {
          this.props.uploadRecords(token, records, productId, lastRecordTimestamp);
        })
        .catch(err => {
          this.props.updateUploadStatus('failed')
        });
        break;

      case 85:
        LibreParser(file, productId)
        .then(records => {
          this.props.uploadRecords(token, records, productId, lastRecordTimestamp);
        })
        .catch(err => {
          this.props.updateUploadStatus('failed')
        });
        break;

      default:
        return;
    }
  }

  renderInstruction(type) {
    const { steps, note, acceptFile } = this.props.detail[type];
    let renderSteps;
    const button = (
      <div key='file-input'>
        <input
          disabled={ this.props.uploadStatus === 'processing' }
          accept={ acceptFile }
          style={{ display: 'none' }}
          id='raised-button-file'
          type='file'
          onChange={ this.handleUpload }
        />
        <label htmlFor='raised-button-file'>
          {
            <LoadingButton
              loading={ this.props.uploadStatus === 'processing' }
              component='span'
            >
              TÉLÉCHARGER
            </LoadingButton>
          }
        </label>
      </div>
    )

    if (steps) {
      renderSteps = steps.map((step, idx) => (
        <li key={`${ type }-${ idx }`}>{ step }</li>
      ));
      
      if (type === 'pc') {
        const buttonIdx = steps.indexOf('BUTTON');
        renderSteps[buttonIdx] = button;
      }
    }

    return (
      <Grid item sm={ 12 } md={ 4 }>
        <div className='instruction-holder'>
          { type === 'android' ?
            <div className='instruction-title'><AndroidIcon />ANDROID</div>
            :
            <div className='instruction-title'><PcIcon />PC ou Mac</div>
          }
          <div className='instruction-content'>
            <p className='instruction-note'>{ note }</p>
            <ol>{ renderSteps }</ol>
          </div>
        </div>
      </Grid>
    );
  }

  render() {
    const {
      id,
      brand_picture_url,
      product_picture_url
    } = this.props.detail;

    return (
      <Paper variant='outlined'>
        <Grid container>
          <Grid item sm={ 3 } md={ 1 }>
            <BackIcon onClick={ this.handleBackToList }/>
          </Grid>
          <Grid item sm={ 9 } md={ 3 }>
            <Card variant='outlined'>
              <img className='brand-img' alt={ `${id}-brand` } src={ brand_picture_url } />
              <img className='product-img' alt={ `${id}-product` } src={ product_picture_url } />
            </Card>
          </Grid>
          { this.props.detail.android ? this.renderInstruction('android') : '' }
          { this.renderInstruction('pc') }
        </Grid>
        <UploadedModal
          showModal={
            this.props.uploadStatus === 'success' || this.props.uploadStatus === 'failed'
          }
          status={ this.props.uploadStatus }
          updateUploadStatus={ this.props.updateUploadStatus }
        />
      </Paper>
    )
  }
}

export default ProductDetail;
