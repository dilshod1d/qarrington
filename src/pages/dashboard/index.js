import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import LeftGrid from '../../components/grids/LeftGrid';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, Stack, styled, Tab, Tooltip, Typography } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Footer from '../../components/main/Footer';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: pulls } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls`, fetcher);
    const { data: pushes } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/pushes`, fetcher)

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Dashboard • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
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

                                {pulls && pulls.slice(0, 1).map(({ _id, pullAccount }) => (
                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                        <Card style={{ padding: '80px', marginBottom: '16px' }}>
                                            <Tooltip title="This is the total balance of all the subscriptions that you currently own." placement="top">
                                                <Box textAlign="center">
                                                    <DraftBadge badgeContent="USD" color="success" fontWeight={700}>
                                                    </DraftBadge>
                                                    <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                        {pullAccount.accountBalance}
                                                    </Typography>
                                                </Box>
                                            </Tooltip>
                                            <Box textAlign="center">
                                                <Typography variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                    account balance
                                                </Typography>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}

                                {/* tab starts */}

                                <TabContext value={value}>

                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <TabsWrapper
                                            onChange={handleChange}
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
                                            <TabLabel label="Pulled" value="1" />
                                            <TabLabel label="Pushed" value="2" />
                                        </TabsWrapper>
                                    </Box>

                                    <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                        {/* pulled starts */}

                                        <TabPanel sx={{ padding: 0 }} value="1">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {pulls && pulls.map(({ _id, pullSlug, pullPrice, pullRequests, pullSubscription, pullAccount, pullUpdatedAt }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/subscription/${pullSlug}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <Tooltip title={pullSubscription.subscriptionName} placement="top">
                                                                                <StyledBadge
                                                                                    overlap="circular"
                                                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                                    variant={pullRequests.requestIsMatched}
                                                                                >
                                                                                    <Avatar alt={pullSubscription.subscriptionName} src={pullSubscription.subscriptionLogo}
                                                                                        sx={{ height: '50px', width: '50px' }}
                                                                                    />
                                                                                </StyledBadge>
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.5}>
                                                                            <Typography variant="h5" fontWeight={700}>
                                                                                {pullRequests.requestUnits}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                {pullSubscription.subscriptionTicker}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </Link>
                                                        </Grid>
                                                    ))}

                                                    <Grid item xs={12}>
                                                        <Card style={{ padding: '60px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                                                            <Stack spacing={2}>
                                                                <Pagination count={10} variant="outlined" shape="rounded" />
                                                            </Stack>
                                                        </Card>
                                                        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                            <Typography variant="body2">
                                                                When you make a pull request to buy the subscriptions of a listed company, the green dot shows that the request is yet to be filled. Otherwise, you won't see the dot.
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </TabPanel>

                                        {/* pulled stops */}

                                        {/* pushed starts */}

                                        <TabPanel sx={{ padding: 0 }} value="2">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {pushes && pushes.map(({ _id, pushSlug, pushPrice, pushRequests, pushSubscription, pushAccount, pushUpdatedAt }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/subscription/${pushSlug}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <Tooltip title={pushSubscription.subscriptionName} placement="top">
                                                                                <StyledBadge
                                                                                    overlap="circular"
                                                                                    anchorOrigin={{
                                                                                        vertical: 'bottom',
                                                                                        horizontal: 'right'
                                                                                    }}
                                                                                    variant={pushRequests.requestIsMatched}
                                                                                >
                                                                                    <Avatar
                                                                                        style={{ width: 50, height: 50 }}
                                                                                        alt={pushSubscription.subscriptionName}
                                                                                        src={pushSubscription.subscriptionLogo}
                                                                                    />
                                                                                </StyledBadge>
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.5}>
                                                                            <Typography variant="h5" fontWeight={700}>
                                                                                {pushRequests.requestUnits}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                {pushSubscription.subscriptionTicker}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </Link>
                                                        </Grid>
                                                    ))}

                                                    <Grid item xs={12}>
                                                        <Card style={{ padding: '60px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                                                            <Stack spacing={2}>
                                                                <Pagination count={10} variant="outlined" shape="rounded" />
                                                            </Stack>
                                                        </Card>
                                                        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                            <Typography variant="body2">
                                                                Similar to pull requests, if the green dot is shown, it means that your push request to sell the subscriptions of a company isn't filled yet. Otherwise, you won't see the dot.
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </TabPanel>

                                        {/* pushed stops */}

                                    </Box>

                                </TabContext>

                                {/* tab stops */}

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