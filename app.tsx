import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component<any, any> {  
  constructor(props:any) {
    super(props)
    
    this.state = {
      index: 0,
      imgSrc: ["images/doctor.jpg", "images/dog.jpg"]
    }
  }
  
  render() {
    return (
      <>
        <div>hi</div>
        <img
          src={ this.state.imgSrc[this.state.index] }
          alt="Doctor"
          onClick={ () => this.onImgClick() }
        />
      </>
    )
  }
  
  onImgClick() {
    this.setState({ index: this.state.index + 1 })
  }
}