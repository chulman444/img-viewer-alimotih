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
    console.log(num_hash)
    if(num_hash != NaN && num_hash > 0 && num_hash <= images.length) {
      this.setState({ index: num_hash - 1 })
    }
    else {
      console.error(`Invalid img index, Loading the first image`)
    }
  }
  
  setupArrowKeyListener() {    
    window.addEventListener('keydown', (ev) => {
      const keycode = ev.code
      if(keycode == 'ArrowLeft') {
        const SECOND_INDEX = 1
        if(this.state.index >= SECOND_INDEX) {
          this.viewPrevImg()
        }
      }
      else if(keycode == 'ArrowRight') {
        const SECOND_LAST_INDEX = images.length - 2
        if(this.state.index <= SECOND_LAST_INDEX) {
          this.viewNextImg(this.state.index)
        }
      }
    })
  }
  
  setupHashChangeListener() {
    window.addEventListener('hashchange', (ev) => {
      this.loadFromUrl(ev.newURL)
    })
  }
  
  viewPrevImg() {
    const new_index = this.state.index - 1
    this.setState({ index: new_index }, () => {
      // Will trigger the `hashchange` event listener.
      location.hash = `#${new_index + 1}`
    })
  }
  
  viewNextImg(cur_index:number) {
    console.log(`viewNextImg`,cur_index)
    const new_index = cur_index + 1
    this.setState({ index: new_index }, () => {
      // Will trigger the `hashchange` event listener.
      location.hash = `#${new_index + 1}`
    })
  }
  
  render() {
    return (
      <>
        <div className="img-container">
          {
          Array.from(new Array(images.length)).map((el, i) => {
            return (
              <img
                data-el-index={i}
                style={{ display: this.state.index == i ? "initial" : "none" }}
                src={ this.state.imgSrc[i] }
                onClick={ () => this.viewNextImg(i) }
              />
            )
          })
          }
          
          <div>{ this.state.index + 1 }</div>
        </div>
      </>
    )
  }
  
  onImgClick() {
    const SECOND_LAST_INDEX = images.length - 2
    if(this.state.index <= SECOND_LAST_INDEX) {
      this.viewNextImg(this.state.index)
    }
  }
}