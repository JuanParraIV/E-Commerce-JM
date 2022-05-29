import React from 'react'
import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p classnames='beats-solo'>SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <img src="" alt="headphones" className='hero-banner-image'/>

        <div>
          <Link href='/products/ID'>
            <button type="button">BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>description</h5>
            <p>description</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
