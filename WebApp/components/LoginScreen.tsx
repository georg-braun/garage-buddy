import styles from './LoginScreen.module.css';

/**
 * User should login
 */
const LoginScreen = (): JSX.Element => {
    return (
        <div className={styles.welcome_box}>
            <div className={styles.align_text_center}>
                <h1>Schlemmerservice</h1>
                <a href="/api/auth/login">Login</a>
            </div>
            <div className={styles.login_button_center}></div>
        </div>
    );
};

export default LoginScreen;
