import { useRef } from 'react';
import styles from '@/styles/commons/commons.module.scss';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

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
                    <div id={styles.header}>
                        <button
                            id={styles.close}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <CloseOutlinedIcon />
                        </button>
                    </div>
                    <div id={styles.body}>{children}</div>
                    <div id={styles.footer}>
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
