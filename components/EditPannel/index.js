import EditableSpan from '@/components/Utils/EditableSpan';
import { updateBoardById } from '@/data/boardApi';
import styles from '@/styles/components/EditPannel.module.scss';
// import { transHtmlToPureText } from '@/utils/functions/common';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropertyBox from './PropertyBox';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import styled from '@emotion/styled';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LivePage from './LivePage';

const QuillEditor = dynamic(() => import('@/components/Utils/SnowQuillEditor'), {
    ssr: false,
});

export default function EditPannel(props) {
    const { list, listIndex, setList, onClose } = props;
    const _target = useMemo(() => list[listIndex], [list, listIndex]);
    const [title, setTitle] = useState(_target.title);
    const [tableContent, setTableContent] = useState(_target.value);
    const [showMode, setShowMode] = useState('edittable'); // published, edittable
    const changedData = useRef(null);

    // _target이 바뀌면 ref도 바꾸어줌
    useEffect(() => {
        console.log(`changed current`, _target);
        changedData.current = { ..._target };
        setTitle(_target.title);
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
                <div id={styles.container}>
                    <div id={styles.header}>
                        <div
                            id={styles.backButton}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <button>
                                <KeyboardDoubleArrowRightIcon />
                            </button>
                        </div>
                        <div id={styles.utilButtons}>
                            <button
                                onClick={() => {
                                    setList((_list) => {
                                        _list[listIndex]['isLocked'] = !_target['isLocked'];
                                        _list[listIndex] = Object.assign({}, _list[listIndex]);
                                        return Object.assign([], _list);
                                    });
                                }}
                            >
                                {_target.isLocked === true ? (
                                    <LockOutlinedIcon />
                                ) : (
                                    <LockOpenOutlinedIcon />
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setList((_list) => {
                                        _list[listIndex]['isBookMarked'] = !_target['isBookMarked'];
                                        _list[listIndex] = Object.assign({}, _list[listIndex]);
                                        return Object.assign([], _list);
                                    });
                                }}
                            >
                                {_target.isBookMarked === true ? (
                                    <BookmarkAddedOutlinedIcon />
                                ) : (
                                    <BookmarkAddOutlinedIcon />
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    switch (showMode) {
                                        case 'published':
                                            setShowMode('edittable');
                                            break;
                                        case 'edittable':
                                            setShowMode('published');
                                            break;
                                    }
                                }}
                            >
                                {showMode === 'published' ? (
                                    <ModeEditOutlineOutlinedIcon />
                                ) : (
                                    <PreviewOutlinedIcon />
                                )}
                            </button>
                        </div>
                    </div>
                    {(() => {
                        switch (showMode) {
                            case 'edittable':
                                return (
                                    <>
                                        <div id={styles.infos}>
                                            <div id={styles.title}>
                                                <EditableSpan
                                                    value={title}
                                                    onChange={(e) => {
                                                        setTitle(e.target.value);
                                                    }}
                                                    onBlur={(e) => {
                                                        setList((_list) => {
                                                            _list[listIndex]['title'] =
                                                                e.target.value;
                                                            _list[listIndex] = Object.assign(
                                                                {},
                                                                _list[listIndex],
                                                            );
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
                                                    'date',
                                                ];
                                                const _entries = Object.entries(_target).filter(
                                                    (_entry) =>
                                                        !filteredKeys.find(
                                                            (_key) => _key === _entry[0],
                                                        ),
                                                );

                                                return _entries.map((_entry, _i) => (
                                                    <PropertyBox
                                                        key={`property-box-${_entry[0]}-${_i}`}
                                                        propertyEntry={_entry}
                                                        list={list}
                                                        listIndex={listIndex}
                                                        setList={setList}
                                                    />
                                                ));
                                            })()}
                                        </div>
                                        <QuillEditor
                                            id="til_main"
                                            value={tableContent}
                                            onChange={(content) => {
                                                console.log(
                                                    `%c ${`content`}🙏🏻`,
                                                    'color:red',
                                                    content,
                                                );
                                                setTableContent(content);
                                            }}
                                            onBlur={(content) => {
                                                console.log(`%c ${`blur`}🙏🏻`, 'color:red', content);
                                                setList((_list) => {
                                                    _list[listIndex]['value'] = content;
                                                    _list[listIndex] = Object.assign(
                                                        {},
                                                        _list[listIndex],
                                                    );
                                                    return Object.assign([], _list);
                                                });
                                            }}
                                        />
                                    </>
                                );
                            case 'published':
                                return <LivePage content={tableContent} />;
                            default:
                                return <></>;
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}
