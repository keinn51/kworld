import styles from '@/styles/til/til.module.scss';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const MyBlockNoteEditor = dynamic(() => import('@/components/BlockNoteEditor'), { ssr: false });

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
    },
];

export default function Til() {
    const [list, setList] = useState(dummyListItem);
    const [listIdx, setListIdx] = useState(0);
    const [text, setText] = useState('442');

    useEffect(() => {
        setList((_list) => {
            _list[listIdx].value = text;
            return [..._list];
        });
    }, [listIdx, text]);

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
                                setText(list[i].value);
                            }}
                        >
                            <p>{l?.title}</p>
                            <p>{l?.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div id={styles.right_container}>
                <MyBlockNoteEditor
                    id="til_main_text_editor"
                    propValue={text}
                    onChange={(markdown) => {
                        setText(markdown);
                    }}
                    onClose={() => {}}
                />
            </div>
        </div>
    );
}
