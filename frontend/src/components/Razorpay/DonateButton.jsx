import React from 'react'
import './DonateButton.css'

const   DonateButton = (props) => {
  return (
    <button onClick={props.onClick} className="blue-button btn-donate">
    {props.children}
</button>
  )
}

export default DonateButton