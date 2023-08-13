import EditableSpan from '@/components/EditableSpan';
import styles from '@/styles/components/EditPannel.module.scss';
// import { transHtmlToPureText } from '@/utils/functions/common';
import { formatDateToYYYYMMDD } from '@/utils/functions/date';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';

const QuillEditor = dynamic(() => import('@/components/SnowQuillEditor'), {
    ssr: false,
});

export default function EditPannel(props) {
    const { list, listIndex, setList, onClose } = props;

    useEffect(() => {
        console.log(
            `%c 👋🏻 ${`list[listIndex] data`} 👋🏻`,
            `font-size: 12px;font-family: monospace;background-color: #EAE4D1;display: inline-block;
        color: black;padding: 8px 19px;border: 1px dashed;`,
            list[listIndex],
        );
    }, [list[listIndex]]);

    return (
        <div
            className="backgroundLayer"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div
                id={styles.til}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div id={styles.right_container}>
                    <div id={styles.infos}>
                        <div id={styles.title}>
                            <EditableSpan
                                value={list[listIndex].title}
                                onChange={(e) => {
                                    setList((_list) => {
                                        _list[listIndex]['title'] = e.target.value;
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
                                'creatorId',
                                'updatorId',
                                'isBookMarked',
                            ];
                            const _entries = Object.entries(list[listIndex]).filter(
                                (_entry) => !filteredKeys.find((_key) => _key === _entry[0]),
                            );

                            return _entries.map((_entry, _i) => (
                                <div className={styles.info} key={_entry[0] + _i}>
                                    <div className={styles.key}>
                                        <span>{_entry[0]}</span>
                                    </div>
                                    <div className={styles.value}>
                                        <EditableSpan
                                            value={_entry[1]}
                                            onChange={(e) => {
                                                if (_entry[0]) {
                                                    setList((_list) => {
                                                        _list[listIndex][_entry[0]] =
                                                            e.target.value;
                                                        return Object.assign([], _list);
                                                    });
                                                }
                                            }}
                                            isBlocked={
                                                [
                                                    'createdAt',
                                                    'updatedAt',
                                                    'date',
                                                    'creatorName',
                                                    'updatorName',
                                                ].find((_key) => _key === _entry[0]) !== undefined
                                            }
                                            style={{ fontSize: '15px' }}
                                        />
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                    <QuillEditor
                        id="til_main"
                        value={list[listIndex].value}
                        onChange={(content) => {
                            setList((_list) => {
                                _list[listIndex]['value'] = content;
                                return Object.assign([], _list);
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
