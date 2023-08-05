import EditableSpan from '@/components/EditableSpan';
import styles from '@/styles/til/til.module.scss';
import { transHtmlToPureText } from '@/utils/functions/common';
import { formatDateToYYYYMMDD } from '@/utils/functions/date';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';

const QuillEditor = dynamic(() => import('@/components/SnowQuillEditor'), {
    ssr: false,
});

const dummyFetchedData = [
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
    const [list, setList] = useState(dummyFetchedData);
    const [listIdx, setListIdx] = useState(0);
    const targetItemValueChangedToString = useMemo(() => {
        if (!list || !list[listIdx]) return [];
        const newObject = Object.assign({}, list[listIdx]);
        for (let key in newObject) {
            const _value = newObject[key];

            if (typeof _value === 'string') continue;
            else if (_value instanceof Date) newObject[key] = formatDateToYYYYMMDD(newObject[key]);
        }
        return newObject;
    }, [list, listIdx]);

    useEffect(() => {
        console.log(
            `%c ${`targetItemValueChangedToString`}🙏🏻`,
            'color:red',
            targetItemValueChangedToString,
        );
    }, [targetItemValueChangedToString]);

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
                                <span dangerouslySetInnerHTML={{ __html: l?.value }}></span>
                            </div>
                            <div id={styles.category}>
                                <span>{l?.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id={styles.right_container}>
                <div id={styles.infos}>
                    <div id={styles.title}>
                        <EditableSpan
                            value={targetItemValueChangedToString.title}
                            onChange={(e) => {
                                setList((_list) => {
                                    _list[listIdx].title = e.target.value;
                                    return Object.assign([], _list);
                                });
                            }}
                            style={{ fontSize: '18px', fontWeight: 600 }}
                        />
                    </div>
                    {(() => {
                        const filteredKeys = [
                            'id',
                            'title',
                            'value',
                            'preview',
                            'isLocked',
                            'creator',
                            'updator',
                            'isBookMarked',
                        ];
                        const _entries = Object.entries(targetItemValueChangedToString).filter(
                            (_entry) => !filteredKeys.find((_key) => _key === _entry[0]),
                        );

                        return _entries.map((_entry, _i) => (
                            <div className={styles.info} key={_entry[0] + _i}>
                                <div className={styles.key}>
                                    <span>{_entry[0]}</span>
                                </div>
                                <div className={styles.value}>
                                    <span>{_entry[1]}</span>
                                </div>
                            </div>
                        ));
                    })()}
                </div>
                <QuillEditor
                    id="til_main"
                    value={list[listIdx].value}
                    onChange={(content) => {
                        setList((_list, _idx) => {
                            _list[listIdx].value = content;
                            return Object.assign([], _list);
                        });
                    }}
                />
            </div>
        </div>
    );
}
