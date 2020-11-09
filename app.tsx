import React from 'react';
import ReactDOM from 'react-dom';
import './app.css'

export default class App extends React.Component<any, any> {  
  constructor(props:any) {
    super(props)
    
    this.state = {
      index: 0,
      imgSrc: ["public/images/doctor.jpg", "public/images/dog.jpg", "public/images/vertically-long.jpg"]
    }
  }
  
  render() {
    return (
      <>
        <div className="img-container">
          <img
            src={ this.state.imgSrc[this.state.index] }
            onClick={ () => this.onImgClick() }
          />
          
          <div>{ this.state.index }</div>
        </div>
      </>
    )
  }
  
  onImgClick() {
    this.setState({ index: this.state.index + 1 })
  }
}