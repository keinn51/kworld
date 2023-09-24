import { useState } from 'react';
import styles from '@/styles/components/EditableSpan.module.scss';

export default function EditableSpan({
    id = '',
    value = 'empty',
    onChange = () => {},
    onBlur = () => {},
    style = {},
    isBlocked = false,
}) {
    const [isEditting, setIsEditting] = useState(false);

    return (
        <div id={id} className={styles.EditableSpan}>
            {(isEditting === false || isBlocked === true) && (
                <p onClick={() => setIsEditting(true)} style={style}>
                    {value || 'empty'}
                </p>
            )}
            {isEditting === true && isBlocked === false && (
                <input
                    value={value || ''}
                    onChange={onChange}
                    onBlur={(e) => {
                        setIsEditting(false);
                        onBlur(e);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') {
                            setIsEditting(false);
                            onBlur(e);
                        }
                    }}
                    placeholder="enter text"
                    style={style}
                    autoFocus
                ></input>
            )}
        </div>
    );
}
