import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import Menu from '../../components/cards/Menu';
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
    const { data: picks } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/picks`, fetcher);
    const { data: pulls } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls`, fetcher);
    const { data: pushes } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/pushes`, fetcher);

    const [value, setValue] = useState('2');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Portfolio • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
                />
            </Head>

            <HeaderMenu />

            <Container>

                <Grid container spacing={2}>

                    {/* Menu Starts Here */}

                    <Grid item xs={12} md={6} lg={3}>
                        <Menu />
                    </Grid>

                    {/* Menu Ends Here */}

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                {pulls && pulls.slice(0, 1).map(({ _id, pullAccount }) => (
                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                        <Card style={{ padding: '80px', marginBottom: '16px' }}>
                                            <Tooltip title="Portfolio" placement="top">
                                                <Box textAlign="center">
                                                    <CurrencyBadge badgeContent="USD" color="success" fontWeight={700}>
                                                    </CurrencyBadge>
                                                    <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                        {pullAccount.pullAccountPortfolio}
                                                    </Typography>
                                                </Box>
                                            </Tooltip>
                                            <Box textAlign="center">
                                                <Typography variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                    account portfolio
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
                                            <TabLabel label="Picked" value="1" />
                                            <TabLabel label="Pulled" value="2" />
                                            <TabLabel label="Pushed" value="3" />
                                        </TabsWrapper>
                                    </Box>

                                    <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                        {/* picked starts */}

                                        <TabPanel sx={{ padding: 0 }} value="1">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {picks && picks.map(({ _id, pickTicker, pickCompany, pickStatus }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/portfolio/${pickTicker}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <Avatar alt={pickCompany.pickCompanyName} src={pickCompany.pickCompanyLogo}
                                                                                sx={{ height: '40px', width: '40px' }}
                                                                            />
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box style={{ textAlign: 'center' }}>
                                                                            <Box>
                                                                                <Box textAlign="center" mt={1.5} mb={0.5}>
                                                                                    <Typography component="span" mr={0.2} variant="body" fontWeight="700" color="black" textTransform="uppercase">
                                                                                        {pickCompany.pickCompanyName}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box>
                                                                                    <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                                                                        {pickTicker}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
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
                                                                The above subscriptions are the subscriptions of companies that you currently own in your account portfolio. With that being said, kindly note that when you submit a pull request, the subscription will not be shown here unless the request is matched with a push request.
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </TabPanel>

                                        {/* picked stops */}

                                        {/* pulled starts */}

                                        <TabPanel sx={{ padding: 0 }} value="2">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {pulls && pulls.map(({ _id, pullTicker, pullCompany, pullStatus }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/portfolio/${pullTicker}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <StyledBadge
                                                                                overlap="circular"
                                                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                                variant={pullStatus.pullIsMatched}
                                                                            >
                                                                                <Avatar alt={pullCompany.pullCompanyName} src={pullCompany.pullCompanyLogo}
                                                                                    sx={{ height: '40px', width: '40px' }}
                                                                                />
                                                                            </StyledBadge>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box style={{ textAlign: 'center' }}>
                                                                            <Box>
                                                                                <Box textAlign="center" mt={1.5} mb={0.5}>
                                                                                    <Typography component="span" mr={0.2} variant="body" fontWeight="700" color="black" textTransform="uppercase">
                                                                                        {pullCompany.pullCompanyName}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box>
                                                                                    <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                                                                        {pullTicker}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
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
                                                                The above subscriptions are the subscriptions of companies that you currently own in your account portfolio. With that being said, kindly note that when you submit a pull request, the subscription will not be shown here unless the request is matched with a push request.
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </TabPanel>

                                        {/* pulled stops */}

                                        {/* pushed starts */}

                                        <TabPanel sx={{ padding: 0 }} value="3">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {pushes && pushes.map(({ _id, pushTicker, pushCompany, pushStatus }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/portfolio/${pushTicker}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <StyledBadge
                                                                                overlap="circular"
                                                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                                variant={pushStatus.pushIsMatched}
                                                                            >
                                                                                <Avatar alt={pushCompany.pushCompanyName} src={pushCompany.pushCompanyLogo}
                                                                                    sx={{ height: '40px', width: '40px' }}
                                                                                />
                                                                            </StyledBadge>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box>
                                                                            <Box textAlign="center" mt={1.5} mb={0.5}>
                                                                                <Typography component="span" mr={0.2} variant="body" fontWeight="700" color="black" textTransform="uppercase">
                                                                                    {pushCompany.pushCompanyName}
                                                                                </Typography>
                                                                            </Box>
                                                                            <Box>
                                                                                <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                                                                    {pushTicker}
                                                                                </Typography>
                                                                            </Box>
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
                                                                The above subscriptions are the subscriptions that you recently pushed or sold. In addition to that, when you submit a push request to sell the subscriptions of a company, the subscriptions will not be shown in your dashboard unless the request is matched with a pull request.
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

const CurrencyBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));