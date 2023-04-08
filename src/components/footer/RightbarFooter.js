import React from 'react';
import Link from 'next/link';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useAccount } from '@hooks/useAccount';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const Component = () => {
  const { logged } = useAccount(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/account/access');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    router.push('/').then(() => {
      signOut();
    });
  };

  return (
    <>
      <Box style={footer} role="presentation">
        <Breadcrumbs
          separator="/"
          aria-label="breadcrumb"
          sx={{
            '& ol': {
              justifyContent: 'center',
              fontSize: '12px',
              margin: 'auto',
              textDecoration: 'none'
            }
          }}
        >
          <Link href="/about">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              About
            </Typography>
          </Link>
          <Link href="/users">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              Users
            </Typography>
          </Link>
          <Link href="/topics">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              Topics
            </Typography>
          </Link>
          <Link href="/compare">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              Compare
            </Typography>
          </Link>
          <Link href="/contact">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              Contact
            </Typography>
          </Link>
          <Link href="/terms">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              Terms
            </Typography>
          </Link>
          <Link href="/privacy">
            <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
              Privacy
            </Typography>
          </Link>
          {logged === undefined ? null : logged ? (
            <Button style={buttonToggleLog} onClick={handleLogout}>
              <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
                Logout
              </Typography>
            </Button>
          ) : (
            <Button style={buttonToggleLog} onClick={handleLogin}>
              <Typography variant="body2" color="secondary" sx={BreadcrumbItem}>
                Login
              </Typography>
            </Button>
          )}
        </Breadcrumbs>
      </Box>
      <Box style={footerBrand}>
        <Typography variant="body2" color="secondary">
          Qarrington, Inc. © 2023
        </Typography>
      </Box>
    </>
  );
};

export default Component;

const BreadcrumbItem = {
  cursor: 'pointer',
  fontWeight: '500',
  '&:hover': {
    color: '#000'
  }
};

const footer = {
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 20px 10px 20px'
};

const footerBrand = {
  textAlign: 'center'
};

const buttonToggleLog = {
  padding: 0,
  fontWeight: 500,
  minWidth: 'auto',
  height: 'min-content',
  display: 'block',
  backgroundColor: 'transparent',
  '&:hover': {
    color: '#000'
  }
};
