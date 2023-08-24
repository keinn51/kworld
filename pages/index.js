import Link from 'next/link';
import styles from '@/styles/home/home.module.scss';
import { useEffect, useMemo, useState } from 'react';
import EditPannel from '@/components/EditPannel';

const dummyFetchedData = [
    {
        id: 1,
        type: 'store',
        title: '꽃 향기만 남기고 갔단다',
        value: '<p>123</p>',
        date: '2024-04-04',
        category: '#memo',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: '2024-04-04',
        creatorId: 1,
        creatorName: 'ks',
        updatedAt: '2024-04-04',
        updatorId: 1,
        updatorName: 'ks',
        isBookMarked: false,
        note: '',
    },
    {
        id: 2,
        type: 'til',
        title: 'gogogosdkfosdko',
        value: '<p>312312321</p>',
        date: '2024-04-04',
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: '2024-04-04',
        creatorId: 1,
        creatorName: 'ks',
        updatedAt: '2024-04-04',
        updatorId: 1,
        updatorName: 'ks',
        isBookMarked: false,
        note: '',
    },
    {
        id: 3,
        type: 'toy',
        title: '가격표를 확인 후 쓸어담아',
        value: '<p>sdffsdokfs</p>',
        date: '2024-04-04',
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: '2024-04-04',
        creatorId: 1,
        creatorName: 'ks',
        updatedAt: '2024-04-04',
        updatorId: 1,
        updatorName: 'ks',
        isBookMarked: false,
        note: '',
    },
    {
        id: 4,
        type: 'think',
        title: '다 망가져버려도 joa',
        value: '<p>sdffsdokfs</p>',
        date: '2024-04-04',
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: '2024-04-04',
        creatorId: 1,
        creatorName: 'ks',
        updatedAt: '2024-04-04',
        updatorId: 1,
        updatorName: 'ks',
        isBookMarked: false,
        note: '',
    },
    {
        id: 5,
        type: 'favorite',
        title: '레이디 가가',
        value: '<p>sdffsdokfs</p>',
        date: '2024-04-04',
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: '2024-04-04',
        creatorId: 1,
        creatorName: 'ks',
        updatedAt: '2024-04-04',
        updatorId: 1,
        updatorName: 'ks',
        isBookMarked: false,
        note: '',
    },
    {
        id: 6,
        title: '가격표를 확인 후 쓸어담아',
        value: '<p>sdffsdokfs</p>',
        date: '2024-04-04',
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: '2024-04-04',
        creatorId: 1,
        creatorName: 'ks',
        updatedAt: '2024-04-04',
        updatorId: 1,
        updatorName: 'ks',
        isBookMarked: false,
        note: '',
    },
];

const dataMirror = {
    title: '제목',
    date: '날짜',
    link: '링크',
    tags: '태그',
    status: '상태',
    createdAt: '작성 날짜',
    creatorName: '작성자',
    updatedAt: '갱신 날짜',
    updatorName: '갱신자',
    note: '비고',
};

// index.js
export default function Home() {
    const [growthList, setGrowthList] = useState([]);
    const [aboutmeList, setAboutmeList] = useState([]);
    const growthTypes = ['STORE', 'TIL', 'TOY'];
    const aboutMeTypes = ['think', 'favorite'];
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [clickedItemInfo, setClickedItemInfo] = useState(null);
    const [openAddSortMenuModal, setOpenAddSortMenuModal] = useState(false);
    const [openAddFilterMenuModal, setOpenAddFilterMenuModal] = useState(false);

    const [sortMenus, setSortMenus] = useState([]);
    const [filterMenus, setFilterMenus] = useState([]);

    const [growthTlList, setGrowthTlList] = useState(Object.entries(dataMirror));
    const [aboutmeTlList, setAboutmeTlList] = useState(Object.entries(dataMirror));

    useEffect(() => {
        setGrowthList(
            dummyFetchedData.filter(
                (_data) => _data.type === 'store' || _data.type === 'til' || _data.type === 'toy',
            ),
        );
        setAboutmeList(
            dummyFetchedData.filter((_data) => _data.type === 'think' || _data.type === 'favorite'),
        );
    }, []);

    return (
        <div id={styles.home}>
            <div id={styles.header}>
                <div id={styles.welcome}>Welcome To My World</div>
                <div className={styles.description}>안녕하셔유 이경수여유</div>
            </div>
            <div id={styles.body}>
                <div id={styles.growth}>
                    <div className={styles.title}>My Growth</div>
                    <div className={styles.description}>
                        나는 개발자로서 어떻게 성장하고 있는거니
                    </div>
                    <div className={styles.types}>
                        {growthTypes.map((e, i) => {
                            return (
                                <div key={`${e}-${i}`} className="">
                                    <span>{e}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.graphHandler}>
                        <div className={styles.sort}>
                            <div>
                                <span>sort</span>
                            </div>
                            {sortMenus.map((_menu) => {
                                return <div key={'sort menu' + _menu}>{_menu}</div>;
                            })}
                            <div
                                onClick={() => {
                                    setOpenAddSortMenuModal((old) => !old);
                                }}
                            >
                                <span className={styles.addButton}>+ 정렬 추가</span>
                            </div>
                            {openAddSortMenuModal && (
                                <div className={styles.addMenuModal}>
                                    <div onClick={() => setOpenAddSortMenuModal(false)}>x</div>
                                    <div className={styles.item}>제목</div>
                                    <div className={styles.item}>날짜</div>
                                    <div className={styles.item}>작성 날짜</div>
                                </div>
                            )}
                        </div>
                        <div className={styles.filter}>
                            <div>
                                <span>filter</span>
                            </div>
                            {filterMenus.map((_menu) => {
                                return <div key={'filter menu' + _menu}>{_menu}</div>;
                            })}
                            <div
                                onClick={() => {
                                    setOpenAddFilterMenuModal((old) => !old);
                                }}
                            >
                                <span className={styles.addButton}>+ 필터 추가</span>
                            </div>
                            {openAddFilterMenuModal && (
                                <div className={styles.addMenuModal}>
                                    <div onClick={() => setOpenAddFilterMenuModal(false)}>x</div>
                                    <div className={styles.item}>제목</div>
                                    <div className={styles.item}>날짜</div>
                                    <div className={styles.item}>작성 날짜</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.graphBox}>
                        <table>
                            <thead>
                                <tr>
                                    {growthTlList.map((tr) => {
                                        return <td key={`table-head-${tr[1]}`}>{tr[1]}</td>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {growthList.map((growthInfo, listIdx) => {
                                    return (
                                        <tr key={`grow-info-${growthInfo.id}`}>
                                            {growthTlList.map((tr, tdIdx) => {
                                                return (
                                                    <td
                                                        key={`table-head-${tr[1]}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (tr[0] === 'title') {
                                                                setClickedItemInfo({
                                                                    index: listIdx,
                                                                    type: 'grow',
                                                                });
                                                                setIsOpenEditModal(true);
                                                            }
                                                        }}
                                                    >
                                                        {growthInfo[tr[0]] ?? ''}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id={styles.aboutme}>
                    <div className={styles.title}>About Me</div>
                    <div className={styles.types}>
                        {aboutMeTypes.map((e, i) => {
                            return (
                                <div key={`${e}-${i}`} className="">
                                    <span>{e}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.graphHandler}>
                        <div className={styles.sort}>
                            <span>sort</span>
                        </div>
                        <div className={styles.filter}>
                            <span>filter</span>
                        </div>
                    </div>
                    <div className={styles.graphBox}>
                        <table>
                            <thead>
                                <tr>
                                    {aboutmeTlList.map((tr) => {
                                        return <td key={`table-head-${tr[1]}`}>{tr[1]}</td>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {aboutmeList.map((growthInfo) => {
                                    return (
                                        <tr key={`grow-info-${growthInfo.id}`}>
                                            {aboutmeTlList.map((tr) => {
                                                return (
                                                    <td key={`table-head-${tr[1]}`}>
                                                        {growthInfo[tr[0]] ?? ''}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isOpenEditModal && clickedItemInfo && (
                <EditPannel
                    list={clickedItemInfo.type === 'grow' ? growthList : aboutmeList}
                    setList={clickedItemInfo.type === 'grow' ? setGrowthList : setAboutmeList}
                    listIndex={clickedItemInfo.index}
                    onClose={(info) => {
                        // patch item
                        // get items
                        setClickedItemInfo(null);
                        setIsOpenEditModal(false);
                    }}
                />
            )}
        </div>
    );
}
