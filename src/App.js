import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import shoesApi from './api/index';
import nike from './assets/nike.png';
import minus from './assets/minus.png';
import check from './assets/check.png';
import plus from './assets/plus.png';
import trash from './assets/trash.png';

function App() {
    const [shoesData, setShoesData] = useState([]);
    let cartItems = []
    const [selectedItems, setSelectedItems] = useState({});

    async function fetchShoesData() {
        try {
            const respone = await shoesApi.getAllShoes();
            setShoesData(respone.data)
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchCartItems() {
        const data = localStorage.getItem("cartItems")
        cartItems = JSON.parse(data) || []
        //console.log(cartItems)
    }

    function addToCart(shoe) {
        if (isInCart(shoe)) {
            return
        }
        let item = JSON.parse(JSON.stringify(shoe))
        item.quantity = 1
        cartItems.push(item)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        fetchShoesData()
    }

    function isInCart(shoe) {
        const data = localStorage.getItem("cartItems")
        cartItems = JSON.parse(data) || []
        if (!cartItems) return false
        return cartItems.some(item => item.shoes_id === shoe.shoes_id)
    }

    function increaseQuantity(item) {
        const data = localStorage.getItem("cartItems")
        cartItems = JSON.parse(data) || []
        const index = cartItems.findIndex(x => x.shoes_id === item.shoes_id)
        cartItems[index].quantity++
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        fetchShoesData()
    }

    function decreaseQuantity(item) {
        const data = localStorage.getItem("cartItems")
        cartItems = JSON.parse(data) || []
        const index = cartItems.findIndex(x => x.shoes_id === item.shoes_id)
        if (cartItems[index].quantity === 1) {
            removeItem(item)
        } else {
            cartItems[index].quantity--
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            fetchShoesData()
        }
    }

    function removeItem(item) {
        const element = document.getElementById(item.shoes_id + "-cart-item")
        element.className="Cart-item-container-remove"
        //setTimeout(() => {
        cartItems = cartItems.filter(x => x.shoes_id !== item.shoes_id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        fetchShoesData()
        //}, 100);
    }

    function totalAmount() {
        let total = 0
        cartItems.forEach(item => {
            total += item.shoes_price * item.quantity
        })
        return (Math.round(total * 100) / 100).toFixed(2)
    }

    useEffect(() => {
        fetchShoesData();
        fetchCartItems();
    }, [])

  return (
    <div className="App">
      <div className="App-card">
        <div className="Card-logo-container">
            <img src={nike} alt='' className='Card-logo' />
        </div>
        <div className="Card-title-container">Our Products</div>
        <div className="Card-body">
            {shoesData.map((shoe) => (
                <div key={shoe.shoes_id} className="Card-body-item">
                    <div className="Item-image-container" style={{backgroundColor: shoe.shoes_color}}>
                        <img src={shoe.shoes_image} alt='' className="Item-image"/>
                    </div>
                    <div className="Item-title">{shoe.shoes_name}</div>
                    <div className="Item-description">{shoe.shoes_description}</div>
                    <div className="Item-bottom">
                        <div className="Item-price">${shoe.shoes_price}</div>
                        {isInCart(shoe) ? 
                            <div className="Item-button Check-button-container">
                                <img src={check} alt='' className="Check-button"/>
                            </div>
                            :
                            <div className="Item-button" onClick={() => {
                                addToCart(shoe)
                            }}><p>ADD TO CART</p></div>
                        }
                        
                    </div>
                </div>
            ))}
        </div>
      </div>
      <div className="App-card">
        <div className="Card-logo-container">
            <img src={nike} alt='' className='Card-logo' />
        </div>
        <div className="Card-title-container">
            Your cart
            <span style={{float: "right"}}>${totalAmount()}</span>
        </div>
        <div className="Card-body">
            {cartItems.length < 1 ? 
                <div className="Card-empty" style={{position: "absolute"}}><p style={{fontSize: 14}}>Your cart is empty</p></div>:
                <div>
                    {cartItems.map((item) => (
                        <div key={item.shoes_id} className="Cart-item-container" id={`${item.shoes_id}-cart-item`}>
                            <div style={{flex: 0}}>
                                <div className="Cart-image-container" style={{backgroundColor: item.shoes_color}}>
                                    <div className="Cart-image-block">
                                        <img src={item.shoes_image} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div style={{flex: 1}}>
                                <div className="Cart-item-title">{item.shoes_name}</div>
                                <div className="Cart-item-price">${item.shoes_price}</div>
                                <div className="Cart-item-action">
                                    <div className="Cart-item-quantity" style={{flex: 1}}>
                                        <div className="Cart-item-count-btn" onClick={() => decreaseQuantity(item)}>-</div>
                                        <div className="Cart-item-count-num">{item.quantity}</div>
                                        <div className="Cart-item-count-btn" onClick={() => increaseQuantity(item)}>+</div>
                                    </div>
                                    <div className="Cart-item-remove"  onClick={() => removeItem(item)}><img src={trash} alt=''/></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
      </div>
    </div>
  );
}

export default App;
