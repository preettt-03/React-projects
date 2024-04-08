import React, {useState} from "react";
import { Link , useNavigate ,Navigate} from "react-router-dom";
import styles from "./Login.module.css"
import InputControl from "../InputControl/InputControl";
import { auth , provider } from "../../firebase";
import{  signInWithEmailAndPassword , signInWithPopup } from "firebase/auth";
import { ExpenseTracker } from "../ExpenseTracker/ExpenseTracker";
import { useGetTransactions } from "../../hooks/useGetTransactions";
function Login(){
    const navigate = useNavigate();
    const[values, setValues]=  useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg]= useState("");
    const [submitButtonDisabled , setSubmitButtonDisable] = useState(false);

    const handleSubmission = () => {
        if(!values.email || !values.pass){
            setErrorMsg("fill all fields");
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisable(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
            setSubmitButtonDisable(false);
            navigate("/");
        })
        .catch((err) => {
        setSubmitButtonDisable(false);
        setErrorMsg(err.message);
    });
    };
    const { isAuth} = userGetUserInfo();
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userId : results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expenseTracker");
        if(isAuth){
            return <Navigate to="/expenseTracker" />
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Login</h1>
                <InputControl label="Email" 
                onChange={(event)=>
                setValues((prev) => ({ ...prev, email: event.target.value
                }))
                }
                placeholder="Enter email address" />
                <InputControl label="Password" 
                onChange={(event)=>
                setValues((prev) => ({ ...prev, pass: event.target.value
                }))
                }
                placeholder="Enter password" />

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button disabled={submitButtonDisabled} onClick={handleSubmission}>login</button>
                    <p>
                      Don't have an account?{" "}
                        <span>
                            <Link to="/signup">Sign Up</Link>
                        </span>
                        
                    </p>
                    <button onClick={signInWithGoogle}>
                        {" "}
                        Sign In With Google
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login;