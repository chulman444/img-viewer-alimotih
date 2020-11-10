import React from 'react';
import ReactDOM from 'react-dom';
import './app.css'

const images = require('my-dir-loader!./dir.config.js');

export default class App extends React.Component<any, any> {  
  constructor(props:any) {
    super(props)
    
    this.state = {
      index: 0,
      imgSrc: images
    }
  }
  
  componentDidMount() {
    this.setupArrowKeyListener()
  }
  
  setupArrowKeyListener() {    
    window.addEventListener('keydown', (ev) => {
      const keycode = ev.code
      if(keycode == 'ArrowLeft') {
        this.setState((prevState:any) => prevState.index--)
      }
      else if(keycode == 'ArrowRight') {
        this.setState((prevState:any) => prevState.index++)
      }
    })
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