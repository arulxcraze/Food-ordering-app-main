import React from 'react'
import "./NavBar.css"
import {assets} from "../../assets/assets.js"

const NavBar = () => {
  return (
    
    
    <div className='navbar'>
        {/* {console.log(assets)} */}
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default NavBar