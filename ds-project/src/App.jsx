import React,{useState, useEffect } from 'react'
import axios from 'axios';
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home'
import About from './components/pages/About'
import Product from './components/product/Product'
import Features from './components/features/Features'
import Portfolio from './components/portfolio/Portfolio'
import All from './components/portfolio/All'
import Register from './components/authentication/Register'
import Log from './components/authentication/Log'
import Blog from './components/blog/Blog'
import Cart from './components/Home/Cart'
import Shop from './components/shop/Shop'
import {Provider} from 'react-redux'
import store from './components/Home/store/store'
import Contact from './components/pages/Contact'
import Faq from './components/pages/Faq'
import LookBook from './components/pages/LookBook'
import SearchBar from './components/pages/SearchBar'
import Productdetails from './components/product/Productdetails'
import Skin from './components/features/Skin';
import Face from './components/features/Face';
import Fragrance from './components/features/Fragrance';
import Eye from './components/features/Eye';
import Lip from './components/features/Lip';
import EyeDetails from './components/features/EyeDetails';
import FaceDetails from './components/features/FaceDetails';
import FragranceDetails from './components/features/FragranceDetails';
import LipDetails from './components/features/LipDetails';
import SkinDetails from './components/features/SkinDetails';
import Loading from './components/loading/Loading';
import Wishlist from './components/pages/Wishlist';
import PremiumFeatures from './components/Home/PremiunFeatures';
import PremiumPriceList from './components/Home/PremiumPriceList';
import Profile from './components/authentication/Profile';



const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await axios.get('https://fakestoreapi.com/products');
              setData(response.data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
          }
      }
      fetchData();
  }, []);
  return (
    <div className='w-full h-screen'>
       <Provider store={store}> 
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/shope' element={<Shop/>}/>
          <Route path='/features' element={<Features/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='portfolio' element={<Portfolio/>}/>
          <Route path='/all' element={<All/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Log/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/lookbook' element={<LookBook/>}/>
          <Route path='/search' element={<SearchBar/>}/>
          <Route path='/product' element={<Product data={data} loading={loading} />}/>
          <Route path='/product/:itemId' element={<Productdetails data={data}/>}/>
          <Route path='/skin' element={<Skin/>}/>
          <Route path='/skin/:productId' element={<SkinDetails/>}/>
          <Route path='/face' element={<Face/>}/>
          <Route path='/face/:productId' element={<FaceDetails/>}/>
          <Route path='/fragrance' element={<Fragrance/>}/>
          <Route path='/fragrance/:productId' element={<FragranceDetails/>}/>
          <Route path='/eyes' element={<Eye/>}/>
          <Route path='/eyes/:productId' element={<EyeDetails/>}/>
          <Route path='/lips' element={<Lip/>}/>
          <Route path='/lips/:productId' element={<LipDetails/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/Pr' element={<PremiumFeatures/>}/>
          <Route path='/Premium' element={<PremiumPriceList/>}/>
          <Route path='/Profile' element={<Profile/>}/>
        </Routes>
        <Footer/>
      </Router>
      </Provider> 
       
      
      
     
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* Your Product component JSX */}
        </div>
      )}
     
    </div>
  )
}

export default App