import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import TickerMenu from '../../components/menus/TickerMenu';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Button, Fab, InputBase, Tooltip } from '@mui/material';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Avatar, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';
import useSWR from 'swr';

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

                <Link href="/topics">
                  <Box sx={{ marginLeft: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      topics
                    </Button>
                  </Box>
                </Link>

                <Link href="/stocks">
                  <Box sx={{ marginLeft: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      stocks
                    </Button>
                  </Box>
                </Link>

                <Link href="/cryptos">
                  <Box sx={{ marginLeft: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      cryptos
                    </Button>
                  </Box>
                </Link>

              </Box>
            </Grid>

            {/* LogoBox Ends Here */}

            {/* SearchBox Starts Here */}

            <Grid>
              <Box display="flex" justifyContent="center">
                <Card
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 600
                  }}
                >
                  <Link href="/">
                    <Tooltip title="All Listings">
                      <QrCodeRoundedIcon
                        sx={{ m: '10px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </Link>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search to find answers to 75k questions ..."
                    inputProps={{ 'aria-label': 'search Qarrington' }}
                  />

                  <SearchIcon
                    sx={{ m: '10px' }}
                  />

                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <Link href="/">
                    <Tooltip
                      title="New Listings"
                      placement="bottom"
                    >
                      <InfoRoundedIcon
                        sx={{ m: '10px', color: '#2ed573', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </Link>
                </Card>
              </Box>
            </Grid>

            {/* SearchBox Ends Here */}

            {/* UserBox Starts Here */}

            <Grid>
              <Box display="flex" justifyContent="flex-end">

                <Link href="/about">
                  <Box sx={{ marginRight: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      about
                    </Button>
                  </Box>
                </Link>

                <Link href="/users">
                  <Box sx={{ marginRight: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      users
                    </Button>
                  </Box>
                </Link>

                <Link href="/resources">
                  <Box sx={{ marginRight: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      resources
                    </Button>
                  </Box>
                </Link>

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

      <TickerMenu />

    </>

  );

};

export default Component;

const MenuItem = {
  fontWeight: '600',
  fontSize: '12px',
  marginX: '4px',
  textTransform: 'uppercase',
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