import { useState, Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import Profile from './components/Profile/Profile'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import ParticlesBg from 'particles-bg'
import './App.css'


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    _id: '',
    username: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        _id: data._id,
        username: data.username,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBoundingBox = (box) => {
    this.setState({ box });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://smartbrain-api-roai.onrender.com/image', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(`fetch response: ${response}`)
        fetch('https://smartbrain-api-roai.onrender.com/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.state.user._id
          })
        })
          .then(response => response.json())
          .then(user => {
            this.setState(Object.assign(this.state.user, { entries: user.entries }))
          })
          .catch(error => console.log('error', error))
        this.displayFaceBoundingBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      fetch('https://smartbrain-api-roai.onrender.com/logout', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.user) {
            this.setState(initialState)
          }
        })
        .catch(error => console.log('error', error))
      //this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'profile') {
      fetch(`https://smartbrain-api-roai.onrender.com/profile/${this.state.user._id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(user => {
          this.loadUser(user)
        })
        .catch(error => console.log('error', error))
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box, user, _id } = this.state;
    return (
      <div className="App">
        <ParticlesBg color='#FFFFFF' num={10} type={'square'} bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          userId={_id}
        />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'profile'
              ? <div>
                <Logo />
                <Profile user={user} />
              </div>
              : (
                route === 'signin'
                  ? <Signin
                    onRouteChange={this.onRouteChange}
                    loadUser={this.loadUser}
                  />
                  : <Register
                    onRouteChange={this.onRouteChange}
                    loadUser={this.loadUser}
                  />
              )
          )
        }
      </div>
    )
  }
}

export default App;
