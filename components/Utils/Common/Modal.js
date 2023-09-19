import { useState, useEffect, useMemo, useCallback, useRef, Children } from 'react';
import styles from '@/styles/commons/commons.module.scss';

const CommonModal = (props) => {
    const { children, onClose = () => {}, footerData, propStyle = {} } = props;
    const modalRef = useRef(null);

    return (
        <>
            <div
                className="backgroundLayer"
                onClick={() => {
                    onClose();
                }}
            >
                <div
                    className={styles.modal}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={propStyle}
                >
                    <div className={styles.header}>
                        <div
                            onClick={() => {
                                onClose();
                            }}
                        >
                            x
                        </div>
                    </div>
                    <div className={styles.body}>{children}</div>
                    <div className={styles.footer}>
                        {footerData && (
                            <button onClick={footerData.onClick}>{footerData.title}</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommonModal;
