import React from 'react';
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {

        if(!name || !price || !company || !category)
        {
            setError(true);
            return false
        }

        const adminId = JSON.parse(localStorage.getItem('admin'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, adminId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)
        if(result){
            navigate("/")
        }

    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <select className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }}>
                <option value="">Select Category</option>
                <option value="Furniture">Furniture</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Electronic">Electronic</option>
            </select>
            {error && !category && <span className='invalid-input'>Enter valid category</span>} 

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;