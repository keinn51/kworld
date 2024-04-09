import styles from '@/styles/home/home.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import EditPannel from '@/components/EditPannel';
import { deleteBoardById, getBoardList, postBoard } from '@/data/boardApi';
import { dataTableHead, growthClassTypes, statusClassTyeps } from '@/data/data';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getYearMonthDate } from '@/data/functions';

const TableSection = ({ tableType }) => {
    const [dataList, setDataList] = useState([]); //all data list
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [clickedItemInfo, setClickedItemInfo] = useState(null);
    const [classifyType, setClassifyType] = useState('all'); //all, store, ...
    const dataTableName = useMemo(() => Object.entries(dataTableHead), []);

    const getDataListByTableType = useCallback(
        (newData) => {
            if (classifyType !== 'all') {
                newData = newData.filter((_data) => _data.type === classifyType);
            }

            return newData || [];
        },
        [classifyType],
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
                {/* graph class bar */}
                <div className={styles.graphHandler}>
                    <div className={styles.class}>
                        <div className={styles.values}>
                            {Object.keys(growthClassTypes).map((_key, _i) => (
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
                        </div>
                    </div>
                </div>
                {/* graph contents */}
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
                                            const [_enTitle, _korTitle] = tr;

                                            const _tableValue = (() => {
                                                switch (_enTitle) {
                                                    case 'createdAt':
                                                        return getYearMonthDate(
                                                            new Date(growthInfo[_enTitle]),
                                                        );
                                                    case 'status':
                                                        return statusClassTyeps[
                                                            growthInfo[_enTitle]
                                                        ];
                                                    case 'isLocked':
                                                        if (growthInfo[_enTitle]) return '잠김';
                                                        else return '안잠김';
                                                    default:
                                                        return growthInfo[_enTitle] ?? '';
                                                }
                                            })();

                                            return (
                                                <td
                                                    key={`table-head-${_enTitle}-${tdIdx}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setClickedItemInfo({
                                                            index: listIdx,
                                                        });
                                                        setIsOpenEditModal(true);
                                                    }}
                                                >
                                                    {_tableValue}
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
        </>
    );
};

export default TableSection;
