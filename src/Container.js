import React from 'react'

export default (props) => (
  <div className="container" id={props.id}>
    {props.children}
  </div>
)
