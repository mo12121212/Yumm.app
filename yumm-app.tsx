import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const YummApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Switzerland'
  });

  const products = {
    burgers: [
      { name: 'Spicy Jalapeno Burger', price: '16.00', img: '/api/placeholder/400/300', description: 'Spicy jalapeños with melted cheese' },
      { name: 'Double XXL Bacon Burger', price: '18.00', img: '/api/placeholder/400/300', description: 'Double patty with crispy bacon' },
      { name: 'Mushroom Swiss Burger', price: '16.00', img: '/api/placeholder/400/300', description: 'Fresh mushrooms with Swiss cheese' },
      { name: 'BBQ Bacon Burger', price: '14.00', img: '/api/placeholder/400/300', description: 'Smoky BBQ sauce with bacon' }
    ],
    pizzas: [
      { name: 'Margherita', price: '12.00', img: '/api/placeholder/400/300', description: 'Classic tomato and mozzarella' },
      { name: 'Quattro Fromaggi', price: '14.00', img: '/api/placeholder/400/300', description: 'Four cheese blend' },
      { name: 'Pepperoni Passion', price: '16.00', img: '/api/placeholder/400/300', description: 'Loaded with spicy pepperoni, mozzarella, and tomato sauce' }
    ],
    sides: [
      { name: 'French Fries', price: '6.00', img: '/api/placeholder/400/300', description: 'Crispy golden fries' },
      { name: 'Chicken Wings (Spicy)', price: '10.00', img: '/api/placeholder/400/300', description: 'Spicy chicken wings' },
      { name: 'Mozzarella Sticks', price: '8.00', img: '/api/placeholder/400/300', description: 'Crispy breaded mozzarella' }
    ],
    drinks: [
      { name: 'Fanta', price: '4.00', img: '/api/placeholder/400/300' },
      { name: 'Sprite', price: '4.00', img: '/api/placeholder/400/300' },
      { name: 'Coke', price: '4.00', img: '/api/placeholder/400/300' }
    ]
  };

  const cartTotal = Object.values(cart).reduce((sum, { product, quantity }) => 
    sum + (parseFloat(product.price) * quantity), 0);

  const addToCart = (product, qty) => {
    setCart(prev => ({
      ...prev,
      [product.name]: {
        product,
        quantity: (prev[product.name]?.quantity || 0) + qty
      }
    }));
    setQuantity(1);
    setSelectedProduct(null);
    setCurrentPage('browse');
  };

  const updateCartQuantity = (productName, newQuantity) => {
    if (newQuantity === 0) {
      const newCart = { ...cart };
      delete newCart[productName];
      setCart(newCart);
    } else {
      setCart(prev => ({
        ...prev,
        [productName]: {
          ...prev[productName],
          quantity: newQuantity
        }
      }));
    }
  };

  if (selectedProduct) {
    if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex items-center p-4 bg-gray-50">
          <button onClick={() => setCurrentPage('cart')} className="hover:text-orange-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold ml-4">Checkout</h1>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">First Name</label>
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    className="w-full p-2 rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block mb-2">Last Name</label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    className="w-full p-2 rounded bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                  className="w-full p-2 rounded bg-gray-50"
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2">Address Line 1</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  className="w-full p-2 rounded bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-2">City</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="w-full p-2 rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    className="w-full p-2 rounded bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2">Country</label>
                <div className="flex items-center p-2 rounded bg-gray-50">
                  <span className="mr-2">🇨🇭</span>
                  <span>Switzerland</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg h-[400px]">
              {/* Placeholder for map */}
              <img
                src="/api/placeholder/800/400"
                alt="Map"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 mt-8">
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-white">
        <header className="flex items-center justify-between p-4 bg-gray-50">
          <button onClick={() => setSelectedProduct(null)} className="hover:text-orange-500">
            <ArrowLeft size={24} />
          </button>
          <div onClick={() => setCurrentPage('cart')} className="relative cursor-pointer">
            <ShoppingCart className="text-orange-500" />
            {Object.keys(cart).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {Object.keys(cart).length}
              </span>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-8">
            <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-96 object-cover rounded-lg" />
          </div>

          <h1 className="text-3xl font-bold mb-2">{selectedProduct.name}</h1>
          <p className="text-2xl font-bold mb-4">{selectedProduct.price} CHF</p>
          <p className="text-gray-600 mb-8">{selectedProduct.description}</p>

          <div className="flex items-center justify-between bg-gray-100 rounded p-2 mb-4">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="p-2">
              <Minus size={20} />
            </button>
            <span className="text-xl">{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)} className="p-2">
              <Plus size={20} />
            </button>
          </div>

          <button
            onClick={() => addToCart(selectedProduct, quantity)}
            className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600"
          >
            Add to Cart
          </button>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.values(products).flat().slice(0, 4).map(product => (
                <div
                  key={product.name}
                  className="bg-gray-50 rounded-lg p-2 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img src={product.img} alt={product.name} className="w-full h-24 object-cover rounded mb-2" />
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-sm">{product.price} CHF</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex justify-between items-center p-4">
          <div className="w-32">
            <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              <text fontSize="75" fontFamily="serif" fill="#3D0C0C" textAnchor="middle" x="110" y="75">Yumm</text>
              <text fontSize="72" fontFamily="serif" fill="#FF6B00" textAnchor="middle" x="110" y="73">Yumm</text>
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentPage('browse')} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Order Now
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-8 relative">
            <div className="space-y-8">
              <div className="rounded-lg overflow-hidden shadow-lg relative h-64">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Burger"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg relative h-64">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Pizza"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
              <h1 className="text-7xl font-bold text-black mb-4">Yumm...</h1>
              <p className="text-2xl text-gray-800 mb-6">Get something good!</p>
              <button onClick={() => setCurrentPage('browse')} className="bg-orange-500 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-orange-600">
                Order Now
              </button>
            </div>

            <div className="space-y-8">
              <div className="rounded-lg overflow-hidden shadow-lg relative h-64">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Onion Rings"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg relative h-64">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Spicy Burger"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'cart') {
    const handleCheckout = () => {
      setCurrentPage('checkout');
    };

    return (
      <div className="min-h-screen bg-white">
        <header className="flex items-center p-4 bg-gray-50">
          <button onClick={() => setCurrentPage('browse')} className="hover:text-orange-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold ml-4">Cart</h1>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {Object.keys(cart).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <ShoppingCart size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <>
              {Object.entries(cart).map(([name, { product, quantity }]) => (
                <div key={name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={product.img} alt={name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{name}</h3>
                      <p>{product.price} CHF</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white rounded">
                      <button onClick={() => updateCartQuantity(name, quantity - 1)} className="px-3 py-1">
                        <Minus size={16} />
                      </button>
                      <span className="px-3">{quantity}</span>
                      <button onClick={() => updateCartQuantity(name, quantity + 1)} className="px-3 py-1">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => updateCartQuantity(name, 0)} className="text-gray-500 hover:text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{cartTotal.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>10.00 CHF</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                  <span>Total</span>
                  <span>{(cartTotal + 10).toFixed(2)} CHF</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 mt-4">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-4 bg-gray-50">
        <div className="w-32">
          <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <text fontSize="75" fontFamily="serif" fill="#3D0C0C" textAnchor="middle" x="110" y="75">Yumm</text>
            <text fontSize="72" fontFamily="serif" fill="#FF6B00" textAnchor="middle" x="110" y="73">Yumm</text>
          </svg>
        </div>
        <div onClick={() => setCurrentPage('cart')} className="relative cursor-pointer">
          <ShoppingCart className="text-orange-500" />
          {Object.keys(cart).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {Object.keys(cart).length}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse</h1>
        {Object.entries(products).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map(product => (
                <div
                  key={product.name}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-600">{product.price} CHF</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YummApp;