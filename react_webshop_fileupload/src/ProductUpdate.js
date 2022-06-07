import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FileUpload } from './FileUpload';[]

function ProductUpdate() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const params = useParams();
    const productId = params.productId;

    useEffect(() => {
        fetch(`https://localhost:44397/GetProduct?productId=${productId}`)
            .then(res => res.json())
            .then(product => { setProduct(product); console.log(product); })
            .catch(console.log);
    }, [productId]);

    return (
        <div className='text-center mt-2'>
            <h5>Update product</h5>

            <form
                onSubmit={e => {
                    // e.persist();
                    e.preventDefault();

                    if (e.target.elements.name.value !== "" &&
                        e.target.elements.description.value !== "" &&
                        e.target.elements.price.value !== ""


                        // e.target.elements.imglink.value
                    ) {

                        // if file is uploaded, use the fileName, otherwise the existing termek.keplink
                        const imglink = localStorage.getItem("fileName") !== "" ? localStorage.getItem("fileName") : product.imglink;
                        console.log(localStorage.getItem("fileName"));
                        console.log(product.imglink);

                        fetch(`https://localhost:44397/UpdateProduct`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                id: productId,
                                name: e.target.elements.name.value,
                                description: e.target.elements.description.value,
                                price: e.target.elements.price.value,

                                // imglink: e.target.elements.imglink.value
                                imglink: imglink
                            })

                        })
                            .then(() => {
                                // alert(`Product '${e.target.elements.name.value}' was added.`);
                                alert(`Product was updated.`);
                                navigate("/update");
                            })
                            .catch(console.log);

                    }
                    else {
                        alert("Fields must be filled out!");
                    }
                }}
            >
                <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Name:</label>
                    <div className='col-sm-9'>
                        <input className='form-control text-center-onsmallscreen' type="text" name="name" defaultValue={product.name} />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Description:</label>
                    <div className='col-sm-9'>
                        <textarea className='form-control text-center-onsmallscreen' rows="4" name="description" defaultValue={product.description} />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Price:</label>
                    <div className='col-sm-9'>
                        <input className='form-control text-center-onsmallscreen' type="number" name="price" defaultValue={product.price} />

                    </div>
                    <div className='col-sm-1 mt-2 margin-minus20'>
                        EUR
                    </div>
                </div>
                {/* <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Image link:</label>
                    <div className='col-sm-9'>
                        <input className='form-control' type="text" name="imglink"  defaultValue={product.imglink} />
                    </div>
                </div> */}
                <div className='mb-2'>
                    <FileUpload />
                </div>
                <div>
                    <button className='btn btn-success mb-2' type='submit'>Update product</button>
                </div>
                <button className='btn btn-info' type='button' onClick={() => { navigate("/update") }}>Back</button>
            </form>
        </div >
    )
}

export default ProductUpdate