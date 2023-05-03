import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import MainNavbar from "../components/MainNavbar.jsx";
import EditForm from "../components/EditForm.jsx";

const Edit = () => {
    return (
        <>
            <MainNavbar current={""}/>
            <div style={{paddingTop: '100px'}}>
                <EditForm/>         
            </div>  
        </>
     );
}

export default Edit;