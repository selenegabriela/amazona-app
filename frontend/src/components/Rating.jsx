import React from "react";

const Rating = ({rating, numReviews}) => {
    
    return (
        <div className="rating">
            {
                
                [1,2,3,4,5].map((n, i) => {
                    return (rating % 1 !== 0) // First condition 
                    ? (i+1 <= rating) 
                    ? <span key={i}><i className="fa fa-star"></i> </span>
                    : ((i === Math.floor(rating))) 
                    ? <span key={i}><i className="fa fa-star-half-o"></i> </span> 
                    : <span key={i}><i className="fa fa-star-o"></i> </span> 
                    : (i+1 <= rating) 
                    ? <span key={i}><i className="fa fa-star"></i> </span> 
                    : <span key={i}><i className="fa fa-star-o"></i> </span> // First condition
                }) 
            }
            {
                <span>{numReviews} reviews</span>
            }
        </div>
            // The way the teache does it:
            

        //     <div className="rating">
        // <span>
        //     <i
        //     className={
        //         rating >= 1
        //         ? 'fa fa-star'
        //         : rating >= 0.5
        //         ? 'fa fa-star-half-o'
        //         : 'fa fa-star-o'
        //     }
        //     ></i>
        // </span>
        // <span>
        //     <i
        //     className={
        //         rating >= 2
        //         ? 'fa fa-star'
        //         : rating >= 1.5
        //         ? 'fa fa-star-half-o'
        //         : 'fa fa-star-o'
        //     }
        //     ></i>
        // </span>
        // <span>
        //     <i
        //     className={
        //         rating >= 3
        //         ? 'fa fa-star'
        //         : rating >= 2.5
        //         ? 'fa fa-star-half-o'
        //         : 'fa fa-star-o'
        //     }
        //     ></i>
        // </span>
        // <span>
        //     <i
        //     className={
        //         rating >= 4
        //         ? 'fa fa-star'
        //         : rating >= 3.5
        //         ? 'fa fa-star-half-o'
        //         : 'fa fa-star-o'
        //     }
        //     ></i>
        // </span>
        // <span>
        //     <i
        //     className={
        //         rating >= 5
        //         ? 'fa fa-star'
        //         : rating >= 4.5
        //         ? 'fa fa-star-half-o'
        //         : 'fa fa-star-o'
        //     }
        //     ></i>
        // </span>
        // <span>{numReviews + ' reviews'}</span>
        // </div>
        //     </div>
    )
}

export default Rating;