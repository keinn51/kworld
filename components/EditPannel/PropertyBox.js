import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EditableSpan from '@/components/Utils/EditableSpan';
import styles from '@/styles/components/EditPannel.module.scss';
import { growthClassTypes, growthSelectTypes, propertyDatas, statusSelectTyeps } from '@/data/data';
import { getYearMonthDate } from '@/data/functions';
import CommonSelect from '../Utils/Common/Select';

const PropertyBox = ({ propertyEntry, onchangeData, target }) => {
    const _key = useMemo(() => propertyEntry[0], [propertyEntry]);
    const _value = useMemo(() => propertyEntry[1], [propertyEntry]);
    const [spanValue, setSpanValue] = useState(propertyEntry[1]);

    console.log(_key);

    return (
        <div className={styles.info}>
            <div className={styles.key}>
                <span>{propertyDatas[_key]}</span>
            </div>
            <div className={styles.value} data-edittable={['note'].includes(_key)}>
                {['note'].includes(_key) && (
                    <EditableSpan
                        value={spanValue}
                        onChange={(e) => {
                            setSpanValue(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (_key) {
                                onchangeData(_key, e.target.value);
                            }
                        }}
                        isBlocked={['link'].includes(_key)}
                        style={{ fontSize: '15px' }}
                    />
                )}
                {['createdAt', 'updatedAt'].includes(_key) && (
                    <span>{getYearMonthDate(new Date(_value))}</span>
                )}
                {['link'].includes(_key) && (
                    <span>{`${window.location.href}page/${target.id}`}</span>
                )}
                {['type'].includes(_key) && (
                    <CommonSelect
                        value={_value}
                        onChange={(e) => {
                            onchangeData(_key, e.target.value);
                        }}
                        options={growthSelectTypes}
                    />
                )}
                {['status'].includes(_key) && (
                    <CommonSelect
                        value={_value}
                        onChange={(e) => {
                            onchangeData(_key, e.target.value);
                        }}
                        options={statusSelectTyeps}
                    />
                )}
            </div>
        </div>
    );
};

export default PropertyBox;
