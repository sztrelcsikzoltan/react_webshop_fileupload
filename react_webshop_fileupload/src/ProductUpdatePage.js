import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function ProductUpdatePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:44397/GetProducts`)
            .then(res => res.json())
            .then(products => { setProducts(products); console.log(products); })
            .catch(console.log);
    }, []);

    return (
        <div className='text-center mt-2'>
            <h2>Select the product to update: </h2>
            {products.map(product => (
                <div className='row border-bottom' key={product.id}>
                    <div className='col-sm-6'>
                        <NavLink to={"/update/" + product.id} >
                            <img className=' img-fluid p-2' src={`https://localhost:44393/images/${product.imglink}` ? `https://localhost:44397/images/${product.imglink}` : "https://via.placeholder.com/400x400"} alt={product.name} />
                        </NavLink>
                    </div>
                    <div className='col-sm-3 align-self-center'>
                        <h5>{product.name}</h5>
                    </div>
                    <div className='col-sm-2 align-self-center'>{product.price} EUR</div>
                </div >
            ))
            }
        </div >
    )
}

export default ProductUpdatePage