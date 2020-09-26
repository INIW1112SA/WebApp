import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import SinglePost from "./components/SinglePost"
import FlashMessages from "./components/FlashMessages"
import ExampleContext from "./ExampleContext"

Axios.defaults.baseURL = "http://localhost:8080"
function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("webAppToken")),
    flashMessages: [],
  }
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          loggedIn: true,
          flashMessages: state.flashMessages,
        }
      case "logout":
        return {
          loggedIn: false,
          flashMessages: state.flashMessages,
        }
      case "flashMessage":
        return {
          loggedIn: state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value),
        }
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)
  const [loggedIn, setLoggedIn] = useState()
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }
  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <FlashMessages messages={flashMessages} />
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/post/:id">
            <SinglePost />
          </Route>
          <Route path="/about-us">
            <About />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
