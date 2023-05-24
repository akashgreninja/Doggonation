import React from 'react'

const PremiumCard = () => {
  return (
    <div class="pack-container">
  <div class="header">
    <p class="title">
      Starter
    </p>
    <div class="price-container">
      <span>$</span>24
      <span>/mo</span>
    </div>
  </div>
  <div>
    <ul class="lists">
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p>
          2 team members
        </p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p>
          100+ components
        </p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p>
          2 month free updates
        </p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p>
          Life time technical support
        </p>
      </li>
    </ul>
  </div>
  <div class="button-container">
    <button type="button">
      Buy Now
    </button>
  </div>
</div>
  )
}

export default PremiumCard