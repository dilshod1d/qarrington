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

import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';

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
                  <Link href={`/dashboard`}>
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

                <Link href={`/briefs/users`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      users
                    </Button>
                  </Box>
                </Link>

                <Link href={`/briefs/underwriters`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      underwriters
                    </Button>
                  </Box>
                </Link>

                <Link href={`/briefs/founders`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      founders
                    </Button>
                  </Box>
                </Link>

                <Link href={`/briefs/publishers`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      publishers
                    </Button>
                  </Box>
                </Link>

                <Stack mx={1} direction="row">
                  <Link href={`/briefs/accounts`}>
                    <Tooltip title="Accounts" placement="top">
                      <Box sx={MenuIcon}>
                        <MeetingRoomRoundedIcon sx={{ fontSize: '28px' }} />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Link href={`/dashboard`}>
                    <Tooltip title="Dashboard" placement="top">
                      <Box sx={MenuIcon}>
                        <GridViewRoundedIcon sx={{ fontSize: '28px' }} />
                      </Box>
                    </Tooltip>
                  </Link>
                  <Link href={`/briefs/settings`}>
                    <Tooltip title="Settings" placement="top">
                      <Box sx={MenuIcon}>
                        <RoomPreferencesRoundedIcon sx={{ fontSize: '28px' }} />
                      </Box>
                    </Tooltip>
                  </Link>
                </Stack>

                <Link href={`/briefs/chronicles`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      chronicles
                    </Button>
                  </Box>
                </Link>

                <Link href={`/briefs/bedrocks`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      bedrocks
                    </Button>
                  </Box>
                </Link>

                <Link href={`/briefs/updates`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      updates
                    </Button>
                  </Box>
                </Link>

                <Link href={`/briefs/guidelines`}>
                  <Box>
                    <Button sx={MenuItem} variant='text' color='secondary'>
                      guidelines
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
                  <Link href={`/briefs/team`}>
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
  fontSize: '11px',
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
  display: 'flex',
  marginX: '6px',
  alignItems: 'center',
  color: '#2f3542',
  '&:hover': {
    color: '#2ed573'
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