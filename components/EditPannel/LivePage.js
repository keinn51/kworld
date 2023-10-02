import styles from '@/styles/components/LivePage.module.scss';

const LivePage = ({ content }) => {
    return <div id={styles.livePage} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default LivePage;
