import styles from '@/styles/home/home.module.scss';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EditPannel from '@/components/EditPannel';
import { deleteBoardById, getBoardList, postBoard } from '@/data/boardApi';
import CommonModal from '../Utils/Common/Modal';
import CommonSelect from '../Utils/Common/Select';
import TextInput from '../Utils/Common/TextInput';
import {
    propertyDatas,
    filterMenus,
    sortMenus,
    sortDropdownMenuDefault,
    filterDropdownMenuDefault,
    dataTableHead,
    growthClassTypes,
    aboutMeClassType,
} from '@/data/data';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const TableSection = ({ tableType }) => {
    const [dataList, setDataList] = useState([]); //all data list
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [clickedItemInfo, setClickedItemInfo] = useState(null);
    const [openAddSortMenuModal, setOpenAddSortMenuModal] = useState(false);
    const [openAddFilterMenuModal, setOpenAddFilterMenuModal] = useState(false);
    const [classifyType, setClassifyType] = useState('all'); //all, store, ...

    const [selectedSortMenus, setSelectedsortMenus] = useState(
        new Map(Object.entries(sortDropdownMenuDefault)),
    );
    const [selectedFilterMenus, setSelectedFilterMenus] = useState(
        new Map(Object.entries(filterDropdownMenuDefault)),
    );

    const dataTableName = useMemo(() => Object.entries(dataTableHead), []);

    const getDataListByTableType = useCallback(
        (newData) => {
            // if (classifyType !== 'all') {
            //     newData = newData.filter((_data) => _data.type === classifyType);
            // }

            switch (tableType) {
                case 'growth': {
                    return (
                        newData?.filter((_data) =>
                            Object.keys(growthClassTypes).includes(_data.type),
                        ) || []
                    );
                }
                case 'aboutme': {
                    return (
                        newData?.filter((_data) =>
                            Object.keys(aboutMeClassType).includes(_data.type),
                        ) || []
                    );
                }
            }
        },
        [tableType],
    );

    const sortDataByNowSorts = useCallback(
        (sortMenus) => {
            const _newList = [...dataList];
            let isNothingSelected = true;

            if (!sortMenus) return;

            sortMenus.forEach((_value, _key) => {
                if (_value.isSelected === true) {
                    isNothingSelected = false;
                    _newList.sort((a, b) => {
                        if (_value.order === 'ascend') {
                            if (a[_key] > b[_key]) return 1;
                            if (a[_key] < b[_key]) return -1;
                            return 0;
                        }
                        if (_value.order === 'descend') {
                            if (a[_key] > b[_key]) return -1;
                            if (a[_key] < b[_key]) return 1;
                            return 0;
                        }
                        return 0;
                    });
                }
            });

            if (isNothingSelected === true) {
                _newList.sort((a, b) => a['id'] - b['id']);
            }

            setDataList(_newList);
        },
        [dataList],
    );

    const filterDataNowFilters = useCallback(
        async (_filterMenus) => {
            //isSelected value type
            const originalDataList = getDataListByTableType(await getBoardList());
            let _newList = [...originalDataList];
            let isNothingSelected = true;

            _filterMenus.forEach((_value, _key) => {
                if (_value.isSelected === false) return;
                isNothingSelected = false;
                // string, num 일 때를 나누어야 함
                if (_value.type === 'contain') {
                    _newList = _newList.filter((v) => {
                        if (
                            typeof v[_key] === 'string' &&
                            v[_key]?.includes?.(_value.value) === true
                        )
                            return true;
                        if (typeof v[_key] === 'number' && v[_key] === Number(_value.value))
                            return true;
                        return false;
                    });
                }
                if (_value.type === 'exclude') {
                    _newList = _newList.filter((v) => v[_key]?.includes?.(_value.value) === false);
                }
            });

            if (isNothingSelected === true) {
                setDataList(originalDataList);
            } else setDataList(_newList);
        },
        [getDataListByTableType],
    );

    // ? data list에서 type에 따라 data를 다르게 보여주기 위해서
    useEffect(() => {
        getBoardList().then((res) => {
            setDataList(getDataListByTableType(res));
        });
    }, [getDataListByTableType]);

    return (
        <>
            <div id={styles.boardTable}>
                {tableType === 'growth' ? (
                    <div className={styles.title}>My Growth</div>
                ) : (
                    <div className={styles.title}>About Me</div>
                )}
                {/* <div className={styles.description}>나는 개발자로서 어떻게 성장하고 있는거니</div> */}
                {/* <div className={styles.types}>
                    {selectTypes.map((e, i) => {
                        return (
                            <div key={`${e}-${i}`} className="" onClick={() => {

                            }}>
                                <span>{e}</span>
                            </div>
                        );
                    })}
                </div> */}
                <div className={styles.graphHandler}>
                    <div className={styles.class}>
                        {/* <div className={styles.key}>
                            <span>분류</span>
                        </div> */}
                        <div className={styles.values}>
                            {tableType === 'growth' &&
                                Object.keys(growthClassTypes).map((_key, _i) => (
                                    <div
                                        className={styles.value}
                                        key={`growth-class-${_i}`}
                                        onClick={() => {
                                            setClassifyType(_key);
                                        }}
                                        data-active={classifyType === _key}
                                    >
                                        {growthClassTypes[_key]}
                                    </div>
                                ))}
                            {tableType === 'aboutme' &&
                                Object.keys(aboutMeClassType).map((_key, _i) => (
                                    <div
                                        className={styles.value}
                                        key={`growth-class-${_i}`}
                                        onClick={() => {
                                            setClassifyType(_key);
                                        }}
                                        data-active={classifyType === _key}
                                    >
                                        {aboutMeClassType[_key]}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={styles.sort}>
                        <div className={styles.key}>
                            <span>정렬</span>
                        </div>
                        {selectedSortMenus &&
                            Array.from(selectedSortMenus.keys()).map((_menu) => {
                                if (selectedSortMenus.get(_menu).isSelected === false)
                                    return <Fragment key={'sort menu' + _menu} />;
                                return <div key={'sort menu' + _menu}>{propertyDatas[_menu]}</div>;
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
                            return (
                                <div className={styles.value} key={'filter menu' + _menu}>
                                    {propertyDatas[_menu]}
                                </div>
                            );
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
                                        <td className={styles.close}>
                                            <button
                                                // className={styles.button}
                                                onClick={async () => {
                                                    await deleteBoardById(growthInfo.id);
                                                    const newData = await getBoardList();
                                                    setDataList(getDataListByTableType(newData));
                                                }}
                                            >
                                                <CloseOutlinedIcon />
                                            </button>
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
                            setDataList(getDataListByTableType(newData));
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
                    propStyle={{ width: '250px' }}
                >
                    <div className={styles.sortMenu}>
                        {Object.entries(sortMenus).map((_data) => {
                            const [_key, _value] = _data;
                            return (
                                <div className={styles.menu} key={`sort-drowdown-menu-${_key}`}>
                                    <div className={styles.nameTag}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedSortMenus.get(_key).isSelected === true
                                            }
                                            onChange={(e) => {
                                                const _newSortMenus = new Map(selectedSortMenus);

                                                _newSortMenus.set(_key, {
                                                    ..._newSortMenus.get(_key),
                                                    isSelected: e.target.checked,
                                                });

                                                setSelectedsortMenus(_newSortMenus);
                                                sortDataByNowSorts(_newSortMenus);
                                            }}
                                        />
                                        <div className={styles.item}>{_value}</div>
                                    </div>
                                    <div className={styles.setter}>
                                        <CommonSelect
                                            value={selectedSortMenus.get(_key)?.order || 'ascend'}
                                            options={[
                                                { ascend: '오름차순' },
                                                { descend: '내림차순' },
                                            ]}
                                            onChange={(e) => {
                                                const _newSortMenus = new Map(selectedSortMenus);

                                                _newSortMenus.set(_key, {
                                                    ..._newSortMenus.get(_key),
                                                    order: e.target.value,
                                                });

                                                setSelectedsortMenus(_newSortMenus);
                                                sortDataByNowSorts(_newSortMenus);
                                            }}
                                            width="100px"
                                        />
                                    </div>
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
                >
                    <div className={styles.filterMenu}>
                        {Object.entries(filterMenus).map((_data) => {
                            const [_key, _value] = _data;
                            return (
                                <div className={styles.menu} key={`filter-menus-${_key}`}>
                                    <div className={styles.nameTag}>
                                        <input
                                            type="checkbox"
                                            checked={selectedFilterMenus.get(_key)?.isSelected}
                                            onChange={(e) => {
                                                const _newFilterMenus = new Map(
                                                    selectedFilterMenus,
                                                );

                                                _newFilterMenus.set(_key, {
                                                    ..._newFilterMenus.get(_key),
                                                    isSelected: e.target.checked,
                                                });

                                                setSelectedFilterMenus(_newFilterMenus);
                                                filterDataNowFilters(_newFilterMenus);
                                            }}
                                        />
                                        <div className={styles.item}>{_value}</div>
                                    </div>
                                    <div className={styles.setter}>
                                        <CommonSelect
                                            value={selectedFilterMenus.get(_key)?.type || 'contain'}
                                            options={[{ contain: '포함' }, { exclude: '제외' }]}
                                            onChange={(e) => {
                                                const _newFilterMenus = new Map(
                                                    selectedFilterMenus,
                                                );

                                                _newFilterMenus.set(_key, {
                                                    ..._newFilterMenus.get(_key),
                                                    type: e.target.value,
                                                });

                                                setSelectedFilterMenus(_newFilterMenus);
                                                filterDataNowFilters(_newFilterMenus);
                                            }}
                                            width="80px"
                                        />
                                        <TextInput
                                            value={selectedFilterMenus?.get(_key)?.value || ''}
                                            onChange={(e) => {
                                                const _newFilterMenus = new Map(
                                                    selectedFilterMenus,
                                                );

                                                _newFilterMenus.set(_key, {
                                                    ..._newFilterMenus.get(_key),
                                                    value: e.target.value,
                                                });

                                                setSelectedFilterMenus(_newFilterMenus);
                                                filterDataNowFilters(_newFilterMenus);
                                            }}
                                        />
                                    </div>
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
