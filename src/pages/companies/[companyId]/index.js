import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import LeftGrid from '../../../components/grids/LeftGrid';
import RightGrid from '../../../components/grids/RightGrid';
import { Avatar, Badge, Box, Button, Card, Container, Grid, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Footer from '../../../components/main/Footer';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';
import Carousel from 'react-material-ui-carousel';

const Page = ({ slug }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Track Company • Qarrington</title>
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

                                <form noValidate autoComplete='off'>

                                    {companies && companies.slice(0, 1).map(({ _id, companyUser }) => (
                                        <>
                                            <Carousel>
                                                {companyUser && companyUser.map(({ _id, companyTicker, companyUserType, companyUserTotal, companyUserDetail, companyUserTooltip, companyUserButton, companyUserRoute }) => (
                                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                                        <Card style={{ padding: '60px' }}>
                                                            <Box style={{ textAlign: 'center' }}>
                                                                <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                                    {companyUserTotal}
                                                                </Typography>
                                                                <Typography variant="body2" fontWeight="700" color="secondary" textTransform="uppercase">{companyUserType}</Typography>
                                                                <Box mt={1.5} mb={1.2}>
                                                                    <Typography variant="body">Track the number of whitelisted subscribers, total customers, active customers, and passive customers of your company with ease.</Typography>
                                                                </Box>
                                                                {companies && companies.slice(0, 1).map(({ _id, companyTicker }) => (
                                                                    <Link key={_id} href={`/${companyTicker}`}>
                                                                        <Tooltip title="Prior to listing a company, the company must whitelist subscribers for its ISO and convert them to customers after the ISO." placement="top">
                                                                            <Button
                                                                                size="medium"
                                                                                sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                                variant="contained"
                                                                                fullWidth={false}
                                                                            >
                                                                                whitelist
                                                                            </Button>
                                                                        </Tooltip>
                                                                    </Link>
                                                                ))}
                                                            </Box>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Carousel>
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
                                                <TabLabel label="Iso" value="1" />
                                                <TabLabel label="Listing" value="2" />
                                                <TabLabel label="Kpi" value="3" />
                                            </TabsWrapper>
                                        </Box>

                                        <Box style={{ marginTop: '16px' }}>

                                            {/* listing tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        Even though you can easily view your company details, you cannot make changes to the details. Please get in touch for more details.
                                                    </Typography>
                                                </Card>

                                                {companies && companies.slice(0, 1).map(({ _id, companyTicker, companyListing }) => (

                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="company ticker" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company ticker"
                                                                        defaultValue={companyTicker}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center', textTransform: 'uppercase' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="company name" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company name"
                                                                        defaultValue={companyListing.companyName}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="company headline" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company headline"
                                                                        defaultValue={companyListing.companyHeadline}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="company description" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company description"
                                                                        defaultValue={companyListing.companyDescription}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="company logo" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company logo"
                                                                        defaultValue={companyListing.companyLogo}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="company product" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company product"
                                                                        defaultValue={companyListing.companyProduct}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="company market" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company market"
                                                                        defaultValue={companyListing.companyMarket}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="company industry" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company industry"
                                                                        defaultValue={companyListing.companyIndustry}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="company email" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company email"
                                                                        defaultValue={companyListing.companyEmail}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="company website" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company website"
                                                                        defaultValue={companyListing.companyWebsite}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="company size" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company size"
                                                                        defaultValue={companyListing.companySize}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="company key" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="company key"
                                                                        defaultValue={companyListing.companyKey}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                    </>

                                                ))}

                                            </TabPanel>

                                            {/* listing tab stops */}

                                            {/* iso tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        Basically, once your Initial Subscription Offering or ISO is launched, the launch will automatically end after 7 days at the specified time.
                                                    </Typography>
                                                </Card>

                                                {companies && companies.slice(0, 1).map(({ _id, companyIso }) => (

                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="iso units" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="iso units"
                                                                        defaultValue={companyIso.companyIsoUnits}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="iso price" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="iso price"
                                                                        defaultValue={companyIso.companyIsoPrice}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="iso date" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="iso date"
                                                                        defaultValue={companyIso.companyIsoDate}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="iso time" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="iso time"
                                                                        defaultValue={companyIso.companyIsoTime}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="iso amount" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="iso amount"
                                                                        defaultValue={companyIso.companyIsoAmount}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="iso raised" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="iso raised"
                                                                        defaultValue={companyIso.companyIsoRaised}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                    </>

                                                ))}

                                            </TabPanel>

                                            {/* iso tab stops */}

                                            {/* kpi tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="3">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        You can easily track the live performance of your company subscription, which is automatically updated every 5 seconds.
                                                    </Typography>
                                                </Card>

                                                {companies && companies.slice(0, 1).map(({ _id, companyKpi }) => (
                                                    <>
                                                        {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyCurrency, companyCapitalization, companyVolume, companyPrice, companyPricePercentChange, companyPricePointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                                                            <>
                                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                                        <Tooltip title="company capitalization" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="company capitalization"
                                                                                defaultValue={companyCapitalization}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                        <Tooltip title="company volume" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="company volume"
                                                                                defaultValue={companyVolume}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                    </Stack>
                                                                </Card>

                                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                                        <Tooltip title="company price" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="company price"
                                                                                defaultValue={companyPrice}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                        <Tooltip title="company currency" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="company currency"
                                                                                defaultValue={companyCurrency}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                    </Stack>
                                                                </Card>

                                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                                        <Tooltip title="company point" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="company point"
                                                                                defaultValue={companyPricePointChange}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                        <Tooltip title="company percent" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="company percent"
                                                                                defaultValue={companyPricePercentChange}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                    </Stack>
                                                                </Card>

                                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                                        <Tooltip title="active customers" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="active customers"
                                                                                defaultValue={companyActiveCustomers}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                        <Tooltip title="recorded date" placement="top">
                                                                            <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                placeholder="recorded date"
                                                                                defaultValue={companyIsRecordedAt}
                                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                            />
                                                                        </Tooltip>
                                                                    </Stack>
                                                                </Card>
                                                            </>
                                                        ))}
                                                    </>
                                                ))}

                                            </TabPanel>

                                            {/* kpi tab stops */}

                                        </Box>

                                    </TabContext>

                                    {/* tab stops */}

                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Typography variant="body2">
                                            Once your company is listed on Qarrington, your Initial Subscription Offering or ISO will be launched at the date and time you have specified during the listing submission process. With that being said, the launch will last for a maximum of 7 days and the proceeds will be transferred to your connected bank account 7 days after the launch. Even though there are no costs in listing a company on Qarrington, we do charge 10% of the proceeds to cover our operational expenses.
                                        </Typography>
                                    </Box>

                                </form>

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

export async function getServerSideProps({ params }) {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies?companyTicker=${params.companyId.replace(/\-/g, '+')}`)
            .then((r) => r.json());
        return {
            props: {
                slug: results.companyTicker
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}

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
            margin-top: 4px;
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