import React from "react";
import Rating from './Rating'

const Product = ({product}) => {
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
            <Rating key={product._id} rating={product.rating} numReviews={product.numReviews}/>
         </div>
         <div className="price">
             ${product.price}
         </div>
     </div>
    
  </div>
}
export default Product;