import React from 'react';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Avatar, Box, Button, Card, Container, Fab, Grid, Stack, styled, Tooltip, Typography } from '@mui/material';
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
                      <Link href={`/topics/${menuUrl}`} key={_id}>
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
                        <Link href={`/${menuUrl}`} key={_id}>
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
                      <Link href={`/topics/${menuUrl}`} key={_id}>
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

            {/* meet starts */}

            <Grid>
              <Box display="flex" justifyContent="flex-end">
                <AvatarWrapper>
                  <Link href={`/qa`}>
                    <Fab size="small" color="primary" aria-label="add">
                      <CalendarMonthRoundedIcon sx={{ color: '#ffffff' }} />
                    </Fab>
                  </Link>
                </AvatarWrapper>
              </Box>
            </Grid>

            {/* meet ends */}

          </Box>
        </Container>
      </HeaderCard>

      {/* header ends */}

      {/* ticker starts */}

      <Container>
        <Box sx={{ marginTop: "108px", marginBottom: 2 }}>
          <Box display="flex" justifyContent="center">
            <Marquee gradient={false} pauseOnHover={true}>
              <Grid item xs={12} mb={2}>
                <Grid container spacing={0}>

                  {subscriptions && Array.isArray(subscriptions) && subscriptions?.map(({ _id, name, image, ticker, variant, movement }) => (
                    <Grid key={_id} mt={0} mb={-2} mx={0.5}>

                      <Card style={{ padding: '16px' }}>
                        <Box
                          style={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          <Avatar
                            style={{ width: 24, height: 24 }}
                            alt={name}
                            src={image}
                          />
                        </Box>
                        <Box style={{ textAlign: 'center' }}>
                          <Box mt={0.5}>
                            <Typography component="span" variant="body2" color="secondary" fontWeight={500}>
                              ${ticker}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>

                    </Grid>
                  ))}

                </Grid>
              </Grid>

            </Marquee>
          </Box>
        </Box>
      </Container>

      {/* ticker ends */}

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
        menuUrl: "users"
      },
      {
        menuUrl: "underwriters"
      },
      {
        menuUrl: "founders"
      },
      {
        menuUrl: "publishers"
      }
    ]
  },
  {
    menuRight: [
      {
        menuUrl: "chronicles"
      },
      {
        menuUrl: "bedrocks"
      },
      {
        menuUrl: "updates"
      },
      {
        menuUrl: "guidelines"
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

const subscriptions = [
  {
    _id: 1,
    name: "Birdio",
    image: "/assets/media/companies/birdio.png",
    ticker: "BRD",
    variant: "primary",
    movement: "2.74"
  },
  {
    _id: 2,
    name: "Wiskie",
    image: "/assets/media/companies/wiskie.png",
    ticker: "WSK",
    variant: "error",
    movement: "0.59"
  },
  {
    _id: 3,
    name: "Qarrington",
    image: "/assets/media/companies/qarrington.png",
    ticker: "QAR",
    variant: "primary",
    movement: "1.62"
  },
  {
    _id: 4,
    name: "Twined",
    image: "/assets/media/companies/twined.png",
    ticker: "TWN",
    variant: "primary",
    movement: "4.10"
  },
  {
    _id: 5,
    name: "Spread",
    image: "/assets/media/companies/spread.png",
    ticker: "SPR",
    variant: "error",
    movement: "2.38"
  },
  {
    _id: 6,
    name: "Swind",
    image: "/assets/media/companies/swind.png",
    ticker: "SWI",
    variant: "primary",
    movement: "5.04"
  },
  {
    _id: 7,
    name: "Highland",
    image: "/assets/media/companies/highland.png",
    ticker: "HGH",
    variant: "error",
    movement: "3.08"
  },
  {
    _id: 8,
    name: "Algoma",
    image: "/assets/media/companies/algoma.png",
    ticker: "ALG",
    variant: "primary",
    movement: "5.15"
  },
  {
    _id: 9,
    name: "Splash",
    image: "/assets/media/companies/splash.png",
    ticker: "SPH",
    variant: "primary",
    movement: "1.49"
  },
  {
    _id: 10,
    name: "Varozo",
    image: "/assets/media/companies/varozo.png",
    ticker: "VAR",
    variant: "primary",
    movement: "5.74"
  },
  {
    _id: 11,
    name: "Klasic",
    image: "/assets/media/companies/klasic.png",
    ticker: "KSC",
    variant: "primary",
    movement: "4.48"
  },
  {
    _id: 12,
    name: "Humble",
    image: "/assets/media/companies/humble.png",
    ticker: "HUM",
    variant: "primary",
    movement: "3.72"
  },
  {
    _id: 13,
    name: "Wask",
    image: "/assets/media/companies/wask.png",
    ticker: "WAS",
    variant: "primary",
    movement: "4.09"
  },
  {
    _id: 14,
    name: "Crossborder",
    image: "/assets/media/companies/crossborder.png",
    ticker: "CSS",
    variant: "primary",
    movement: "2.07"
  },
  {
    _id: 15,
    name: "Bright",
    image: "/assets/media/companies/bright.png",
    ticker: "BRT",
    variant: "primary",
    movement: "4.82"
  },
  {
    _id: 16,
    name: "Cirkle",
    image: "/assets/media/companies/cirkle.png",
    ticker: "CKL",
    variant: "error",
    movement: "4.21"
  },
  {
    _id: 17,
    name: "PawPaw",
    image: "/assets/media/companies/pawpaw.png",
    ticker: "PAW",
    variant: "primary",
    movement: "1.87"
  },
  {
    _id: 18,
    name: "Pinner",
    image: "/assets/media/companies/pinner.png",
    ticker: "PIN",
    variant: "primary",
    movement: "3.28"
  },
  {
    _id: 19,
    name: "Splitted",
    image: "/assets/media/companies/splitted.png",
    ticker: "SPT",
    variant: "primary",
    movement: "6.05"
  },
  {
    _id: 20,
    name: "Jasper",
    image: "/assets/media/companies/jasper.png",
    ticker: "JAS",
    variant: "primary",
    movement: "1.87"
  },
  {
    _id: 21,
    name: "Urban",
    image: "/assets/media/companies/urban.png",
    ticker: "URB",
    variant: "primary",
    movement: "5.72"
  },
  {
    _id: 22,
    name: "Winsta",
    image: "/assets/media/companies/winsta.png",
    ticker: "WIN",
    variant: "primary",
    movement: "3.09"
  },
  {
    _id: 23,
    name: "Babooze",
    image: "/assets/media/companies/babooze.png",
    ticker: "BAB",
    variant: "error",
    movement: "4.04"
  },
  {
    _id: 24,
    name: "Boosto",
    image: "/assets/media/companies/boosto.png",
    ticker: "BST",
    variant: "primary",
    movement: "3.73"
  }
]