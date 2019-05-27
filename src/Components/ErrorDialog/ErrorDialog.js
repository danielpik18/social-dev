import {
    Typography,
    Divider,
    Dialog
} from '@material-ui/core';

import React from 'react';

const ErrorDialog = ({ isOpen, close, message }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={close}
        >
            <div>
                <Typography variant='subtitle2'>
                    {message}
                </Typography>
            </div>
        </Dialog>
    );
}

export default ErrorDialog;