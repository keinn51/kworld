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
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import LivePage from './LivePage';
import SlideAlert from '../Utils/Common/SlideAlert';

const QuillEditor = dynamic(() => import('@/components/Utils/SnowQuillEditor'), {
    ssr: false,
});

export default function EditPannel(props) {
    const { list, listIndex, setList, onClose } = props;
    const _target = useMemo(() => list[listIndex], [list, listIndex]);
    const [showMode, setShowMode] = useState('edittable'); // published, edittable
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const onchangeData = useCallback(
        (_key, _value) => {
            setList((_list) => {
                _list[listIndex][_key] = _value;
                _list[listIndex] = Object.assign({}, _list[listIndex]);
                return Object.assign([], _list);
            });
        },
        [listIndex, setList],
    );

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
                                    setIsAlertOpen(true);
                                    updateBoardById(_target.id, _target);
                                }}
                            >
                                <SaveIcon />
                            </button>
                            <button
                                onClick={() => {
                                    onchangeData('isLocked', !_target['isLocked']);
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
                                    onchangeData('isBookMarked', !_target['isBookMarked']);
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
                                                    value={_target.title}
                                                    onChange={(e) => {
                                                        onchangeData('title', e.target.value);
                                                    }}
                                                    onBlur={(e) => {
                                                        onchangeData('title', e.target.value);
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
                                        <div id={styles.editor}>
                                            <QuillEditor
                                                id="til_main"
                                                value={_target.value}
                                                onChange={(content) => {
                                                    console.log(
                                                        `%c ${`quill change text`}🙏🏻`,
                                                        'color:red',
                                                        content,
                                                    );
                                                    onchangeData('value', content);
                                                }}
                                            />
                                        </div>
                                    </>
                                );
                            case 'published':
                                return <LivePage title={_target.title} content={_target.value} />;
                            default:
                                return <></>;
                        }
                    })()}
                </div>
            </div>
            <SlideAlert
                open={isAlertOpen}
                text="저장 되었습니다."
                onClose={() => setIsAlertOpen(false)}
                hideduration={1000}
            />
        </div>
    );
}
