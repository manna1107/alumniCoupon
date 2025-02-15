'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link'; // ✅ ใช้ Link จาก Next.js
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react'; // ✅ Import useSession และ signIn

const pages = [
  { name: 'หน้าหลัก', path: '/admin/home' },
  { name: 'เพิ่มคูปอง', path: '/admin/form' },
  { name: 'คูปองทั้งหมด', path: '/admin/coupons' },
];

const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { data: session } = useSession(); // ✅ ดึง session
  const router = useRouter();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleUserMenuClick = (setting) => {
    if (setting === 'Profile') router.push('/profile');
    else if (setting === 'Account') router.push('/account');
    else if (setting === 'Logout') router.push('/'); // ✅ ใช้ signOut() เพื่อ logout
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ left: 0, right: 0, boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 100 }}>
          {/* โลโก้ */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img
              src="/picture/PSU-ARMS.png"
              alt="PSU-ARMS Logo"
              style={{ height: 100, marginRight: 10 }}
            />
            <Typography variant="h6" noWrap component="b" sx={{ fontSize: '32px', color: 'white' }}>
              ระบบคูปองศิษย์เก่าสัมพันธ์
            </Typography>
          </Box>

          {/* เมนูสำหรับมือถือ */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.path} passHref>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* เมนูสำหรับเดสก์ท็อป */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Link key={page.name} href={page.path} passHref>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page.name}</Button>
              </Link>
            ))}
          </Box>

          {/* เมนูผู้ใช้ */}
          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt={session.user?.name || 'User'} src={session.user?.image || '/static/images/avatar/default.png'} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => signIn()}>Login</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
