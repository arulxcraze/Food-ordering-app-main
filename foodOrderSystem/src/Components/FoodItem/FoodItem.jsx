import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../Contexts/StoreContext";

const FoodItem = ({ id, name, image, price, description, category }) => {
  // const[itemCount,setItemCount] = useState(0);
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* {console.log(image)} */}
        <img src={url+"/images/"+image} className="food-item-img" alt="" />
        {
          !cartItems[id] ?
          <img src={assets.add_icon_white} onClick={()=>addToCart(id)} className="add" /> :
          <div className="food-item-counter"> 
            <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} className="remove" />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={()=>addToCart(id)} className="green-add" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
          <img
            className="food-item-rating-starts"
            src={assets.rating_starts}
            alt=""
          />
        </div>
        <div className="food-item-desc">{description}</div>
        <div className="food-item-price">${price}</div>
      </div>
    </div>
  );
};

export default FoodItem;
