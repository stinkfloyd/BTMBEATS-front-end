import React, {Component} from 'react'

import Register from './components/Register'
import Login from './components/Login'
import TrackUpload from './components/TrackUpload'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import HomePage from './components/HomePage'

// import MessageList from './components/MessageList'
const API = 'http://localhost:3000'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      formHidden: 'hidden',
      user: {},
      tracks: [],
      token: ''
    }
  }

  async componentDidMount() {
    const users = await fetch(`${API}/users`).then(rawRes => rawRes.json())
    const tracks = await fetch(`${API}/tracks`).then(rawRes => rawRes.json())
    // const history = createBrowserHistory()

    console.log(users, tracks)

    this.setState({users, tracks})
  }

  onSuccess = (token) => {
    // update state
    this.setState({
      ...this.state,
      token: token,

      //adjust this so something changes on registration form submit
    })

  }

  postTrack = async (data) => {
    console.log(data, "i'm going to post this")
    let response = await fetch(`${API}/tracks`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state.formHidden
      })
    } else {
      console.log('Couldn\'t Post New track: ', response.status)
    }

  }

  // composeToggle = () => {
  //       this.state.formHidden === 'hidden' ?
  //       this.setState({formHidden: ''}) :
  //       this.setState({formHidden: 'hidden'})
  //   }

  render() {
    // console.log("Users ", this.state.users, "Tracks ", this.state.tracks);
    return (<Router>
      <div className="container">

        <Route path='/' exact component={HomePage}/>

        <Route path='/login' render={() => <Login /*postUser={this.postUser}*//>}/>

        <Route path='/register' render={props => <Register {...props} onSuccess={this.onSuccess} postUser={this.postUser} />}/>
        {this.state.tracks.map(track => (
          <div key={track.id}>{track.title}</div>))}
        </div>
      </Router>);
    }
  }
export default App
