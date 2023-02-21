import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Tab, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import Link from 'next/link';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

const Page = () => {

    const [mechanism, setMechanism] = useState('2');
    const handleMechanism = (event, newMechanism) => {
        setMechanism(newMechanism);
    }

    return (

        <div>

            <Head>
                <title>
                    Comparisons • Qarrington
                </title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <HeaderMenu />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={9} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                {/* intro starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Link href="/account/create">
                                                <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                        On Qarrington, we pride ourselves as the first-ever subscription exchange in the world.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Link href="/account/create">
                                                <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                        Also, we often aim to be the largest of its kind. See how we compare with the alternatives.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* intro ends */}

                                {/* mechanism tab starts */}

                                <TabContext value={mechanism}>

                                    <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
                                        <TabsWrapper
                                            onChange={handleMechanism}
                                            indicatorColor="transparent"
                                            TabIndicatorProps={{
                                                sx: { backgroundColor: 'transparent', height: 4 }
                                            }}
                                            sx={{
                                                "& button:hover": { backgroundColor: "#c7c7c7" },
                                                "& button:active": { backgroundColor: "#b6b6b6" },
                                                "& button.Mui-selected": { backgroundColor: "#a7a7a7" },
                                                "& div.MuiTabs-scroller": { overflowY: "auto" },
                                            }}
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                        >
                                            <TabLabel label="underlying assets" value="1" />
                                            <TabLabel label="risk possibilities" value="2" />
                                            <TabLabel label="expected rewards" value="3" />
                                        </TabsWrapper>
                                    </Box>

                                    <Box style={{ marginBottom: '0px' }}>

                                        {/* asset tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="1">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {assets && assets.map(({ _id, name, image, source, content, exchange, indicator }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Box
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <StyledBadge
                                                                        overlap="circular"
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right'
                                                                        }}
                                                                        variant={indicator}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={name}
                                                                            src={image}
                                                                        />
                                                                    </StyledBadge>
                                                                </Box>
                                                                <Box style={{ textAlign: 'center' }}>
                                                                    <Box mt={2}>
                                                                        <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                            {name}
                                                                        </Typography>
                                                                        <Typography variant="body2" fontWeight={600} color="secondary">
                                                                            {exchange}
                                                                        </Typography>
                                                                        <Typography my={1} variant="h5" fontWeight={700}>
                                                                            {content}
                                                                        </Typography>
                                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                            {source}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* asset tab ends */}

                                        {/* risk tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="2">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {risks && risks.map(({ _id, name, image, source, content, exchange, indicator }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Box
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <StyledBadge
                                                                        overlap="circular"
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right'
                                                                        }}
                                                                        variant={indicator}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={name}
                                                                            src={image}
                                                                        />
                                                                    </StyledBadge>
                                                                </Box>
                                                                <Box style={{ textAlign: 'center' }}>
                                                                    <Box mt={2}>
                                                                        <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                            {name}
                                                                        </Typography>
                                                                        <Typography variant="body2" fontWeight={600} color="secondary">
                                                                            {exchange}
                                                                        </Typography>
                                                                        <Typography my={1} variant="h5" fontWeight={700}>
                                                                            {content}
                                                                        </Typography>
                                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                            {source}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* risk tab ends */}

                                        {/* reward tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="3">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {rewards && rewards.map(({ _id, name, image, source, content, exchange, indicator }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <Card style={{ padding: '60px' }}>
                                                                <Box
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <StyledBadge
                                                                        overlap="circular"
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right'
                                                                        }}
                                                                        variant={indicator}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={name}
                                                                            src={image}
                                                                        />
                                                                    </StyledBadge>
                                                                </Box>
                                                                <Box style={{ textAlign: 'center' }}>
                                                                    <Box mt={2}>
                                                                        <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                            {name}
                                                                        </Typography>
                                                                        <Typography variant="body2" fontWeight={600} color="secondary">
                                                                            {exchange}
                                                                        </Typography>
                                                                        <Typography my={1} variant="h5" fontWeight={700}>
                                                                            {content}
                                                                        </Typography>
                                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                            {source}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* reward tab ends */}

                                    </Box>

                                </TabContext>

                                {/* tabs ends */}

                                <Footer />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <RightGrid />
                    </Grid>

                </Grid>
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

const CardTitle = {
    cursor: 'pointer',
    color: '#2ed573',
    '&:hover': {
        color: '#000000'
    }
};

const assets = [
    {
        _id: 1,
        name: "Qarrington",
        image: "/assets/media/comparisons/qarrington.png",
        source: "Qarrington",
        content: "Each subscription unit owned is fully backed by the underlying products of the listed company.",
        exchange: "Subscription Exchange",
        indicator: "dot"
    },
    {
        _id: 2,
        name: "Nasdaq",
        image: "/assets/media/comparisons/nasdaq.png",
        source: "Investopedia",
        content: "A drop in price to zero means the investor loses his or her entire investment: a return of -100%.",
        exchange: "Stock Exchange",
        indicator: ""
    },
    {
        _id: 3,
        name: "Oanda",
        image: "/assets/media/comparisons/oanda.png",
        source: "WikiPedia",
        content: "Today, like the currency of most nations, the dollar is fiat money, unbacked by any physical asset.",
        exchange: "Foreign Exchange",
        indicator: ""
    },
    {
        _id: 4,
        name: "Coinbase",
        image: "/assets/media/comparisons/coinbase.png",
        source: "Yahoo",
        content: "You're foolish saying bitcoin is 'backed' by energy/algorithms or ... you don’t understand the term.",
        exchange: "Cryptocurrency Exchange",
        indicator: ""
    }
]

const risks = [
    {
        _id: 1,
        name: "Qarrington",
        image: "/assets/media/comparisons/qarrington.png",
        source: "Qarrington",
        content: "Even if a company's subscriptions lost 100%, subscribers can always access the company's products.",
        exchange: "Subscription Exchange",
        indicator: "dot"
    },
    {
        _id: 2,
        name: "Nasdaq",
        image: "/assets/media/comparisons/nasdaq.png",
        source: "CNN",
        content: "In 2022, the shares of GNRC fell 74%, while MTCH and TSLA failed to recover the 70% loss in market cap.",
        exchange: "Stock Exchange",
        indicator: ""
    },
    {
        _id: 3,
        name: "Oanda",
        image: "/assets/media/comparisons/oanda.png",
        source: "Bloomberg",
        content: "At the end of 2022, the EUR lost 13%, the GBP fell 15%, and the YEN was down by 20% to the USD.",
        exchange: "Foreign Exchange",
        indicator: ""
    },
    {
        _id: 4,
        name: "Coinbase",
        image: "/assets/media/comparisons/coinbase.png",
        source: "CNBC",
        content: "Last year, LUNA radically lost 100%, ETH fell 67%, and BTC went down by 63% in market capitalization.",
        exchange: "Cryptocurrency Exchange",
        indicator: ""
    }
]

const rewards = [
    {
        _id: 1,
        name: "Qarrington",
        image: "/assets/media/comparisons/qarrington.png",
        source: "Qarrington",
        content: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        exchange: "Subscription Exchange",
        indicator: "dot"
    },
    {
        _id: 2,
        name: "Nasdaq",
        image: "/assets/media/comparisons/nasdaq.png",
        source: "Yahoo",
        content: "In 2021, the shares of DXLG were up 2,067.9%, LWLG surged 1,500%, and AMC recorded a 1,136.4% growth.",
        exchange: "Stock Exchange",
        indicator: ""
    },
    {
        _id: 3,
        name: "Oanda",
        image: "/assets/media/comparisons/oanda.png",
        source: "CNN",
        content: "In the year 2021, the USD saw a boost of 7%, the EUR was trading 4.2% up, and the YUAN grew 8%.",
        exchange: "Foreign Exchange",
        indicator: ""
    },
    {
        _id: 4,
        name: "Coinbase",
        image: "/assets/media/comparisons/coinbase.png",
        source: "Nasdaq",
        content: "Same year, the tokens of GALA added 40k+%, CEEK saw 25k+%, & ANY grew 16k+% in market cap.",
        exchange: "Cryptocurrency Exchange",
        indicator: ""
    }
]