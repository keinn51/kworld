/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/home/home.module.scss';
import { useEffect, useMemo, useState } from 'react';
import TableSection from '@/components/TableSection';
import { getBoardList } from '@/data/boardApi';
import Head from 'next/head';

// index.js
export default function Home() {
    useEffect(() => {
        console.log(`getBoardList()`, getBoardList());
    }, []);

    return (
        <>
            <Head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <img
                src="/assets/background_image.png"
                alt="none"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            ></img>
            <div id={styles.home}>
                <div id={styles.header}>
                    <div id={styles.welcome}>Welcome To My World</div>
                    <div id={styles.description}>개발자 이경수의 지식창고 입니다.</div>
                </div>
                <div id={styles.body}>
                    <TableSection tableType="growth" />
                    <TableSection tableType="aboutme" />
                </div>
            </div>
        </>
    );
}
