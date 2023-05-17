/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Box,
} from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import routers from '../../routers/routers';
import { useAppContext, localStoreUtils, axiosUtils } from '../../utils';
import { actions } from '../../app/';
import styles from './AccountMenu.module.css';
import { authLogoutSV } from '../../services/authen';
import SnackbarCp from '../SnackbarCp/SnackbarCp';

const cx = className.bind(styles);

function AccountMenu({ className }) {
    const { state, dispatch } = useAppContext();
    const { accountMenu, currentUser } = state.set;
    const open = Boolean(accountMenu);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const history = useNavigate();
    const handleClickMenu = (e) => {
        dispatch(
            actions.setData({
                ...state.set,
                accountMenu: e.currentTarget,
            })
        );
    };
    const handleCloseMenu = () => {
        dispatch(
            actions.setData({
                ...state.set,
                accountMenu: null,
            })
        );
    };
    const handleLogout = async () => {
        await 1;
        authLogoutSV({
            email_user: currentUser?.email,
            dispatch,
            history,
            setSnackbar,
        });
    };
    const classed = cx('accountMenu-container', className);
    const avatarPlaceholder = '/images/header-logo01.png';
    return (
        <>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <Box className={classed}>
                <Tooltip title=''>
                    <IconButton
                        onClick={handleClickMenu}
                        size='small'
                        sx={{ ml: 1 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={currentUser?.avatar || avatarPlaceholder}
                        ></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={accountMenu}
                id='account-menu'
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar src={currentUser?.avatar || avatarPlaceholder} />{' '}
                    {currentUser?.username}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Cài đặt
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </>
    );
}

AccountMenu.propTypes = {
    className: PropTypes.string,
};

export default AccountMenu;
