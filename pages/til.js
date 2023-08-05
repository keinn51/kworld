import styles from '@/styles/til/til.module.scss';
import { transHtmlToPureText } from '@/utils/functions/common';
import { formatDateToYYYYMMDD } from '@/utils/functions/date';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const QuillEditor = dynamic(() => import('@/components/SnowQuillEditor'), {
    ssr: false,
});

const dummyListItem = [
    {
        id: 1,
        title: '꽃 향기만 남기고 갔단다',
        value: '<p>123</p>',
        date: new Date(),
        category: '#memo',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: new Date(),
        creator: 1,
        updatedAt: new Date(),
        updator: 1,
        isBookMarked: false,
        note: '',
    },
    {
        id: 2,
        title: 'gogogosdkfosdko',
        value: '<p>312312321</p>',
        date: new Date(),
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: new Date(),
        creator: 1,
        updatedAt: new Date(),
        updator: 1,
        isBookMarked: false,
        note: '',
    },
    {
        id: 3,
        title: '가격표를 확인 후 쓸어담아',
        value: '<p>sdffsdokfs</p>',
        date: new Date(),
        category: '#report',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
        status: 0,
        createdAt: new Date(),
        creator: 1,
        updatedAt: new Date(),
        updator: 1,
        isBookMarked: false,
        note: '',
    },
];

export default function Til() {
    const [list, setList] = useState(dummyListItem);
    const [listIdx, setListIdx] = useState(0);

    useEffect(() => {
        console.log(
            `%c 👋🏻 ${`list data`} 👋🏻`,
            `font-size: 12px;font-family: monospace;background-color: #EAE4D1;display: inline-block;
        color: black;padding: 8px 19px;border: 1px dashed;`,
            list,
        );
    }, [list]);

    return (
        <div id={styles.til}>
            <div id={styles.left_container}>
                <div id={styles.list}>
                    {list.map((l, i) => (
                        <div
                            className={styles.item}
                            data-active={i === listIdx}
                            key={`til-list-${i}`}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                setListIdx(i);
                            }}
                        >
                            <div id={styles.title}>
                                <span>{l?.title}</span>
                            </div>
                            <div id={styles.date_content}>
                                <span>{formatDateToYYYYMMDD(l?.date)}</span>
                                <span>{transHtmlToPureText(l?.value)?.slice(0, 10)}</span>
                            </div>
                            <div id={styles.category}>
                                <span>{l?.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id={styles.right_container}>
                <QuillEditor
                    id="til_main"
                    value={list[listIdx].value}
                    onChange={(content) => {
                        // debugger;
                        setList((_list, _idx) => {
                            _list[listIdx].value = content;
                            return [..._list];
                        });
                    }}
                />
            </div>
        </div>
    );
}
