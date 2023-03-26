import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Button, Fab, InputBase, Tooltip } from '@mui/material';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Avatar, Box, Card, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import useSWR from 'swr';
import InboxIcon from '@mui/icons-material/Inbox';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher)

  return (

    <>

      {/* header starts */}

      <HeaderCard>
        <Container mb={8}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* LogoBox Starts Here */}

            <Grid>
              <Box display="flex" justifyContent="flex-start">
                <LogoWrapper>
                  <Link href="/">
                    <Avatar
                      variant="rounded"
                      alt="Setment Logo"
                      src="/assets/media/logos/primary-filled.png"
                    />
                  </Link>
                </LogoWrapper>
              </Box>
            </Grid>

            {/* LogoBox Ends Here */}

            {/* SearchBox Starts Here */}

            <Grid>
              <Box display="flex" justifyContent="center">

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Stack mx={5} direction="row">
                  <Link href="#">
                    <Box sx={MenuIcon}>
                      <InboxIcon sx={{ fontSize: '28px' }} />
                    </Box>
                  </Link>

                  <Link href="#">
                    <Box sx={MenuIcon}>
                      <InboxIcon sx={{ fontSize: '28px' }} />
                    </Box>
                  </Link>

                  <Link href="#">
                    <Box sx={MenuIcon}>
                      <InboxIcon sx={{ fontSize: '28px' }} />
                    </Box>
                  </Link>
                </Stack>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link><Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

                <Link href="#">
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      menu
                    </Button>
                  </Box>
                </Link>

              </Box>
            </Grid>

            {/* SearchBox Ends Here */}

            {/* UserBox Starts Here */}

            <Grid>
              <Box display="flex" justifyContent="flex-end">
                <AvatarWrapper>
                  <Link href="/account">
                    <Fab size="small" color="primary" aria-label="add">
                      <HistoryEduRoundedIcon sx={{ color: '#ffffff' }} />
                    </Fab>
                  </Link>
                </AvatarWrapper>
              </Box>
            </Grid>

            {/* UserBox Ends Here */}
          </Box>
        </Container>
      </HeaderCard>

      {/* header ends */}

    </>

  );

};

export default Component;

const MenuItem = {
  fontWeight: '700',
  fontSize: '12px',
  marginX: '8px',
  textTransform: 'uppercase',
  backgroundColor: '#7bed9f10',
  '&:hover': {
    backgroundColor: '#7bed9f20'
  }
};

const HeaderCard = styled(Card)(
  ({ theme }) => `
  width: 100%;
  position: fixed;
  border-radius: 0;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
  z-index: 999;
`
);

const MenuIcon = {
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  color: '#7bed9f',
  '&:hover': {
    color: '#7bed9f80'
  }
};

const LogoWrapper = styled(Box)(
  ({ theme }) => `
        padding-right: ${theme.spacing(2.5)};
        cursor: pointer;
`
);

const AvatarWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(2.5)};
        cursor: pointer;
`
);