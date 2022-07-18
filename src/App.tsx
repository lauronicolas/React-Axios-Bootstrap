// important imports
import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router,Route, Routes }
	from 'react-router-dom';
import {} from 'react-router';
import './App.css';
import Create from './components/products/Create';
import Edit from './components/products/Edit';
import Home from './components/products/Home';
import CreateCategory from './components/categories/Create';
import HomeCategory from './components/categories/Home';

import api from './components/axios'
function App() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  let productsContext = createContext({});
  let categoriesContext = createContext({});

  useEffect(() => {
		api
			.get("/products")
			.then((response) => setProducts(response.data))
    api
			.get("/categories")
			.then((response) => setCategories(response.data))
	}, []);

  return (
    <div className='App'>
        <Router>
          <categoriesContext.Provider value={{categories, setCategories}}>
            <productsContext.Provider value={{products, setProducts}}>
              <Routes >
                <Route path='/' element={<Home productsContext={productsContext}/>} />
                <Route path='/products' element={<Home productsContext={productsContext}/>} />
                <Route path='/products/create' element={<Create productsContext={productsContext} categoriesContext={categoriesContext}/>}/>
                <Route path='/products/edit' element={<Edit productsContext={productsContext} categoriesContext={categoriesContext} />}/>
                <Route path='/categories' element={<HomeCategory categoriesContext={categoriesContext} />}/>
                <Route path='/categories/create' element={<CreateCategory categoriesContext={categoriesContext} />}/>
              </Routes>
            </productsContext.Provider>
          </categoriesContext.Provider>
        </Router>
      </div>
  );

}

export default App;
