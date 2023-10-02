import React, { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import IconInfo from '@mui/icons-material/Info';
import IconCheck from '@mui/icons-material/CheckCircle';
import IconError from '@mui/icons-material/Error';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert className="filledInfo" elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionLeft = (props) => {
    return <Slide {...props} direction={'left'} />;
};
const TransitionDown = (props) => {
    return <Slide {...props} direction={'down'} />;
};

const SlideAlert = ({ ...props }) => {
    const {
        text = '',
        sx = {},
        open = false,
        hideduration = 3000,
        anchorOrigin = ['top', 'right'],
        transition = 'left',
        onClose = () => {},
        type = 'success',
    } = props;

    const getIcon = () => {
        switch (type) {
            case 'info':
                return <IconInfo />;
            case 'success':
                return <IconCheck />;
            case 'error':
                return <IconError />;
        }
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={hideduration}
            onClose={onClose}
            TransitionComponent={transition === 'left' ? TransitionLeft : TransitionDown}
            anchorOrigin={{ vertical: anchorOrigin[0], horizontal: anchorOrigin[1] }}
            sx={sx}
        >
            <Alert onClose={onClose} icon={getIcon()} sx={sx}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default SlideAlert;
