import styles from '@/styles/components/LivePage.module.scss';
import { useMemo } from 'react';

const LivePage = ({ title, content }) => {
    return (
        <>
            <div id={styles.livePage}>
                <div id={styles.title}>{title}</div>
                <div id={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <style>{`
                #${styles.content}  .ql-video {
                    width: 500px;
                    height: 250px;
                    display: block;
                    margin: 0 auto;
                `}</style>
        </>
    );
};

export default LivePage;
