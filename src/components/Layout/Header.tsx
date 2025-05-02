import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { i18n, t } = useTranslation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const changeLanguage = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={t("open drawer")}
          onClick={toggleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t('Roast Master')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="language-select-label">{t("Language")}</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={i18n.language}
              label={t("Language")}
              onChange={changeLanguage}
              sx={{ color: 'white' }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="zh-TW">繁體中文</MenuItem>
              <MenuItem value="ja">日本語</MenuItem>
            </Select>
          </FormControl>
          {user && (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={user.name}
                  src={user.picture}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{t('Profile')}</MenuItem>
                <MenuItem onClick={handleLogout}>{t('Logout')}</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;