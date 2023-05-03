import MainNavbar from "../components/MainNavbar.jsx";
import CreateForm from "../components/CreateForm.jsx";

const Create = () => {
    return (
        <>
            <MainNavbar current={""}/>
            <div style={{paddingTop: '100px'}}>
                <CreateForm/>
            </div>  
        </>
     );
}

export default Create;