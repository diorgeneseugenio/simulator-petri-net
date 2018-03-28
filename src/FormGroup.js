import React from 'react'

export default ({ name, label, id, value, onChange, colClass = 'col-md-12',  type = 'text' }) => (
  <div className={["form-group", colClass].join(' ')}>
    <label
      htmlFor={id}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={id}
      className="form-control"
      value={value}
      onChange={onChange}
    />
  </div>
)
