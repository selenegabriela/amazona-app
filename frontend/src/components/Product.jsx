import React from "react";
import { Link } from "react-router-dom";
import Rating from './Rating'

const Product = ({product}) => {
    return <div key={product._id} className='card height'>
    <Link to={`product/${product._id}`}>
      <div className='img'>
         <img className="medium" src={product.image} alt={product.name} />
      </div>
     </Link>
     <div className="card-body">
         <Link to={`product/${product._id}`}>
             <h2>{product.name}</h2>
         </Link>
         <div className="rating">
            <Rating key={product._id} rating={product.rating} numReviews={product.numReviews}/>
         </div>
         <div className="price">
             ${product.price}
         </div>
     </div>
    
  </div>
}

//A coment to prove something
export default Product;