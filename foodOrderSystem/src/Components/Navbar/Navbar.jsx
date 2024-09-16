import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Contexts/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");
    const handleMenu=(e)=>{
        setMenu(e);
    }

    const {getTotalAmount,token,setToken,url} = useContext(StoreContext);
    const [userData,setUserData] = useState({});
    const fetchUserDetails = async()=>{
        const response = await axios.post(url+"/api/user/display",{},{headers:{token}})
        console.log(response);
        
        if(response.data.success){
            setUserData(response.data.user);
        }
        
    }
    useEffect(()=>{
        if(token){
        fetchUserDetails();
        }
    },[token])
    
    const navigate = useNavigate();
    const logOut =()=>{
        localStorage.removeItem("token");
        setToken("")
        navigate("/")
    }
    
  return (

    <div className='navbar'>
        <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>handleMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>handleMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalAmount()>0?"dot":""}></div>
            </div>
            {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button> : 
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    {/* <li></li>
                    <hr /> */}
                    <li>{userData.email}</li>
                    <hr />
                    <li onClick={()=>navigate('/userorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div>
            }
        </div>
       
    </div>
  )
}

export default Navbar