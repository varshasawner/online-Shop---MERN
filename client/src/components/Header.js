import React from 'react';

const Header = () => {
    const auth = localStorage.getItem('user');
   
    return (
        <div>
           <header>
            <h1>Admin Dashboard</h1>
           </header>

        </div>
    )
}

export default Header;