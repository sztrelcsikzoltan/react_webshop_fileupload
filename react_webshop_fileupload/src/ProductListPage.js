import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function ProductListPage() {
    const [products, setProducts] = useState([]);
    // localStorage.setItem("global", 1);
    // const global = localStorage.getItem("global");

    useEffect(() => {
        fetch(`https://localhost:44397/GetProducts`)
            .then(res => res.json())
            .then(products => { setProducts(products); console.log(products); })
            .catch(console.log);
    }, []);

    return (
        <div className='text-center mt-2'>
            <h2>Available products </h2>
            {products.map(product => (
                <div className='row border-bottom p-1' key={product.id}>
                    <div className='col-sm-4 align-self-center'>
                        <NavLink to={"/product/" + product.id} >
                            <img className='img-fluid p-2' src={`https://localhost:44397/images/${product.imglink}` ? `https://localhost:44397/images/${product.imglink}` : "https://via.placeholder.com/400x400"} alt={product.name} />
                        </NavLink>
                    </div>
                    <div className='col-sm-2 align-self-center'>
                        <NavLink className="no-decor" to={"/product/" + product.id} >
                            <h5>{product.name}</h5>
                        </NavLink>
                    </div>
                    <div className='col-sm-3 align-self-center small'>
                        <NavLink className="no-decor" to={"/product/" + product.id} >
                            {product.description}
                        </NavLink>
                    </div>
                    <div className='col-sm-1 align-self-center'>
                        <NavLink className="no-decor" to={"/product/" + product.id} >
                            {product.price} EUR
                        </NavLink>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default ProductListPage