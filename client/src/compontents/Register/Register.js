import React from "react";
import styles from './Register.module.css';


function Register() {
    return(
        <div className={styles.login}>
            <div className={styles.formLog}>
                <form action="">
                    <div className={styles.labelLog}>
                        <label>Login</label>
                        <input type="text" className={styles.logowanie}/>
                        <label>Hasło</label>
                        <input type="text" className={styles.logowanie} />
                        <label>Powtórz hasło</label>
                        <input type="text" className={styles.logowanie} />
                        <label>Adres email</label>
                        <input type="email" className={styles.logowanie} />
                        <button>Wyślij</button>
                    </div>


                </form>
            </div>
        </div>
    );

}

export default Register;
