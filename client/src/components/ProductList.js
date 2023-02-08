import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
             <table border="1" cellPadding="15px">
            <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Operation</th>

            </tr>
            {
                products.length>0 ? products.map((item, index) =>
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>
                            <button onClick={() => deleteProduct(item._id)} className="deleteBtn">Delete</button>
                            <Link to={"/update/"+item._id} className="updateBtn">Update </Link>
                            </td>

                    </tr>
                )
                :<h1>No Result Found</h1>
            }
            </table>
            
        </div>
    )
}

export default ProductList;