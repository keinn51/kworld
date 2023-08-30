import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EditableSpan from '@/components/EditableSpan';
import styles from '@/styles/components/EditPannel.module.scss';

const PropertyBox = ({ propertyEntry, setList, list, listIndex }) => {
    const _key = useMemo(() => propertyEntry[0], [propertyEntry]);
    const [spanValue, setSpanValue] = useState(propertyEntry[1]);

    return (
        <div className={styles.info}>
            <div className={styles.key}>
                <span>{_key}</span>
            </div>
            <div className={styles.value}>
                <EditableSpan
                    value={spanValue}
                    onChange={(e) => {
                        setSpanValue(e.target.value);
                    }}
                    onBlur={(e) => {
                        if (_key) {
                            setList((_list) => {
                                list[listIndex][_key] = e.target.value;
                                list[listIndex] = Object.assign({}, list[listIndex]);
                                return Object.assign([], _list);
                            });
                        }
                    }}
                    isBlocked={[
                        'createdAt',
                        'updatedAt',
                        'date',
                        'creatorName',
                        'updatorName',
                    ].includes(_key)}
                    style={{ fontSize: '15px' }}
                />
            </div>
        </div>
    );
};

export default PropertyBox;
