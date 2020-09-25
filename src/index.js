import React, { useState } from "react"
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
Axios.defaults.baseURL = "http://localhost:8080"
function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("webAppToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
          <CreatePost addFlashMessage={addFlashMessage} />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
