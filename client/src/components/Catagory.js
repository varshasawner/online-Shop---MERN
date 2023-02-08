import React from 'react';

const Catagory = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error, setError] = React.useState(false);

    const addcatagory = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
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
                <h1>Add Catagory</h1>
                <input type="text" placeholder='Enter product name' className='inputBox'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />

                <button onClick={addcatagory} className='appButton'>Add catagory</button>
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

export default Catagory;