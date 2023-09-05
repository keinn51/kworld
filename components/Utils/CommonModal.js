import { useState, useEffect, useMemo, useCallback, useRef, Children } from 'react';
import styles from '@/styles/components/CommonModal.module.scss';

const CommonModal = (props) => {
    const { children } = props;
    const modalRef = useRef(null);

    return (
        <>
            <div className="backgroundLayer"></div>
            <div className={styles.commonModal}></div>
        </>
    );
};

export default CommonModal;
