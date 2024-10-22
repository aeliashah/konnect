import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
export default function Footer() {
  return (
    <div>
      <footer>
        <div class="footer_container">
          {/* <Link>  */}
            <div class="footer_column">
              <Logo />
            </div>
          {/* </Link> */}
          <div class="footer_column">
            <h3>Blogging</h3>

            <a href="#">Men blogs</a>
            <a href="#">Women blogs</a>
            <a href="#">Kids blogs</a>

          </div>

          <div class="footer_column">
            <h3>Blogging</h3>

            <a href="#">Men blogs</a>
            <a href="#">Women blogs</a>
            <a href="#">Kids blogs</a>

          </div>

          <div class="footer_column">
            <h3>Blogging</h3>

            <a href="#">Men blogs</a>
            <a href="#">Women blogs</a>
            <a href="#">Kids blogs</a>

          </div>
        </div>
        <hr />

        <div class="copyright">
          © 2023 www.Konnect.com. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
