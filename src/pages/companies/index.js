import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import LeftGrid from '../../components/grids/LeftGrid';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Button, Card, Container, Grid, Stack, styled, Tab, Tooltip, Typography } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Footer from '../../components/main/Footer';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);
    const { data: institutions } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/institutions`, fetcher);

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Manage Companies • Qarrington</title>
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

                                {institutions && institutions.slice(0, 1).map(({ _id, institutionSlides }) => (
                                    <>
                                        {institutionSlides && institutionSlides.slice(0, 1).map(({ _id, slideName, slideCount, slideButton, slideRoute, slideDetail, slideTooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                                <Card style={{ padding: '60px' }}>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                            {slideCount}
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight="700" color="secondary" textTransform="uppercase">{slideName}</Typography>
                                                        <Box mt={1.5} mb={1.2}>
                                                            <Typography variant="body">{slideDetail}</Typography>
                                                        </Box>
                                                        <Link href={slideRoute}>
                                                            <Tooltip title={slideTooltip} placement="top">
                                                                <Button
                                                                    size="medium"
                                                                    sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                    variant="contained"
                                                                    fullWidth={false}
                                                                >
                                                                    {slideButton}
                                                                </Button>
                                                            </Tooltip>
                                                        </Link>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </>
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
                                            <TabLabel label="Submitted" value="1" />
                                            <TabLabel label="Listed" value="2" />
                                            <TabLabel label="Launched" value="3" />
                                        </TabsWrapper>
                                    </Box>

                                    <Box style={{ marginBottom: '0px', marginTop: '16px' }}>

                                        {/* submitted tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="1">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {companies && companies.slice(0, 2).map(({ _id, companyTicker, companyListing, companyIso }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/companies/${companyTicker}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <Tooltip title={companyListing.listingName} placement="top">
                                                                                <Avatar alt={companyListing.listingName} src={companyListing.listingLogo}
                                                                                    sx={{ height: '50px', width: '50px' }}
                                                                                />
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.5}>
                                                                            <Typography variant="h5" fontWeight={700}>
                                                                                {companyTicker}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                {companyListing.listingName}
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

                                        {/* submitted tab stops */}

                                        {/* listed tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="2">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {companies && companies.slice(0, 1).map(({ _id, companyTicker, companyListing, companyIso }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/companies/${companyTicker}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <Tooltip title={companyListing.listingName} placement="top">
                                                                                <Avatar alt={companyListing.listingName} src={companyListing.listingLogo}
                                                                                    sx={{ height: '50px', width: '50px' }}
                                                                                />
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.5}>
                                                                            <Typography variant="h5" fontWeight={700}>
                                                                                {companyTicker}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                {companyListing.listingName}
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

                                        {/* listed tab stops */}

                                        {/* launched tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="3">
                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={1}>

                                                    {companies && companies.slice(0, 1).map(({ _id, companyTicker, companyListing, companyIso }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                            <Link href={`/companies/${companyTicker}`}>
                                                                <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Stack direction="row" spacing={2}>
                                                                            <Tooltip title={companyListing.listingName} placement="top">
                                                                                <Avatar alt={companyListing.listingName} src={companyListing.listingLogo}
                                                                                    sx={{ height: '50px', width: '50px' }}
                                                                                />
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.5}>
                                                                            <Typography variant="h5" fontWeight={700}>
                                                                                {companyTicker}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                {companyListing.listingName}
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

                                        {/* launched tab stops */}

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
            margin-top: 16px;
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