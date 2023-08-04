import styles from '@/styles/til/til.module.scss';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MyBlockNoteEditor = dynamic(() => import('@/components/BlockNoteEditor'), { ssr: false });

export default function Til() {
    const [list, setList] = useState([]);
    const [contents, setContents] = useState('');

    return (
        <div id={styles.til}>
            <div id={styles.left_container}>
                <div id={styles.list}>
                    {list.map((l, i) => (
                        <div key={`list-${i}`}>{l}</div>
                    ))}
                </div>
            </div>
            <div id={styles.right_container}>
                <MyBlockNoteEditor
                    id="til_main_text_editor"
                    onChange={(markdown) => {
                        setContents(markdown);
                    }}
                    onClose={() => {}}
                />
            </div>
        </div>
    );
}
