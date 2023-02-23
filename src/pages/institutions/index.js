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

    const [tabItem, setTabItem] = useState('1');
    const handleTabItem = (event, newTabItem) => {
        setTabItem(newTabItem);
    }

    return (

        <div>

            <Head>
                <title>
                    Institutions • Qarrington
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
                                                        SaaS Underwriters are business incubators, angels, ... responsible for listing companies.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Link href="/account/create">
                                                <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                        The Term 'SaaS Underwriters' was firstly coined & used by Qarrington on Jan. 1st, 2023.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* intro ends */}

                                {/* tab starts */}

                                <TabContext value={tabItem}>

                                    <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
                                        <TabsWrapper
                                            onChange={handleTabItem}
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
                                            <TabLabel label="incubators" value="1" />
                                            <TabLabel label="accelerators" value="2" />
                                            <TabLabel label="angels" value="3" disabled />
                                            <TabLabel label="funds" value="4" disabled />
                                            <TabLabel label="institutions" value="5" disabled />
                                        </TabsWrapper>
                                    </Box>

                                    <Box style={{ marginBottom: '0px' }}>

                                        {/* incubator tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="1">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {incubators && incubators.map(({ _id, underwriterName, underwriterType, underwriterLogo, underwriterIndustry, underwriterDescription, underwriterMarket, underwriterWebsite }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <a href={underwriterWebsite} target="_blank"
                                                                rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                                <Card sx={{ padding: '60px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={underwriterName}
                                                                            src={underwriterLogo}
                                                                        />
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={2} >
                                                                            <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                                {underwriterName}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                                {underwriterIndustry}
                                                                            </Typography>
                                                                            <Typography my={1} variant="h5" fontWeight={700}>
                                                                                {underwriterDescription}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                                {underwriterMarket}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </a>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* incubator tab ends */}

                                        {/* accelerator tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="2">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {accelerators && accelerators.map(({ _id, underwriterName, underwriterType, underwriterLogo, underwriterIndustry, underwriterDescription, underwriterMarket, underwriterWebsite }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <a href={underwriterWebsite} target="_blank"
                                                                rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                                <Card sx={{ padding: '60px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={underwriterName}
                                                                            src={underwriterLogo}
                                                                        />
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={2} >
                                                                            <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                                {underwriterName}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                                {underwriterIndustry}
                                                                            </Typography>
                                                                            <Typography my={1} variant="h5" fontWeight={700}>
                                                                                {underwriterDescription}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                                {underwriterMarket}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </a>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* accelerator tab ends */}

                                        {/* angel tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="3">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {angels && angels.map(({ _id, underwriterName, underwriterType, underwriterLogo, underwriterIndustry, underwriterDescription, underwriterMarket, underwriterWebsite }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <a href={underwriterWebsite} target="_blank"
                                                                rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                                <Card sx={{ padding: '60px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={underwriterName}
                                                                            src={underwriterLogo}
                                                                        />
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={2} >
                                                                            <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                                {underwriterName}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                                {underwriterIndustry}
                                                                            </Typography>
                                                                            <Typography my={1} variant="h5" fontWeight={700}>
                                                                                {underwriterDescription}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                                {underwriterMarket}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </a>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* angel tab ends */}

                                        {/* fund tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="4">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {funds && funds.map(({ _id, underwriterName, underwriterType, underwriterLogo, underwriterIndustry, underwriterDescription, underwriterMarket, underwriterWebsite }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <a href={underwriterWebsite} target="_blank"
                                                                rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                                <Card sx={{ padding: '60px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={underwriterName}
                                                                            src={underwriterLogo}
                                                                        />
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={2} >
                                                                            <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                                {underwriterName}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                                {underwriterIndustry}
                                                                            </Typography>
                                                                            <Typography my={1} variant="h5" fontWeight={700}>
                                                                                {underwriterDescription}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                                {underwriterMarket}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </a>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* fund tab ends */}

                                        {/* institution tab starts */}

                                        <TabPanel sx={{ padding: 0 }} value="5">

                                            <Grid item xs={12} mb={2}>
                                                <Grid container spacing={2}>

                                                    {institutions && institutions.map(({ _id, underwriterName, underwriterType, underwriterLogo, underwriterIndustry, underwriterDescription, underwriterMarket, underwriterWebsite }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                            <a href={underwriterWebsite} target="_blank"
                                                                rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                                <Card sx={{ padding: '60px', cursor: 'pointer' }}>
                                                                    <Box
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <Avatar
                                                                            style={{ width: 50, height: 50 }}
                                                                            alt={underwriterName}
                                                                            src={underwriterLogo}
                                                                        />
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={2} >
                                                                            <Typography variant="body" fontWeight={700} color="secondary" textTransform="uppercase">
                                                                                {underwriterName}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                                {underwriterIndustry}
                                                                            </Typography>
                                                                            <Typography my={1} variant="h5" fontWeight={700}>
                                                                                {underwriterDescription}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                                                {underwriterMarket}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </a>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </Grid>

                                        </TabPanel>

                                        {/* institution tab ends */}

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

const incubators = [
    {
        _id: 1,
        underwriterName: "SOSV",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/sosv.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "International",
        underwriterWebsite: "https://sosv.com"
    },
    {
        _id: 2,
        underwriterName: "French Tech Visa",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/lafrenchtech.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "International",
        underwriterWebsite: "https://lafrenchtech.com"
    }
]

const accelerators = [
    {
        _id: 1,
        underwriterName: "Y Combinator",
        underwriterType: "Accelerator",
        underwriterLogo: "/assets/media/underwriters/ycombinator.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "International",
        underwriterWebsite: "https://ycombinator.com"
    },
    {
        _id: 2,
        underwriterName: "500 StartUps",
        underwriterType: "Accelerator",
        underwriterLogo: "/assets/media/underwriters/500.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "International",
        underwriterWebsite: "https://500.co"
    }
]

const angels = [
    {
        _id: 1,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 2,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 3,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 4,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    }
]

const funds = [
    {
        _id: 1,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 2,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 3,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 4,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    }
]

const institutions = [
    {
        _id: 1,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 2,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 3,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    },
    {
        _id: 4,
        underwriterName: "Qarrington",
        underwriterType: "Incubator",
        underwriterLogo: "/assets/media/underwriters/qarrington.png",
        underwriterIndustry: "we back healthcare companies",
        underwriterDescription: "Subscriptions aren't investments, therefore, the 'higher the risks, the higher the rewards' doesn't count.",
        underwriterMarket: "United States",
        underwriterWebsite: "https://qarrington.com"
    }
]