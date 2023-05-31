import React from 'react'
import './DonateButton.css'
import '../buttons/button.css'
const   DonateButton = (props) => {
  return (
    <button id='btn-donate' class="button">
    {props.children}
</button>
  )
}

export default DonateButton