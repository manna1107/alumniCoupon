'use client';

import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

// ✅ สร้าง NextLinkComposed สำหรับใช้กับ MUI
const NextLinkComposed = forwardRef(function NextLinkComposed({ to, ...props }, ref) {
  return <NextLink ref={ref} href={{ pathname: to.pathname, query: to.query }} {...props} />;
});

const pages = ['หน้าหลัก', 'คูปองของฉัน'];

function ResponsiveAppBar() {
  const { data: session } = useSession(); // ✅ เรียกข้อมูล session
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleUserMenuClick = (setting) => {
    switch (setting) {
      case 'Logout':
        signOut({ callbackUrl: '/' }); // ✅ ใช้ `signOut()` ของ NextAuth
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ left: 0, right: 0, boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 100 }}>
          {/* โลโก้ */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img src="/picture/PSU-ARMS.png" alt="Logo" style={{ height: 100, marginRight: 10 }} />
            <Typography variant="h6" noWrap sx={{ fontSize: '32px' }}>
              ระบบคูปองศิษย์เก่าสัมพันธ์
            </Typography>
          </Box>

          {/* เมนูสำหรับมือถือ */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* เมนูสำหรับเดสก์ท็อป */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page, index) => (
              <Button key={index} onClick={() => router.push(page === 'หน้าหลัก' ? '/user/home' : '/user/mycoupons')} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* ✅ ตรวจสอบ session เพื่อแสดงเมนูผู้ใช้ หรือปุ่ม Login */}
          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt={session.user?.name || "User"} src={session.user?.image || '/static/images/avatar/default.png'} />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                <MenuItem disabled>
                  <Typography textAlign="center" sx={{  fontWeight: 'bold' }}>{session.user?.name}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleUserMenuClick('Logout')}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => signIn()}>
                Login
              </Button>
            </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;