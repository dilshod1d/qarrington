import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Container,
  Card,
  Grid,
  Tab,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  TabContext,
  TabList,
} from '@mui/lab';
import Link from 'next/link';
import useSWR from 'swr';
import Marquee from "react-fast-marquee";

const Component = () => {

  // const fetcher = (...args) => fetch(...args).then(res => res.json());
  // const { data: subscriptions } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions`, fetcher);

  return (

    <Container>
      <Box sx={{ marginTop: "108px", marginBottom: 2 }}>
        <Box display="flex" justifyContent="center">
          <Marquee gradient={false} pauseOnHover={true}>
            <Grid item xs={12} mb={2}>
              <Grid container spacing={0}>

                {Array.isArray(subscriptions) && subscriptions.map(({ _id, name, image, ticker, variant, movement }) => (
                  <Grid key={_id} mt={0} mb={-2} mx={0.5}>

                    <Link href={``}>
                      <Tooltip title={name} placement="top">
                        <Card style={{ padding: '16px', cursor: 'pointer' }}>
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
                              <Typography component="span" variant="body2" color={variant} fontWeight={500}>
                                {movement}
                              </Typography>
                              <Typography component="span" variant="body2" fontWeight={400} color="secondary">
                                %
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Tooltip>
                    </Link>

                  </Grid>
                ))}

              </Grid>
            </Grid>

          </Marquee>
        </Box>
      </Box>
    </Container>

  )

}

export default Component;

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
    ticker: "QA",
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
    ticker: "HIGH",
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
    ticker: "CROSS",
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
    ticker: "SPLIT",
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