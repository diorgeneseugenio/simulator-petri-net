import React from 'react'

export default ({ id, type = 'button', text, onClick, btnType = 'btn-primary', colClass }) => (
  <div
  className={[colClass, "text-center", "align-self-center"].join(' ')}
  >
    <button
    type={type}
    className={["btn", btnType].join(' ')}
    onClick={onClick}
    >
      {text}
    </button>
  </div>
)
