import React from 'react'

export default (props) => (
  <table className="table table-striped table-bordered" id={props.id}>
    {props.children}
  </table>
)
