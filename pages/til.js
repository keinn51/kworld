import '@/styles/global/global.scss';
import styles from '@/styles/til/til.module.scss';

export default function Til() {
    return (
        <div id={styles.til}>
            <div id={styles.left_container}></div>
            <div id={styles.right_container}></div>
        </div>
    );
}
