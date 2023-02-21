import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Box, Card, Container, Grid, styled, Tab, Tooltip, Typography } from '@mui/material';
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
                    Mechanisms • Qarrington
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
                                                        Qarrington is an easy-to-use exchange. See how it works for a wide variety of use cases.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Link href="/account/create">
                                                <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                        If you're new to Qarrington and you don't have an account, you can get started in 2 seconds.
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
                                            <TabLabel label="Underwriters" value="1" />
                                            <TabLabel label="Companies" value="2" />
                                            <TabLabel label="Subscribers" value="3" />
                                            <TabLabel label="Platforms" value="4" />
                                        </TabsWrapper>
                                    </Box>

                                    <Box style={{ marginBottom: '0px' }}>

                                        {/* underwriter tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="1">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Typography variant="body" fontWeight={600}>
                                                                On Qarrington, we do not accept direct listings from companies. However, a company must be vetted and listed by a SaaS Underwriter; a business incubator/accelerator, an angel group, or a venture capital firm.
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Open  your own Qarrington account, it's 100% free."
                                                                    src="/assets/media/underwriters/register.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        register
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Open  your own Qarrington account, it's 100% free.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        First of all, regardless of your needs, you can always use your Qarrington account as an underwriter, company, and subscriber.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        connect
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Link your bank account to Qarrington, it's 100% free.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Basically, all your subscription proceeds are sent to the linked bank account, which can be any bank, in any country, & in any currency.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Link your bank account to Qarrington, it's 100% free."
                                                                    src="/assets/media/underwriters/connect.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Apply to become a SaaS Underwriter, it's 100% free."
                                                                    src="/assets/media/underwriters/request.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        request
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Apply to become a SaaS Underwriter, it's 100% free.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Finally, if approved, you'd be given a portal that will allow the founders of your portfolio companies to list their SaaS companies.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* underwriter tab ends */}

                                        {/* company tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="2">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Typography variant="body" fontWeight={600}>
                                                                A company on Qarrington is a subscription-based business that has been vetted and listed by a SaaS Underwriter. At the moment, we only accept the listing of companies with a subscription business model.
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Prepare for the listing of your company, it's free."
                                                                    src="/assets/media/mechanisms/launch.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        create
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Prepare for the listing of your company, it's free.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        First of all, Qarrington only works with SaaS Underwriters. As a result, you must create a company through one. This might change.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        list
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Tooltip title="Within 7 days, subscribers can buy at least 12 subscription units at a time, but they won't be able to sell for 90 days." placement="top">
                                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                                Whitelist subscribers for your company's listing.
                                                                            </Typography>
                                                                        </Tooltip>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Next, your company will be listed 7 days after you've whitelisted an acceptable number of subscribers ~ anything above 1,000 would do.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Whitelist subscribers for your company's listing."
                                                                    src="/assets/media/mechanisms/advance.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Give subscribers access to your company's products."
                                                                    src="/assets/media/mechanisms/create.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        launch
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Tooltip title="After the 90-day lock period, kindly give subscribers access to your products based on their subscription units." placement="top">
                                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                                Give subscribers access to your company's products.
                                                                            </Typography>
                                                                        </Tooltip>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        7 days after the listing, 10% of the subscription proceeds will go to your underwriter, while the rest 90% will be transferred to your company.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* company tab ends */}

                                        {/* subscriber tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="3">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Typography variant="body" fontWeight={600}>
                                                                Primarily, subscribers are the end users of the listed companies. Although a subscriber can either be a business or an individual, at the moment, we only accept the former. This might change in the future.
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Buy subscriptions during and after a new listing."
                                                                    src="/assets/media/mechanisms/pull.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        pull
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Buy subscriptions during and after a new listing.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Primarily, you can buy subscriptions during the launch of a new listing or from existing customers after the subscription listing.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        access
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Use your subscription to access online services.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Next, you can access the company's products with your Qarrington <b>accountAccessKey</b>. Each subscription unit is a month of access.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Use your subscription to access online services."
                                                                    src="/assets/media/mechanisms/access.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Sell your subscription and get paid via bank transfer."
                                                                    src="/assets/media/mechanisms/push.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        push
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Sell your subscription and get paid via bank transfer.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Once you sell your subscription, you'd receive payouts via bank transfer. But you might lose your access to the company's products.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* subscriber tab ends */}

                                        {/* platform tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="4">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Typography variant="body" fontWeight={600}>
                                                                Qarrington works with a wide variety of technology companies looking forward to integrating accurate, timely, and reliable subscription data into their platforms to boost the adoption of the market.
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Get the most accurate subscription data."
                                                                    src="/assets/media/mechanisms/fetch.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        fetch
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Get the most accurate subscription data.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Fetch reliable subscription data from the world's first subscription exchange. Get started today with a unique Private Key.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        integrate
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Link accurate subscription data to your products.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Integrate timely subscription data into your products to quickly track the world's most powerful and accurate subscription data.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Link accurate subscription data to your products."
                                                                    src="/assets/media/mechanisms/integrate.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '0px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    alt="Launch subscription products thru REST API."
                                                                    src="/assets/media/mechanisms/track.png"
                                                                    height={282}
                                                                    width={450}
                                                                    objectFit="cover"
                                                                />
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                        track
                                                                    </Typography>
                                                                    <Link href="/account/create">
                                                                        <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                            Launch subscription products thru REST API.
                                                                        </Typography>
                                                                    </Link>
                                                                    <Typography variant="body" fontWeight={500} color="secondary">
                                                                        Track subscription data from the world's largest subscription exchange and ship better subscription products through REST API.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* platform tab ends */}

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
