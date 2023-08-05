import Link from 'next/link';
import styles from '@/styles/home/home.module.scss';
import { useMemo } from 'react';

// index.js
export default function Home() {
    const navigationItems = useMemo(() => {
        return [
            ['resume', '/resume'],
            ['portfolio', '/portfolio'],
            ['think', '/think'],
            ['favorite', '/favorite'],
            ['wisdom', '/wisdom'],
            ['toy', '/toy'],
            ['scrum', '/til'],
        ];
    }, []);

    return (
        <div id={styles.home}>
            <div id={styles.left}>
                <div id={styles.navigation}>
                    {navigationItems.map((_item) => {
                        const [_name, _href] = _item;
                        return (
                            <div className={styles.item_name} key={`nav-${_name}`}>
                                <Link href={_href}>
                                    <span>{_name}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id={styles.right}>
                <div id={styles.header}></div>
                <div id={styles.body}>
                    <div className={styles.card}>
                        <a>resume</a>
                    </div>
                    <div className={styles.card}>
                        <a>portfolio</a>
                    </div>
                    <div className={styles.card}>
                        <a>think</a>
                        <span>나의 생각들</span>
                    </div>
                    <div className={styles.card}>
                        <a>favorite</a>
                        <span>취미, 좋아하는 것 등</span>
                    </div>
                    <div className={styles.card}>
                        <a>wisdom</a>
                        <span>TIL 중 저장해두고 싶은 것들</span>
                    </div>
                    <div className={styles.card}>
                        <a>toy</a>
                        <span>내가 공부하거나 재미로 만들어 본 것들</span>
                    </div>
                    <div className={styles.card}>
                        <Link href={'/til'}>
                            <span>til</span>
                            <span>문득 떠오르는 생각, 오늘 배운 것, 메모장 등등의 역할</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
