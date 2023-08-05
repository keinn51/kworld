import { useState } from 'react';
import styles from '@/styles/components/EditableSpan.module.scss';

export default function EditableSpan({
    id = '',
    value = '',
    onChange = () => {},
    onBlur = () => {},
    style = {},
    isBlocked = false,
}) {
    const [isEditting, setIsEditting] = useState(false);

    return (
        <div id={id} className={styles.EditableSpan}>
            {(isEditting === false || isBlocked === true) && (
                <span onDoubleClick={() => setIsEditting(true)} style={style}>
                    {value}
                </span>
            )}
            {isEditting === true && isBlocked === false && (
                <input
                    value={value}
                    onChange={onChange}
                    onBlur={(e) => {
                        setIsEditting(false);
                        onBlur(e);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') setIsEditting(false);
                    }}
                    placeholder="enter text"
                    style={style}
                ></input>
            )}
        </div>
    );
}
