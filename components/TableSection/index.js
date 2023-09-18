import Link from 'next/link';
import styles from '@/styles/home/home.module.scss';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EditPannel from '@/components/EditPannel';
import { deleteBoardById, getBoardList, postBoard } from '@/data/boardApi';
import CommonModal from '../Utils/Common/Modal';
import CommonSelect from '../Utils/Common/Select';
import TextInput from '../Utils/Common/TextInput';

const dataKeyAndValue = {
    title: '제목',
    date: '날짜',
    link: '링크',
    tags: '태그',
    status: '상태',
    createdAt: '작성 날짜',
    creatorName: '작성자',
    updatedAt: '갱신 날짜',
    updatorName: '갱신자',
    note: '비고',
};

const dataTableHead = {
    title: '제목',
    type: '분류',
    category: '카테고리',
    tags: '태그',
    status: '상태',
    createdAt: '작성 날짜',
    creatorName: '작성자',
    note: '비고',
};

const dropdownMenuDefault = {
    title: { isSelected: false, value: '', type: 'contain' },
    date: { isSelected: false, value: '', type: 'contain' },
    link: { isSelected: false, value: '', type: 'contain' },
    tags: { isSelected: false, value: '', type: 'contain' },
    status: { isSelected: false, value: '', type: 'contain' },
    createdAt: { isSelected: false, value: '', type: 'contain' },
    creatorName: { isSelected: false, value: '', type: 'contain' },
    updatedAt: { isSelected: false, value: '', type: 'contain' },
    updatorName: { isSelected: false, value: '', type: 'contain' },
    note: { isSelected: false, value: '', type: 'contain' },
};

const growthTypes = ['store', 'til', 'toy'];
const aboutMeTypes = ['think', 'favorite'];

const TableSection = ({ tableType }) => {
    const selectTypes = useMemo(
        () => (tableType === 'growth' ? ['STUDY', 'TIL', 'TOY'] : ['THINK', 'FAVORITE']),
        [tableType],
    );
    const [dataList, setDataList] = useState([]); //all data list
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [clickedItemInfo, setClickedItemInfo] = useState(null);
    const [openAddSortMenuModal, setOpenAddSortMenuModal] = useState(false);
    const [openAddFilterMenuModal, setOpenAddFilterMenuModal] = useState(false);

    const [selectedFilterMenus, setSelectedFilterMenus] = useState(
        new Map(Object.entries(dropdownMenuDefault)),
    );

    const [dataTableName, setdtn] = useState(Object.entries(dataTableHead));
    const nowSortStorage = useRef(new Map());
    const nowFilterStorage = useRef(new Map());

    const setDataListByTableType = useCallback(
        (newData) => {
            switch (tableType) {
                case 'growth': {
                    setDataList(newData?.filter((_data) => growthTypes.includes(_data.type)) || []);
                    break;
                }
                case 'aboutme': {
                    setDataList(
                        newData?.filter((_data) => aboutMeTypes.includes(_data.type)) || [],
                    );
                    break;
                }
            }
        },
        [tableType],
    );

    const sortDataByKeyValue = useCallback(
        (_key, _value) => {
            const _newList = [...dataList];

            _newList.sort((a, b) => {
                if (_value === 'ascend') {
                    if (a[_key] > b[_key]) return 1;
                    if (a[_key] < b[_key]) return -1;
                    return 0;
                }
                if (_value === 'descend') {
                    if (a[_key] > b[_key]) return -1;
                    if (a[_key] < b[_key]) return 1;
                    return 0;
                }
                return 0;
            });

            setDataList(_newList);
        },
        [dataList],
    );

    const sortDataByNowSorts = useCallback(() => {
        const _newList = [...dataList];

        if (!nowSortStorage.current) return;

        nowSortStorage.current.forEach((_value, _key) => {
            _newList.sort((a, b) => {
                if (_value === 'ascend') {
                    if (a[_key] > b[_key]) return 1;
                    if (a[_key] < b[_key]) return -1;
                    return 0;
                }
                if (_value === 'descend') {
                    if (a[_key] > b[_key]) return -1;
                    if (a[_key] < b[_key]) return 1;
                    return 0;
                }
                return 0;
            });
        });

        setDataList(_newList);
    }, [dataList]);

    const filterDataByKeyValue = useCallback(
        (_key, _value) => {
            const _newList = [...dataList];

            _newList.filter((_data) => {
                if (_data[_key] === _value) return true;
                if (typeof _data[_key] === 'string' && _data[_key].includes(_value)) return true;
                return false;
            });

            setDataList(_newList);
        },
        [dataList],
    );

    // ? data list에서 type에 따라 data를 다르게 보여주기 위해서
    useEffect(() => {
        getBoardList().then((res) => {
            setDataListByTableType(res);
        });
    }, [setDataListByTableType]);

    return (
        <>
            <div id={styles.boardTable}>
                {tableType === 'growth' ? (
                    <div className={styles.title}>My Growth</div>
                ) : (
                    <div className={styles.title}>About Me</div>
                )}
                {/* <div className={styles.description}>나는 개발자로서 어떻게 성장하고 있는거니</div> */}
                <div className={styles.types}>
                    {selectTypes.map((e, i) => {
                        return (
                            <div key={`${e}-${i}`} className="">
                                <span>{e}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.graphHandler}>
                    <div className={styles.sort}>
                        <div className={styles.key}>
                            <span>정렬</span>
                        </div>
                        {nowSortStorage.current &&
                            Array.from(nowSortStorage.current.keys()).map((_menu) => {
                                if (nowSortStorage.current.get(_menu) === null)
                                    return <Fragment key={'sort menu' + _menu} />;
                                return (
                                    <div key={'sort menu' + _menu}>{dataKeyAndValue[_menu]}</div>
                                );
                            })}
                        <div
                            className={styles.addButton}
                            onClick={() => {
                                setOpenAddSortMenuModal((old) => !old);
                            }}
                        >
                            <span>+ 정렬 추가</span>
                        </div>
                    </div>
                    <div className={styles.filter}>
                        <div className={styles.key}>
                            <span>필터</span>
                        </div>
                        {Array.from(selectedFilterMenus.keys()).map((_menu) => {
                            if (selectedFilterMenus.get(_menu).isSelected === false)
                                return <Fragment key={'filter menu' + _menu} />;
                            return <div key={'filter menu' + _menu}>{dataKeyAndValue[_menu]}</div>;
                        })}
                        <div
                            className={styles.addButton}
                            onClick={() => {
                                setOpenAddFilterMenuModal((old) => !old);
                            }}
                        >
                            <span>+ 필터 추가</span>
                        </div>
                    </div>
                </div>
                <div className={styles.graphBox}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td></td>
                                {dataTableName.map((tr) => {
                                    return <td key={`table-head-${tr[1]}`}>{tr[1]}</td>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((growthInfo, listIdx) => {
                                return (
                                    <tr key={`grow-info-${growthInfo.id}`}>
                                        <td
                                            onClick={async () => {
                                                await deleteBoardById(growthInfo.id);
                                                const newData = await getBoardList();
                                                setDataListByTableType(newData);
                                            }}
                                        >
                                            X
                                        </td>
                                        {dataTableName.map((tr, tdIdx) => {
                                            return (
                                                <td
                                                    key={`table-head-${tr[1]}-${tdIdx}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (tr[0] === 'title') {
                                                            setClickedItemInfo({
                                                                index: listIdx,
                                                            });
                                                            setIsOpenEditModal(true);
                                                        }
                                                    }}
                                                >
                                                    {growthInfo[tr[0]] ?? ''}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div
                        className={styles.addListButton}
                        onClick={async () => {
                            const defaultType = tableType === 'growth' ? 'store' : 'think';
                            await postBoard({ type: defaultType });
                            const newData = await getBoardList();
                            setDataListByTableType(newData);
                        }}
                    >
                        <span>+ 새로 만들기</span>
                    </div>
                </div>
            </div>
            {isOpenEditModal && clickedItemInfo && (
                <EditPannel
                    list={dataList}
                    setList={setDataList}
                    listIndex={clickedItemInfo.index}
                    onClose={(info) => {
                        setClickedItemInfo(null);
                        setIsOpenEditModal(false);
                    }}
                />
            )}
            {openAddSortMenuModal && (
                <CommonModal
                    onClose={() => {
                        setOpenAddSortMenuModal(false);
                    }}
                    footerData={{ title: '저장하기', onClick: () => {} }}
                >
                    <div>
                        {Object.entries(dataKeyAndValue).map((_data) => {
                            const [_key, _value] = _data;

                            return (
                                <div
                                    key={`sort-drowdown-menu-${_key}`}
                                    className={styles.item}
                                    onClick={(e) => {
                                        if (nowSortStorage.current) {
                                            nowSortStorage.current.set(_key, 'ascend');
                                        }
                                        sortDataByKeyValue(_key, 'ascend');
                                    }}
                                >
                                    {_value}
                                </div>
                            );
                        })}
                    </div>
                </CommonModal>
            )}
            {openAddFilterMenuModal && (
                <CommonModal
                    onClose={() => {
                        setOpenAddFilterMenuModal(false);
                    }}
                    footerData={{ title: '저장하기', onClick: () => {} }}
                >
                    <div>
                        {Object.entries(dataKeyAndValue).map((_data) => {
                            const [_key, _value] = _data;
                            return (
                                <div className={styles.filterMenu} key={`filter-menus-${_key}`}>
                                    <input type="checkbox"></input>
                                    <div
                                        className={styles.item}
                                        onClick={() => {
                                            setSelectedFilterMenus((old) => {
                                                old.set(_key, {
                                                    isSelected: true,
                                                    value: '',
                                                    type: 'contain',
                                                });
                                                return new Map(old);
                                            });
                                        }}
                                    >
                                        {_value}
                                    </div>
                                    <CommonSelect
                                        value={selectedFilterMenus.get(_key)?.type || 'contain'}
                                        options={[{ contain: '포함' }, { exclude: '제외' }]}
                                        onChange={(e) => {
                                            setSelectedFilterMenus((old) => {
                                                console.log(e.target.value);
                                                old.set(_key, {
                                                    ...selectedFilterMenus.get(_key),
                                                    type: e.target.value,
                                                });
                                                return new Map(old);
                                            });
                                        }}
                                        width="50px"
                                    />
                                    <TextInput />
                                </div>
                            );
                        })}
                    </div>
                </CommonModal>
            )}
        </>
    );
};

export default TableSection;
