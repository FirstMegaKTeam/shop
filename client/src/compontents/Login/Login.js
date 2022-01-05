import React from "react";
import styles from './Login.module.css'


function Login() {
    return(
            <div className={styles.login}>
                <div className={styles.formLog}>
                <form action="">
                    <div className={styles.labelLog}>
                    <label>Login</label>
                    <input type="text" className={styles.logowanie}/>
                    <label>Hasło</label>
                    <input type="text" className={styles.logowanie} />
                         <button>Zaloguj</button>
                    </div>
                </form>
                </div>
            </div>
    );

}






  export default Login;
