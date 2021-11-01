import styles from './LoadingSpin.module.css';
import { Spin } from 'antd';
/**
 * Show loading info
 */
const LoadingSpin = (): JSX.Element => {
    return (
        <div className={styles.welcome_box}>
            <div className={styles.align_text_center}>
                <Spin />
                <h3>Anmeldung</h3>
            </div>
        </div>
    );
};

export default LoadingSpin;
