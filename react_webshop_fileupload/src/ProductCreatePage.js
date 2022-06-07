import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileUpload } from './FileUpload';


function ProductCreatePage() {
    const navigate = useNavigate();

    return (
        <div className='text-center mt-2'>
            <h5>Add new product</h5>

            <form
                onSubmit={e => {
                    // e.persist();
                    e.preventDefault();

                    if (e.target.elements.name.value != "" &&
                        e.target.elements.price.value != "" &&
                        // e.target.elements.imglink.value

                        localStorage.getItem("fileName") !== null
                    ) {

                        fetch(`https://localhost:44397/Images/${localStorage.getItem("fileName")}`)
                            .then(res => res)
                            .then(res => {
                                if (res.ok) { // if file is uploaded             
                                    fetch(`https://localhost:44397/AddProduct`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            name: e.target.elements.name.value,
                                            description: e.target.elements.description.value,
                                            price: e.target.elements.price.value,
                                            // imglink: e.target.elements.imglink.value

                                            imglink: localStorage.getItem("fileName")
                                        })
                                    })
                                        .then(() => {
                                            alert(`Product was added.`);
                                            localStorage.setItem("fileName", "");
                                            navigate("/");
                                        })
                                        .catch(console.log);
                                }
                                else {
                                    alert("the image must be first uploaded!");
                                }
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
                        <input className='form-control' type="text" name="name" />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Description:</label>
                    <div className='col-sm-9'>
                        <textarea className='form-control' rows="4" name="description" />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Price:</label>
                    <div className='col-sm-9'>
                        <input className='form-control' type="number" name="price" />
                    </div>
                </div>
                {/* <div className='row mb-3'>
                    <label className='col-sm-2 mt-2'>Image link:</label>
                    <div className='col-sm-9'>
                        <input className='form-control' type="text" name="imglink" />
                    </div>
                </div> */}
                <div className='mb-2'>
                    <FileUpload />
                </div>
                <div>
                    <button className='btn btn-success mb-2' type='submit'>Add product</button>
                </div>
                <button className='btn btn-info' type='button' onClick={() => { navigate("/") }}>Back</button>
            </form>
        </div >
    )
}

export default ProductCreatePage