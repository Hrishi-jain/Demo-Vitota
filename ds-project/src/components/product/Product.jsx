import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../Home/store/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading/Loading';
import spider from "./s.jpg"



// const [selectedProduct, setSelectedProduct] = useState(null);

const Product = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();



    const addToCart = (item) => {
        if (isLoggedIn) {
            dispatch(add(item));
            toast.success('Item added to cart');
        } else {
            // Redirect to login page or show a login modal
            toast.error('Please log in to add items to your cart');
        }
    }
    
    async function getData(productId) {
        try {
            const response = await axios.get(`http://localhost:5000/user/allProducts/`, 
            {
                params:{productId:productId}
            }
        );
        console.log('Response:', response.data?.product);
        setData(response?.data?.product); // Assuming response.data is a single product object, update the state accordingly
        setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
        console.error("An error occurred:", error.message);
        setError('Error fetching product data');
        setLoading(false); // Set loading to false even if there's an error
    }
}

    useEffect(() => {
        getData();
    }, []);

    const truncateDescription = (description, maxLength) => {
        if (description?.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    }

    const filteredData = data.filter(item => {
        const categoryMatch = categoryFilter === '' || item.category.toLowerCase() === categoryFilter.toLowerCase();
        let priceMatch = true;
        if (priceRangeFilter === '0-100') {
            priceMatch = item.price >= 0 && item.price <= 100;
        } else if (priceRangeFilter === 'above 200') {
            priceMatch = item.price > 200;
        } else if (priceRangeFilter === 'above 300') {
            priceMatch = item.price > 300;
        } else if (priceRangeFilter === 'above 500') {
            priceMatch = item.price > 500;
        } else if (priceRangeFilter === 'above 1000') {
            priceMatch = item.price > 1000;
        }
        const titleMatch = searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && priceMatch && titleMatch;
    });


    // const StarRating = ({ rating }) => {
    //     const stars = [];
    //     for (let i = 0; i < 5; i++) {
    //       if (i < rating) {
    //         stars.push(<span key={i} className="text-yellow-400">&#9733;</span>);
    //       } else {
    //         stars.push(<span key={i} className="text-gray-400">&#9733;</span>);
    //       }
    //     }
    //     return <div className="flex">{stars}</div>;
    //   };

    
    

      
    
    

    

    return (
        <div>
           
            <ToastContainer/>

            <div className="relative  my-20 py-1 ">
    <div className="flex flex-col p-4 border-slate-950 bg-gray-500 fixed left-0 top-0 bottom-0">
        <div className="mb-4 my-24 pt-20">
            <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-2 py-1"
            />
        </div>
        <div className="mb-4">
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded px-2 py-1"
            >
                <option value="">All Categories</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                {/* Add more categories as needed */}
            </select>
        </div>
        <div>
            <select
                value={priceRangeFilter}
                onChange={(e) => setPriceRangeFilter(e.target.value)}
                className="border rounded px-2 py-1"
            >
                <option value="">All Price Ranges</option>
                <option value="0-100">0 - 100</option>
                <option value="above 200">Above 200</option>
                <option value="above 300">Above 300</option>
                <option value="above 500">Above 500</option>
                <option value="above 1000">Above 1000</option>
            </select>
        </div>
    </div>
</div>

            {error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : loading ? (
                <div className='text-center text-5xl bg-pink-100'><Loading /></div>
            ) : (
                <div className="flex justify-end "> 
                <div className="grid grid-cols-1 pl-60 sm:grid-cols-2 gap-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 bg-pink-100">
                    {
                        data.map((item) => (
                            <div key={item.id} className='relative flex flex-col rounded-xl  bg-white shadow-lg overflow-hidden mx-10 my-5'>
                                <Link to={`/product/${item.id}`}>
                                <img src={spider} alt='img' className='w-full h-60 object-cover rounded-t-xl' />
                                    <div className='p-4'>
                                        <h3 className='text-lg font-semibold text-gray-800'>{item.title}</h3>
                                        <p className='text-black mt-2 font-semibold'>Price: RS.{item.price}</p>
                                        <p className='text-black mt-2 font-normal'>Description:{truncateDescription(item.description, 100)}</p>
                                        <h6 className='text-sm font-semibold text-black mt-2'>Category: {item.category}</h6>
                                        {/* <p className='text-black mt-2 font-medium ' >Rating: <StarRating rating={item.rating.rate} /> | In Stock: {item.rating.count}</p> */}
                                    </div>
                                </Link>
                                <button
                                    className='bg-blue-900 text-white py-2 rounded-lg mt-4 hover:bg-blue-500 ' 
                                    onClick={() => addToCart(item)}
                                >
                                    ADD TO CART
                                </button>
                    
                                
                            </div>
                        ))
                    }
                </div>
            </div>
            
            )}
        </div>
        
    );
}

export default Product;
