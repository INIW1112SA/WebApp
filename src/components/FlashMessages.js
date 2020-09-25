import React from "react"
import Page from "./Page"
function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return <div className="alert alert-success text-center floating-alert shadow-sm">{msg}</div>
      })}
    </div>
  )
}

export default FlashMessages
