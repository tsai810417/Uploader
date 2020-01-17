import React, { Component } from 'react';
import IBFReader from '../../util/uploader/IBFReader';
import { Buffer } from 'buffer';

class Uploader extends Component {
  constructor(props) {
    super(props);
  }

  onChangeHandler(event) {
    let file = event.target.files[0];
    console.log(IBFReader(file))
  }

  render() {
    return (
      <div>
         <input
          type="file"
          name="file"
          accept='.ibf'
          onChange={this.onChangeHandler}/>
      </div>
    )
  }
}

export default Uploader;