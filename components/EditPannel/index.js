import EditableSpan from '@/components/EditableSpan';
import { updateBoardById } from '@/data/boardApi';
import styles from '@/styles/components/EditPannel.module.scss';
// import { transHtmlToPureText } from '@/utils/functions/common';
import { formatDateToYYYYMMDD } from '@/utils/functions/date';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const QuillEditor = dynamic(() => import('@/components/SnowQuillEditor'), {
    ssr: false,
});

export default function EditPannel(props) {
    const { list, listIndex, setList, onClose } = props;
    const _target = useMemo(() => list[listIndex], [list, listIndex]);
    const [title, setTitle] = useState(_target.title);
    const changedData = useRef(null);

    useEffect(() => {
        console.log(
            `%c 👋🏻 ${`_target data`} 👋🏻`,
            `font-size: 12px;font-family: monospace;background-color: #EAE4D1;display: inline-block;
        color: black;padding: 8px 19px;border: 1px dashed;`,
            _target,
        );

        setTitle(_target.title);
    }, [_target]);

    useEffect(() => {
        changedData.current = { ..._target };
    }, [_target]);

    useEffect(() => {
        return () => {
            console.log(`%c ${`saved!`}🙏🏻`, 'color:orange; font-size:20px;', changedData.current);
            if (changedData.current) updateBoardById(changedData.current.id, changedData.current);
        };
    }, []);

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
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                onBlur={(e) => {
                                    setList((_list) => {
                                        _list[listIndex]['title'] = e.target.value;
                                        _list[listIndex] = Object.assign([], _list[listIndex]);
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
                            const _entries = Object.entries(_target).filter(
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
                                                        _list[listIndex] = Object.assign(
                                                            [],
                                                            _list[listIndex],
                                                        );
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
                        value={_target.value}
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
