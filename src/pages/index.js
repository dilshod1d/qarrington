import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from '../components/menus/HeaderMenu';
import LeftGrid from '../components/grids/LeftGrid';
import RightGrid from '../components/grids/RightGrid';
import {
    Avatar,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Card,
    CardMedia,
    Container,
    Grid,
    imageListItemBarClasses,
    List,
    ListItem,
    Stack,
    styled,
    Tab,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Footer from '../components/main/Footer';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';
import Carousel from 'react-material-ui-carousel';
import packageJson from '../../package.json'

const Page = () => {

    console.log(packageJson.version)

    // const fetcher = (...args) => fetch(...args).then(res => res.json());
    // const { data: accounts } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);
    // const { data: subscriptions } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions`, fetcher);

    return (

        <div>

            <Head>
                <title>Nasdaq for SaaS • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <HeaderMenu />

            <Container>

                <Grid container spacing={2}>

                    {/* LeftGrid Starts Here */}

                    <Grid item xs={12} md={6} lg={3}>
                        <LeftGrid />
                    </Grid>

                    {/* LeftGrid Ends Here */}

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                                                {/* intro starts */}

                                                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <Link href="/account/create">
                                                <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                    On Qarrington, we don't just pride ourselves as the world's first subscription exchange, we also aim to be the largest of its kind.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* intro ends */}

                                <Grid container spacing={2}>

                                    {subscriptions && subscriptions.map(({ _id, name, image, ticker, variant, movement }) => (
                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                            <Link href={``}>
                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Avatar
                                                            style={{ width: 40, height: 40 }}
                                                            alt={name}
                                                            src={image}
                                                        />
                                                    </Box>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Tooltip title={name} placement="top">
                                                            <Box>
                                                                <Box mt={1} mb={0.5}>
                                                                    <Typography component="span" variant="h6" color={variant} fontWeight={700}>
                                                                        {movement}
                                                                    </Typography>
                                                                    <Typography component="span" variant="body2" fontWeight={500} color="secondary">
                                                                        %
                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary">
                                                                        {ticker}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Tooltip>
                                                    </Box>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    ))}

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <RightGrid />
                    </Grid>

                </Grid>
                <Footer />
            </Container>

        </div>

    )
}

export default Page

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const TabsWrapper = styled(TabList)(
    ({ theme }) => `
          &.MuiTabs-root {
            height: 0;
          }
    `
);

const TabLabel = styled(Tab)(
    ({ theme }) => `
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
    `
);

const DraftBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

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