import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div id='explore-menu' className='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam nostrum numquam odio quibusdam natus beatae earum eveniet accusamus eum optio?</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                //  console.log(item)
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-menu-list-item" key={index}>
                        {/* {console.log(category)} */}
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu