import React from 'react'

export default function Footer() {
  let year = new Date().getFullYear()
  return (
    <>
      <footer className='p-2'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="mb-0 text-center text-white">&copy;{year}.All Rights Reserved By <b><a className='text-decoration-none text-white' href="https://awais-portfolio.vercel.app">Muhammad Awais Mehboob</a></b></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}