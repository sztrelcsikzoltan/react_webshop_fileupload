import React, { useState } from "react";
// import axios from "axios";

export const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        if (fileName !== undefined) {
            console.log(file);
            const formData = new FormData();
            formData.append("formFile", file);
            formData.append("fileName", fileName);
            try {
                /*
                const res = await axios.post("https://localhost:44397/api/file", formData);
                localStorage.setItem("fileName", fileName);
                console.log(res);
                console.log("fileName: " + localStorage.getItem("fileName"));
                */
                fetch("https://localhost:44397/api/file", {
                    method: "POST",
                    // headers: { "Content-Type": "multipart/form-data" },
                    body: formData
                })
                .then(res => res)
                .then(res => { localStorage.setItem("fileName", fileName); console.log(res); console.log("fileName: " + localStorage.getItem("fileName")); })

            } catch (ex) {
                console.log(ex);
            }
        }
        else {
            alert("Please select the image to be uploaded!");
        }
    };

    return (
        <div>
            <div className="row mb-3">
                <div className="col-sm-2"></div>
                <div className="col-sm-6 mb-2">
                    <input className="form-control" type="file" onChange={saveFile} />
                </div>
                <div className="col-sm-2">
                    <input className="btn btn-secondary mb-2" type="button" value="upload image" onClick={uploadFile} />
                </div>
            </div>

        </div>
    );
};