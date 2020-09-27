import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import SinglePost from "./components/SinglePost"
import FlashMessages from "./components/FlashMessages"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

Axios.defaults.baseURL = "http://localhost:8080"
function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("webAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("webAppToken"),
      username: localStorage.getItem("webAppusername"),
      avatar: localStorage.getItem("webAppAvatar"),
    },
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("webAppusername", state.user.username)
      localStorage.setItem("webAppToken", state.user.token)
      localStorage.setItem("webAppAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("webAppusername", state.user.username)
      localStorage.removeItem("webAppToken", state.user.token)
      localStorage.removeItem("webAppAvatar", state.user.avatar)
    }
  }, [state.loggedIn])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <FlashMessages messages={state.flashMessages} />
          <Switch>
            <Route exact path="/">
              {state.loggedIn ? <Home /> : <HomeGuest />}
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
