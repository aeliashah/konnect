import React from 'react'

function Home() {
    return (
        <div className="home">
            <div className="hero-section">
                <h1 className="hero-title">Welcome to Our Blog</h1>
                <p className="hero-description">Explore our wide range of topics from tech to lifestyle and more.</p>
            </div>
            <div className="image-grid">
                <img className="grid-image" src="/p11.jpg" alt="Tech" />
                <img className="grid-image" src="/p22.jpg" alt="Grocery" />
                <img className="grid-image" src="/p33.jpg" alt="Children" />
                <img className="grid-image" src="/p44.jpg" alt="Women" />
                <img className="grid-image" src="/p55.jpg" alt="Men" />
                <img className="grid-image" src="/p66.jpg" alt="Tech" />
                <img className="grid-image" src="/p77.jpg" alt="Grocery" />
            </div>
        </div>
    )
}

export default Home
