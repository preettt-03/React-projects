import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import styles from "./Signup.module.css"
import InputControl from "../InputControl/InputControl";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
function Signup(){
    const navigate = useNavigate();
    const[values, setValues]=  useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg]= useState("");
    const [submitButtonDisabled , setSubmitButtonDisable] = useState(false);

    const handleSubmission = () => {
        if(!values.name || !values.email || !values.pass){
            setErrorMsg("fill all fields");
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisable(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then((res) => {
            setSubmitButtonDisable(false);
            const user = res.user;
            // await
             updateProfile(user, {
                displayName: values.name,
            });
            navigate("/");
        })
        .catch((err) => {
        setSubmitButtonDisable(false);
        setErrorMsg(err.message);
    });
    };
    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}> Signup</h1>
                <InputControl label="Name" placeholder="Enter your name" onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value}))}  />
                <InputControl label="Email" placeholder="Enter email address" onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value}))}/>
                <InputControl label="Password" placeholder="Enter password" onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value}))}/>

                <div className={styles.footer}>
                     <b className={styles.error}>{errorMsg}</b>
                    <button 
                     onClick={handleSubmission} disabled={submitButtonDisabled}
                    >Signup</button>
                    <p>
                        Already have an Account?{" "}
                        <span>
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Signup;