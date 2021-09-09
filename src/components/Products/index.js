import React from 'react';
import './style.css';

const Products=(props)=>{
    return(
        <div className="productContainer">
              {
                    props.products.map(product=>{
                        return(
                         <div key={product.id} className='product'>
              
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button onClick={()=>props.buyNow(product.id)}>Buy Now</button>
                         </div>
                            )
                      }
                    )
              }
           
        </div>
    )
}

export default Products