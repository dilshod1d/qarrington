import React from 'react';
import Link from 'next/link';
import { Box, Breadcrumbs, Typography } from '@mui/material';

const Component = () => {

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
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              About
            </Typography>
          </Link>
          <Link href="/preferences">
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              Preferences
            </Typography>
          </Link>
          <Link href="/opportunities">
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              Opportunities
            </Typography>
          </Link>
          <Link href="/help">
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              Help
            </Typography>
          </Link>
          <Link href="/terms">
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              Terms
            </Typography>
          </Link>
          <Link href="/privacy">
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              Privacy
            </Typography>
          </Link>
          <Link href="/account/access">
            <Typography
              variant="body2"
              color="secondary"
              sx={BreadcrumbItem}
            >
              Logout
            </Typography>
          </Link>
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