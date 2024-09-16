import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList]=useState([]);

    const fetchUserName = async()=>{
        const response = await axios.get()
    }

    // console.log(token);
    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) =>{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
            if(token){
                await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            }
    }

    const getTotalAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                    let foodInfo = food_list.find((products)=>products._id===item);
                    totalAmount += foodInfo.price * cartItems[item];
                }
        }
        return totalAmount;        
    };

    const fetchFoodList = async() =>{
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }   

    useEffect(()=>{
    
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue = {
        /* an object */
        food_list,
        addToCart,
        cartItems,
        setCartItems,
        removeFromCart,
        getTotalAmount,
        url,
        setToken,token
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}
export default StoreContextProvider;
