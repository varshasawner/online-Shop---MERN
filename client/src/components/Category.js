import React from 'react';

const Category = () => {
    const [catagory_name, setCatagory_name] = React.useState('');
    const [error, setError] = React.useState(false);

    const addcategory = async () => {

        if (!catagory_name) {
            setError(true);
            return false
        }

        const adminId = JSON.parse(localStorage.getItem('admin'))._id;
        let result = await fetch("http://localhost:5000/add-category", {
            method: "post",
            body: JSON.stringify({ catagory_name, adminId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)

    }

    return (
        <div className='catagory'>
            <div className='add'>
                <h1>Add Category</h1>
                <input type="text" placeholder='Enter Category name' className='inputBox'
                    value={catagory_name} onChange={(e) => { setCatagory_name(e.target.value) }}
                />

                <button onClick={addcategory} className='appButton'>Add catagory</button>
            </div>

            <div className='catagoryList'>
                <table border="1" cellPadding="15px">
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Ation</th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Category;