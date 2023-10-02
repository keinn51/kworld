/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/home/home.module.scss';
import { useEffect, useMemo, useState } from 'react';
import TableSection from '@/components/TableSection';
import { getBoardList } from '@/data/boardApi';
import Head from 'next/head';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import SlideAlert from '@/components/Utils/Common/SlideAlert';
import { showSlideAlert } from '@/data/atoms';
import Home from '@/components/Home';

// index.js
export default function Index() {
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
            <RecoilRoot>
                <Home />
            </RecoilRoot>
        </>
    );
}
