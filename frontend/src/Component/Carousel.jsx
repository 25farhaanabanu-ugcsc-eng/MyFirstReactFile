import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src="dress1.png" className="d-block w-100" alt="Fancy Dress"></img>
      <div className="carousel-caption d-none d-md-block">
        <h5>Womens Fancy Dresses</h5>
        <p>Wear Confidence. Wear StyleAura..</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="dress2.png" className="d-block w-100" alt="Classy Shirts"></img>
      <div className="carousel-caption d-none d-md-block">
        <h5>Men Shirts</h5>
        <p>Elevate Your Style, Gentlemen!.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="dress3.png" className="d-block w-100" alt="Kids Wear"></img>
      <div className="carousel-caption d-none d-md-block">
        <h5>Kids Wear</h5>
        <p>Little Stars, Big Style!.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
