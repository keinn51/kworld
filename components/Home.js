import styles from '@/styles/home/home.module.scss';
import TableSection from '@/components/TableSection';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import SlideAlert from '@/components/Utils/Common/SlideAlert';
import { showSlideAlert } from '@/data/atoms';

const Home = () => {
    const [isAlertOpen, setIsAlertOpen] = useRecoilState(showSlideAlert);

    return (
        <div id={styles.home}>
            <div id={styles.header}>
                <div id={styles.welcome}>Welcome To My World</div>
                <div id={styles.description}>개발자 이경수의 지식창고 입니다.</div>
            </div>
            <div id={styles.body}>
                <TableSection tableType="growth" />
                <TableSection tableType="aboutme" />
            </div>
            <SlideAlert
                open={isAlertOpen}
                text="저장 되었습니다."
                onClose={() => setIsAlertOpen(false)}
                hideduration={1000}
            />
        </div>
    );
};

export default Home;
