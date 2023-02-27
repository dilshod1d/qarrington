import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import TickerMenu from '../menus/TickerMenu';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Avatar, Box, Button, Card, Container, Divider, Fab, Grid, InputBase, styled, Tooltip } from '@mui/material';
import useSWR from 'swr';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher)

  return (
    <>
      <HeaderCard>
        <Container maxWidth="lg" marginBotttom="200px">
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
                      src="/assets/media/logos/aa/primary-filled.png"
                    />
                  </Link>
                </LogoWrapper>

                <Link href="/challenges">
                  <Box sx={{ marginLeft: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      Challenges
                    </Button>
                  </Box>
                </Link>

                <Link href="/mechanisms">
                  <Box sx={{ marginLeft: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      Mechanisms
                    </Button>
                  </Box>
                </Link>

                <Link href="/help">
                  <Box sx={{ marginLeft: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      Help
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
                    width: 450
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
                    placeholder="Search tickers, companies, or products ..."
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

                <Link href="/products">
                  <Box sx={{ marginRight: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      Products
                    </Button>
                  </Box>
                </Link>

                <Link href="/comparisons">
                  <Box sx={{ marginRight: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      Comparisons
                    </Button>
                  </Box>
                </Link>

                <Link href="/plans">
                  <Box sx={{ marginRight: -1.2 }}>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      Plans
                    </Button>
                  </Box>
                </Link>

                <AvatarWrapper>
                  <Link href="/companies/list">
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

      {/* Marquee Starts Here */}

      <TickerMenu />

      {/* Marquee Ends Here */}
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