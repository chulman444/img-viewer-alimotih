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
    this.setupHashChangeListener()
    this.setupArrowKeyListener()
    this.loadFromUrl(location.href)
  }
  
  loadFromUrl(url_string:string) {
    const url = new URL(url_string)
    const num_hash = parseInt(url.hash.slice(1))
    if(num_hash != NaN && num_hash > 0 && num_hash <= images.length) {
      const index_from_hash = num_hash - 1
      this.setState({ index: index_from_hash })
    }
    else {
      console.error(`Invalid img index, Loading the first image`)
    }
  }
  
  setupArrowKeyListener() {    
    window.addEventListener('keydown', (ev) => {
      const keycode = ev.code
      if(keycode == 'ArrowLeft') {
        this.viewPrevImg()
      }
      else if(keycode == 'ArrowRight') {
        this.viewNextImg()
      }
    })
  }
  
  setupHashChangeListener() {
    window.addEventListener('hashchange', (ev) => {
      this.loadFromUrl(ev.newURL)
    })
  }
  
  viewPrevImg() {
    if(this.state.index > 0) {
      const new_index = this.state.index - 1
      this.setState({ index: new_index }, () => {
        // Will trigger the `hashchange` event listener.
        location.hash = `#${new_index + 1}`
      })
    }
    else {
      this.setState({ index: images.length - 1 }, () => {
        // Will trigger the `hashchange` event listener.
        location.hash = `#${images.length}`
      })
    }
  }
  
  viewNextImg() {
    if(this.state.index < images.length - 1) {
      const new_index = this.state.index + 1
      this.setState({ index: new_index }, () => {
        // Will trigger the `hashchange` event listener.
        location.hash = `#${new_index + 1}`
      })
    }
    else {
      this.setState({ index: 1 }, () => {
        // Will trigger the `hashchange` event listener.
        location.hash = `#1`
      })
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
          
          <div onClick={ () => this.debug() }>{ this.state.index + 1 }</div>
        </div>
      </>
    )
  }
  
  debug() {
    console.log(this.state)
  }
  
  onImgClick() {
    this.viewNextImg()
  }
}