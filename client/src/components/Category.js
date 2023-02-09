import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const navigate = useNavigate();
    const [category_name, setCategory_name] = useState('');
    const [error, setError] = useState(false);

    // -------------------Table Logic----------------------------------------------------------

    const [category, setCategory] = useState([]);
    const [categorySearch, setCategorySearch] = useState([]);

    useEffect(() => {
        getCategoryData();
    }, [category]);

    const getCategoryData = async () => {
        let result = await fetch('http://localhost:5000/category', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setCategory(result);
    }

    // ----------------------------------------------------------------------------------------

    const addcategory = async () => {

        if (!category_name) {
            setError(true);
            return false
        }

        const adminId = JSON.parse(localStorage.getItem('admin'))._id;
        let result = await fetch("http://localhost:5000/add-category", {
            method: "post",
            body: JSON.stringify({ category_name, adminId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.log(result)
    }

    const deleteCategory = async (id) => {
        console.log(id);
        const confirmation = window.confirm("Are You Sure ? You want to Delete This Category !");
        if (confirmation) {
            let result = await fetch(`http://localhost:5000/category/${id}`, {
                method: "Delete"
            });
            result = await result.json();
            if (result) {
                getCategoryData();
            }
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/searchCategory/${key}`);
            result = await result.json()
            if(result){
                // console.log(result);
                setCategorySearch(result)
            }
        }else{
            getCategoryData();
        }
    }

    return (
        <div className='catagory'>
            <div className='add'>
                <h1>Add Category</h1>
                <input type="text" placeholder='Enter Category name' className='inputBox'
                    value={category_name} onChange={(e) => { setCategory_name(e.target.value) }}
                />
                 {error && !category_name && <span className='invalid-input'>Enter valid category Name</span>}

                <button onClick={addcategory} className='appButton'>Add Category</button>
            </div>

            <div className='catagoryList'>
                <h1 align="center">Category List</h1>
                <input type="text" className='search-product-box' placeholder='Search Category'
                    onChange={searchHandle}
                />

                <table border="1" cellPadding="15px">
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Ation</th>
                    </tr>
                    {
                        category.length > 0 ? category.map((item, index) =>
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.category_name}</td>
                                <td>
                                    <button onClick={() => deleteCategory(item._id)} className="deleteBtn">Delete</button>
                                </td>
                            </tr>
                        )
                            : <h2>No Result Found</h2>
                    }
                </table>
            </div>
        </div>
    )
}

export default Category;