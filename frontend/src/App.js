import React from 'react';
import data from './data';

function App() {
  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">amazona</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign in</a>
                </div>
            </header>
            <main>
               <div className="row center">
                 {
                   data?.products.map((product, i) => {
                     return <div key={product._id} className='card'>
                       <a href="product.html">
                         <div className='img'>
                            <img className="medium" src={product.image} alt={product.name} />
                         </div>
                        </a>
                        <div className="card-body">
                            <a href="product.html">
                                <h2>{product.name}</h2>
                            </a>
                            <div className="rating">
                                <span><i className="fa fa-star"></i> </span>
                                <span><i className="fa fa-star"></i> </span>
                                <span><i className="fa fa-star"></i> </span>
                                <span><i className="fa fa-star-half-o"></i> </span>
                                <span><i className="fa fa-star-o"></i> </span>
                            </div>
                            <div className="price">
                                ${product.price}
                            </div>
                        </div>
                       
                     </div>
                   })
                 }
                   
               </div>
            </main>
            <footer className="row center">All right reserved</footer>
        </div>
  );
}

export default App;
