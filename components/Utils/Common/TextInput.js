import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/commons/commons.module.scss';

const TextInput = ({ ...props }) => {
    const {
        type = 'text',
        className = '',
        value,
        onChange = () => {},
        onFocus = () => {},
        onBlur = () => {},
        onKeyDown = () => {},
        onClick = () => {},
        placeholder = '텍스트 입력',
        minLength = 0,
        maxLength = 100,
        style = {},
        autoFocus = false,
        width = '100px',
        height = '30px',
    } = props;

    const tagOptions = useMemo(
        () => ({
            placeholder,
            type: type,
            value: value,
            style: style,
            onDoubleClick: (e) => {},
            minLength,
            maxLength,
            onFocus: (e) => {
                onFocus(e);
            },
            onChange: (e) => {
                onChange(e);
            },
            onBlur: (e) => {
                onBlur(e);
            },
            onKeyDown: (e) => {
                onKeyDown(e);
            },
            onClick: (e) => {
                onClick(e);
            },
            autoFocus: autoFocus,
        }),
        [
            autoFocus,
            maxLength,
            minLength,
            onBlur,
            onChange,
            onClick,
            onFocus,
            onKeyDown,
            placeholder,
            style,
            type,
            value,
        ],
    );

    return (
        <div className={`${styles.textInput} ${className}`} style={{ height, width }}>
            <input {...tagOptions} />
        </div>
    );
};

export default TextInput;
