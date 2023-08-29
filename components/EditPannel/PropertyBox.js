import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EditableSpan from '@/components/EditableSpan';
import styles from '@/styles/components/EditPannel.module.scss';

const PropertyBox = ({ propertyEntry, target }) => {
    const _key = useMemo(() => propertyEntry[0], [propertyEntry]);
    const _value = useMemo(() => propertyEntry[1], [propertyEntry]);

    return (
        <div className={styles.info} key={_entry[0] + _i}>
            <div className={styles.key}>
                <span>{_key}</span>
            </div>
            <div className={styles.value}>
                <EditableSpan
                    value={_value}
                    onChange={(e) => {
                        if (_key) {
                            setList((_list) => {
                                target[_key] = e.target.value;
                                target = Object.assign([], target);
                                return Object.assign([], _list);
                            });
                        }
                    }}
                    isBlocked={
                        ['createdAt', 'updatedAt', 'date', 'creatorName', 'updatorName'].find(
                            (_key) => _key === _key,
                        ) !== undefined
                    }
                    style={{ fontSize: '15px' }}
                />
            </div>
        </div>
    );
};

export default PropertyBox;
