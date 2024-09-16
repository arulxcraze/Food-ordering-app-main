import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios"
import { toast } from "react-toastify";

const Add = ({url}) => {

const [image,setImage] = useState(false);
const [data,setData] = useState({
  name:"",
  description:"",
  price:"",
  category:"Salad" //default value
})

const onChangeHandler = (event) =>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}
// useEffect(()=>{
//   console.log(data);
// },[data])

const onSubmitHandler = async(event)=>{
  //we are using post to contact in backend, cause it is asynchronus
  event.preventDefault();
  // FormData - builtin object for keyvalue pairs
  const formData = new FormData();
  formData.append("name",data.name);
  formData.append("description",data.description);
  formData.append("price",Number(data.price));
  formData.append("category",data.category);
  // console.log(data.category);
  
  formData.append("image",image);
  // console.log(formData.get("name"));
  // api
  const response = await axios.post(`${url}/api/food/add`,formData);
  if(response.data.success){
    console.log(response.data.data.category);
    
    setData({
      name:"",
      description:"",
      price:"",
      category:response.data.data.category //back to default values after submission
    })
    setImage(false)
    toast.success(response.data.message);
  }else{
    toast.error(response.data.error);
  }
}

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          {/* lable helps to hide input and make a image to get input . it gets the id of the input element in htmlfor */}
          <label htmlFor="image">
            {/* url createobjectrul is temporary url to display in browser */}
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            {/* {console.log(image)} image stores a object of the file details of the image like its name , updated date,size,time,etc... */}
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" required hidden />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
          onChange={onChangeHandler}
          value={data.description}
            name="description"
            rows={6}
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select size={1} onChange={onChangeHandler} className="scroll-select" name="category">
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
