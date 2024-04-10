import EditableSpan from '@/components/Utils/EditableSpan';
import { updateBoardById } from '@/data/boardApi';
import styles from '@/styles/components/EditPannel.module.scss';
import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';
import PropertyBox from './PropertyBox';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useSetRecoilState } from 'recoil';
import { showSlideAlert } from '@/data/atoms';

const QuillEditor = dynamic(() => import('@/components/Utils/SnowQuillEditor'), {
    ssr: false,
});

export default function EditPannel(props) {
    const { list, listIndex, setList, onClose } = props;
    const _target = useMemo(() => list[listIndex], [list, listIndex]);
    const setIsAlertOpen = useSetRecoilState(showSlideAlert);

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
                id={styles.editBoard}
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
                                className={styles.wordButton}
                                onClick={() => {
                                    setIsAlertOpen(true);
                                    updateBoardById(_target.id, _target);
                                }}
                            >
                                <span>저장하기</span>
                            </button>
                            <button
                                className={styles.wordButton}
                                onClick={() => {
                                    window.open(`/page/${_target.id}`, '_blank');
                                }}
                            >
                                <span>페이지 보기</span>
                            </button>
                        </div>
                    </div>
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
                                    'tags',
                                    'creatorName',
                                    'updatorName',
                                ];
                                const _entries = Object.entries(_target).filter(
                                    (_entry) => !filteredKeys.find((_key) => _key === _entry[0]),
                                );

                                return _entries.map((_entry, _i) => (
                                    <PropertyBox
                                        key={`property-box-${_entry[0]}-${_i}`}
                                        propertyEntry={_entry}
                                        onchangeData={onchangeData}
                                        target={_target}
                                    />
                                ));
                            })()}
                        </div>
                        <div id={styles.editor}>
                            <QuillEditor
                                id="til_main"
                                value={_target.value}
                                onChange={(content) => {
                                    onchangeData('value', content);
                                }}
                            />
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}
