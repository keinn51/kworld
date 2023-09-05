import Link from 'next/link';
import styles from '@/styles/home/home.module.scss';
import { useEffect, useMemo, useState } from 'react';
import EditPannel from '@/components/EditPannel';
import TableSection from '@/components/TableSection';
import { getBoardList } from '@/data/boardApi';

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
                <TableSection tableType="growth" />
                <TableSection tableType="aboutme" />
            </div>
        </div>
    );
}
