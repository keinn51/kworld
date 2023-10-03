/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { getBoardList } from '@/data/boardApi';
import Head from 'next/head';
import Home from '@/components/Home';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// index.js
export default function Index() {
    useEffect(() => {
        getBoardList().then((res) => console.log(`getBoardList()`, res));
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
