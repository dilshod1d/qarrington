import React from 'react';
import Link from 'next/link';
import { Button, Fab, Tooltip } from '@mui/material';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Avatar, Box, Card, Container, Grid, Stack, styled } from '@mui/material';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';

const Component = () => {

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

            {/* logo starts */}

            <Grid>
              <Box display="flex" justifyContent="flex-start">
                <LogoWrapper>
                  <Link href={`/`}>
                    <Avatar
                      variant="rounded"
                      alt="Qarrington Logo"
                      src="/assets/media/logos/primary-filled.png"
                    />
                  </Link>
                </LogoWrapper>
              </Box>
            </Grid>

            {/* logo ends */}

            {/* menu items start */}

            <Grid>
              <Box display="flex" justifyContent="center">

                {menuItems && Array.isArray(menuItems) && menuItems?.map(({ menuLeft }) => (
                  <>
                    {menuLeft && Array.isArray(menuLeft) && menuLeft?.map(({ _id, menuUrl }) => (
                      <Link href={menuUrl} key={_id}>
                        <Box>
                          <Button sx={MenuItem} variant='text' color='secondary'>
                            {menuUrl}
                          </Button>
                        </Box>
                      </Link>
                    ))}
                  </>
                ))}

                <Stack mx={1} direction="row">
                  {menuItems && Array.isArray(menuItems) && menuItems?.map(({ menuCenter }) => (
                    <>
                      {menuCenter && Array.isArray(menuCenter) && menuCenter?.map(({ _id, menuUrl, menuIcon, menuTitle }) => (
                        <Link href={menuUrl} key={_id}>
                          <Tooltip title={menuTitle} placement="top">
                            <Box sx={MenuIcon}>
                              {menuIcon}
                            </Box>
                          </Tooltip>
                        </Link>
                      ))}
                    </>
                  ))}
                </Stack>

                {menuItems && Array.isArray(menuItems) && menuItems?.map(({ menuRight }) => (
                  <>
                    {menuRight && Array.isArray(menuRight) && menuRight?.map(({ _id, menuUrl }) => (
                      <Link href={menuUrl} key={_id}>
                        <Box>
                          <Button sx={MenuItem} variant='text' color='secondary'>
                            {menuUrl}
                          </Button>
                        </Box>
                      </Link>
                    ))}
                  </>
                ))}

              </Box>
            </Grid>

            {/* menu items end */}

            {/* user starts */}

            <Grid>
              <Box display="flex" justifyContent="flex-end">
                <AvatarWrapper>
                  <Link href={`/qa`}>
                    <Fab size="small" color="primary" aria-label="add">
                      <HistoryEduRoundedIcon sx={{ color: '#ffffff' }} />
                    </Fab>
                  </Link>
                </AvatarWrapper>
              </Box>
            </Grid>

            {/* user ends */}

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

const menuItems = [
  {
    menuLeft: [
      {
        menuUrl: "about"
      },
      {
        menuUrl: "approach"
      },
      {
        menuUrl: "users"
      },
      {
        menuUrl: "topics"
      }
    ]
  },
  {
    menuRight: [
      {
        menuUrl: "list"
      },
      {
        menuUrl: "raise"
      },
      {
        menuUrl: "transact"
      },
      {
        menuUrl: "request"
      }
    ]
  },
  {
    menuCenter: [
      {
        menuUrl: "compare",
        menuIcon: <MeetingRoomRoundedIcon sx={{ fontSize: '28px' }} />,
        menuTitle: "Compare"
      },
      {
        menuUrl: "topics",
        menuIcon: <GridViewRoundedIcon sx={{ fontSize: '28px' }} />,
        menuTitle: "Topics"
      },
      {
        menuUrl: "contact",
        menuIcon: <RoomPreferencesRoundedIcon sx={{ fontSize: '28px' }} />,
        menuTitle: "Contact"
      }
    ]
  }
]