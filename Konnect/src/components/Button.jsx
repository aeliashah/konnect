import React from 'react'

export default function Button({
    children,
    type="button",
    className="",
    ...props

}) {
  return (
   <button {...props} className="submit-btn">{children}</button>
  )
}
