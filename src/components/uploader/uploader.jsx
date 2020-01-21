import React, { Component } from 'react';
import IBFReader from '../../util/uploader/IBFReader';

class Uploader extends Component {
  constructor(props) {
    super(props);
  }

  onChangeHandler(event) {
    let file = event.target.files[0];
    IBFReader(file);
  }

  render() {
    return (
      <div>
         <input
          type="file"
          name="file"
          accept='.ibf'
          onChange={this.onChangeHandler}
        />
      </div>
    )
  }
}

export default Uploader;
