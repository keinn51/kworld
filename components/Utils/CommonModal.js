import { useState, useEffect, useMemo, useCallback, useRef, Children } from 'react';
import styles from '@/styles/components/CommonModal.module.scss';

const CommonModal = (props) => {
    const { children, onClose = () => {}, footerData } = props;
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
                    className={styles.commonModal}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
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
