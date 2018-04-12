import React from 'react'

export default (props) => (
  <table className="table table-striped table-bordered thead-light" id={props.id}>
    {props.children}
  </table>
)
