import React from 'react'
import '../buttons/BlueButton.css'
import './DonateButton.css'

const   DonateButton = (props) => {
  return (
    <button onClick={props.onClick} className="blue-button btn-donate">
    {props.children}
</button>
  )
}

export default DonateButton