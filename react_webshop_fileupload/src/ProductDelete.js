import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function ProductDelete() {
    const [product, setProduct] = useState([]);
    const [productPrice, setProductPrice] = useState([]);
    const params = useParams();
    const productId = params.productId;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:44397/GetProduct?productId=${productId}`)
            .then(res => res.json())
            .then(product => { setProduct(product); setProductPrice(product.price + " EUR"); console.log(product); console.log(product.name); })
            .catch(console.log);
    }, [productId]);

    return (
        <div className='text-center m-2'>
            <div>
                <button className='btn btn-info mb-2' onClick={() => { navigate('/delete') }}>Back</button>
            </div>
            <button className='btn btn-danger mb-2' onClick={() => {
                fetch(`https://localhost:44397/DeleteProduct?productId=${productId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                })
                .then(() => {
                    alert("Product was deleted.");
                    navigate("/delete");
                })
            }}>Delete product</button>
            <h5>{product.name}</h5>
            <div className='small text-center' >{product.description}</div>
            <div>{productPrice}</div>
            <img className='img-fluid p-2' src={`https://localhost:44393/images/${product.imglink}` ? `https://localhost:44397/images/${product.imglink}` : "https://via.placeholder.com/400x400"} alt={product.name} />
        </div>
    )
}

export default ProductDelete