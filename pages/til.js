import styles from '@/styles/til/til.module.scss';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const QuillEditor = dynamic(() => import('@/components/BlockNoteEditor'), {
    ssr: false,
});

const dummyListItem = [
    {
        id: 1,
        title: '꽃 향기만 남기고 갔단다',
        value: '',
        date: '',
        category: '',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
    },
    {
        id: 2,
        title: 'gogogosdkfosdko',
        value: 'ㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇㅇㅇ',
        date: '',
        category: '',
        preview: '',
        isLocked: false,
        link: '',
        tags: '',
    },
];

export default function Til() {
    const [list, setList] = useState(dummyListItem);
    const [listIdx, setListIdx] = useState(0);

    return (
        <div id={styles.til}>
            <div id={styles.left_container}>
                <div id={styles.list}>
                    {list.map((l, i) => (
                        <div
                            className={styles.item}
                            key={`til-list-${i}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setListIdx(i);
                            }}
                        >
                            <p>{l?.title}</p>
                            <p>{l?.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div id={styles.right_container}>
                <QuillEditor
                    id="til_main"
                    value={list[listIdx].value}
                    onChange={(content) => {
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
