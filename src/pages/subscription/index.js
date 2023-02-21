import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import LeftGrid from '../../components/grids/LeftGrid';
import RightGrid from '../../components/grids/RightGrid';
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
import Footer from '../../components/main/Footer';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';
import Carousel from 'react-material-ui-carousel';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: accounts } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions`, fetcher);

    const [updateAccount, setUpdateAccount] = useState({
        name: "",
        image: "",
        tokens: "",
        signals: "",
        searches: ""
    });

    const { push } = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = validate();
        if (Object.keys(error).length)
            return setError(error);
        setIsSubmit(true);
        await updateeAccount();
        await push("/accounts");
    };

    const updateeAccount = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateAccount)
            });
        } catch (error) {
            console.log(error);
        }
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUpdateAccount({ ...updateAccount, [name]: value })
    // };

    const [value, setValue] = useState('2');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Subscription • Qarrington</title>
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

                                    {/* {data && data.slice(0, 1).map(({ _id, subscriptionName, subscriptionTicker, subscriptionTickerSlug, subscriptionPrice, subscriptionTrack, subscriptionWebsite, subscriptionDetail, subscriptionLogo, subscriptionStripeId, subscriptionAccountId, subscriptionIsApproved, subscriptionAccounts, subscriptionPayout, subscriptionKey, subscriptionSubmittedAt }) => ( */}
                                    <>
                                        <>
                                            <Box textAlign="center" sx={{ marginBottom: '16px' }}>
                                                <>
                                                    {data && data.slice(0, 1).map(({ _id, subscriptionSlug, subscriptionListing, subscriptionPrice, subscriptionTrack, subscriptionAccounts, subscriptionPayout, subscriptionKey }) => (
                                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                                            <Card style={{ padding: '80px' }}>
                                                                <Tooltip title="This is the total amount subscriptions sold or pushed during the launch period." placement="top">
                                                                    <Box textAlign="center">
                                                                        <DraftBadge badgeContent="USD" color="success" fontWeight={700}>
                                                                        </DraftBadge>
                                                                        <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                                            {subscriptionPayout.payoutAmount}
                                                                        </Typography>
                                                                    </Box>
                                                                </Tooltip>
                                                                <Box textAlign="center" mt={1}>
                                                                    <Tooltip title="Launch Price" placement="bottom">
                                                                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                                            {subscriptionPrice.launchPrice}
                                                                        </Typography>
                                                                    </Tooltip>
                                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                        usd
                                                                    </Typography>
                                                                    <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                        /
                                                                    </Typography>
                                                                    <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                                        {subscriptionListing.listingUnits}
                                                                    </Typography>
                                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                        units
                                                                    </Typography>
                                                                    <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                        \
                                                                    </Typography>
                                                                    <Tooltip title="Current Price" placement="bottom">
                                                                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                                            {subscriptionPrice.currentPrice}
                                                                        </Typography>
                                                                    </Tooltip>
                                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                        usd
                                                                    </Typography>
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </>
                                            </Box>
                                        </>
                                    </>
                                    {/* ))} */}

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
                                                <TabLabel label="Detail" value="1" />
                                                <TabLabel label="Accounts" value="2" />
                                                <TabLabel label="APIs" value="3" />
                                            </TabsWrapper>
                                        </Box>

                                        <Box style={{ marginTop: '16px' }}>

                                            {/* detail starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">
                                                {data && data.slice(0, 1).map(({ _id, subscriptionSlug, subscriptionListing, subscriptionPrice, subscriptionTrack, subscriptionAccounts, subscriptionPayout, subscriptionKey }) => (
                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Typography variant="body" color="secondary" fontWeight={600}>
                                                                Although you can manage your subscription details below, you're always welcome to make changes to only the subscription detail.
                                                            </Typography>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="Subscription Name" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Name"
                                                                        defaultValue={subscriptionListing.listingName}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="Subscription Ticker" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Ticker"
                                                                        defaultValue={subscriptionListing.listingTicker}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="Subscription Slug" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Slug"
                                                                        defaultValue={subscriptionSlug}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="Subscription Route" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Route"
                                                                        defaultValue={`qarrington.com/${subscriptionSlug}`}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="Subscription Logo" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Logo"
                                                                        defaultValue={subscriptionListing.listingLogo}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="Subscription Website" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Website"
                                                                        defaultValue={subscriptionListing.listingWebsite}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="Subscription Price" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Price"
                                                                        defaultValue={subscriptionPrice.launchPrice}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="Subscription Detail" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Detail"
                                                                        defaultValue={subscriptionListing.listingDetail}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                {/* <Tooltip title="Subscription Website" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Website"
                                                                        defaultValue={subscriptionWebsite}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip> */}
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                                            <Tooltip title="Kindly send an email with your ticker to draft@qarrington.com with a brief on why we should approve this draft." placement="top">
                                                                <Button
                                                                    size="large"
                                                                    sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                                    variant="contained" disabled
                                                                    fullWidth={true}
                                                                    type="submit"
                                                                >
                                                                    Save
                                                                </Button>
                                                            </Tooltip>

                                                        </Card>
                                                        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                            <Typography variant="body2">
                                                                After submitting your subscription, you will not be able to make changes to most of the subscription details. However, you can always update the subscription detail to help customers understand your business model, product offering, and what's in it for them.
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                ))}
                                            </TabPanel>

                                            {/* detail stops */}

                                            {/* account starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">
                                                {data && data.slice(0, 1).map(({ _id, subscriptionAccounts }) => (
                                                    <>
                                                        {subscriptionAccounts && subscriptionAccounts.slice(0, 1).map(({ _id, accountWhitelistTotal }) => (
                                                            <Card key={_id} style={{ padding: '60px', marginBottom: '10px' }}>
                                                                <Typography component="span" variant="body" color="secondary" fontWeight={600}>
                                                                    You have whitelisted <Typography component="span" variant="body" color="black" fontWeight={700}>{accountWhitelistTotal}</Typography> Qarringtons for your subscription, which would launch 7 days after the whitelist reach the threshold.
                                                                </Typography>
                                                            </Card>
                                                        ))}
                                                    </>
                                                ))}
                                                <Grid item xs={12} mb={2}>
                                                    <Grid container spacing={1}>

                                                        {accounts && accounts.slice(0, 9).map(({ _id, accountProfile }) => (
                                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                                <Card style={{ padding: '40px' }}>
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
                                                                            variant={accountProfile.profileIsActive}
                                                                        >
                                                                            <Avatar
                                                                                style={{ width: 50, height: 50 }}
                                                                                alt={accountProfile.profileName}
                                                                                src={accountProfile.profileAvatar}
                                                                            />
                                                                        </StyledBadge>
                                                                    </Box>
                                                                    <Box style={{ textAlign: 'center' }}>
                                                                        <Box mt={1.5}>
                                                                            <Typography variant="h5" fontWeight={700}>
                                                                                {accountProfile.profileName}
                                                                            </Typography>
                                                                            <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                {accountProfile.profileCreatedAt}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
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
                                                                    Kindly note that when you create a subscription, before the subscription can be approved and listed on Qarrington, there must be an acceptable number of whitelisted accounts for the launch of the subscription. In most cases, this can range from a few thousand.
                                                                </Typography>
                                                            </Box>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </TabPanel>

                                            {/* account stops */}

                                            {/* api starts */}

                                            <TabPanel sx={{ padding: 0 }} value="3">

                                                {data && data.slice(0, 1).map(({ _id, subscriptionSlug, subscriptionKey, subscriptionStripeId }) => (
                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Typography variant="body" color="secondary" fontWeight={600}>
                                                                The payouts for the subscriptions pushed to customers during the launch would be made to the below stripeId 7 days after the launch.
                                                            </Typography>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Subscription Key" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription Key"
                                                                        defaultValue={subscriptionKey}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Subscription stripeId" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Subscription stripeId"
                                                                        defaultValue={subscriptionStripeId}
                                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>

                                                    </>

                                                ))}

                                                <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                                    <Tooltip title="In order to receive instant payouts for the initial sale of your draft, you'd need to connect to your Stripe account." placement="top">
                                                        <Button
                                                            size="large"
                                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                            variant="contained" disabled
                                                            fullWidth={true}
                                                            type="submit"
                                                        >
                                                            Connect
                                                        </Button>
                                                    </Tooltip>

                                                </Card>

                                                <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                    <Typography variant="body2">
                                                        After the launch of your subscription, kindly use your subscriptionKey to create customers, who bought the subscriptions during and after the launch, and give the customers access to your products and services based on their current subscription units.
                                                    </Typography>
                                                </Box>
                                            </TabPanel>

                                            {/* api stops */}

                                        </Box>

                                    </TabContext>

                                    {/* tab stops */}

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