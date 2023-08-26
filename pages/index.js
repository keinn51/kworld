import Link from 'next/link';
import styles from '@/styles/home/home.module.scss';
import { useEffect, useMemo, useState } from 'react';
import EditPannel from '@/components/EditPannel';
import Table from '@/components/Table';
import { getBoardList } from '@/data/boardApi';

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

// index.js
export default function Home() {
    useEffect(() => {
        console.log(`getBoardList()`, getBoardList());
    }, []);

    return (
        <div id={styles.home}>
            <div id={styles.header}>
                <div id={styles.welcome}>Welcome To My World</div>
                <div className={styles.description}>안녕하셔유 이경수여유</div>
            </div>
            <div id={styles.body}>
                <Table tableType="growth" />
                <Table tableType="aboutme" />
            </div>
        </div>
    );
}
