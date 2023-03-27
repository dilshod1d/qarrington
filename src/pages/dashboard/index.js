import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Link from 'next/link';
import Navbar from '../../components/dashboard/Navbar';
import Admin from '../../components/dashboard/Admin';
import Company from '../../components/dashboard/Company';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    Grid,
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
import Footer from '../../components/dashboard/Footer';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#7bed9f' : '#308fe8',
    },
}));

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    // const { data: accounts } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher);

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

            <Navbar />

            <Container>

                <Grid container spacing={2}>

                    {/* Admin Starts Here */}

                    <Grid item xs={12} md={6} lg={3}>
                        <Admin />
                    </Grid>

                    {/* Admin Ends Here */}

                    <Grid item xs={12} md={6} lg={6} mt={12} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <form noValidate autoComplete='off'>

                                    <Carousel>
                                        {tasks && tasks.map(({ _id, name, route, detail, tooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                                <Card style={{ padding: '60px' }}>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Box component="label" display="flex" justifyContent="center">
                                                            {accounts && accounts.slice(0, 1).map(({ _id, accountPersonal, accountStatus }) => (
                                                                <StyledBadge
                                                                    key={_id}
                                                                    overlap="circular"
                                                                    anchorOrigin={{
                                                                        vertical: 'bottom',
                                                                        horizontal: 'right'
                                                                    }}
                                                                    variant={accountStatus.accountIsActive}
                                                                >
                                                                    {accounts && accounts.slice(0, 1).map(({ _id, accountProfile }) => (
                                                                        <Avatar
                                                                            style={{ width: 65, height: 65 }}
                                                                            alt={accountPersonal.accountFirstName}
                                                                            src={accountProfile.accountAvatarUrl}
                                                                        />
                                                                    ))}
                                                                </StyledBadge>
                                                            ))}
                                                        </Box>
                                                        {accounts && accounts.slice(0, 1).map(({ _id, accountPersonal }) => (
                                                            <Box mt={1.5} key={_id}>
                                                                <Typography component="span" variant="h4" fontWeight="500" color="black">Hi</Typography>
                                                                <Typography component="span" mr={0.5} variant="h4" fontWeight="500" color="secondary">,</Typography>
                                                                <Typography component="span" variant="h4" fontWeight="700" color="black">{accountPersonal.accountFirstName}</Typography>
                                                            </Box>
                                                        ))}
                                                        <Box mt={0.8} mb={1.2}>
                                                            <Typography variant="body">With your Qarrington account, you can <b>underwrite</b> and <b>list</b> companies. Also, you can <b>spread</b>, <b>buy</b>, and <b>sell</b> subscriptions.</Typography>
                                                        </Box>
                                                        <Link href={route}>
                                                            <Tooltip title={tooltip} placement="top">
                                                                <Button
                                                                    size="medium"
                                                                    sx={{ color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                                                                    variant="contained"
                                                                    fullWidth={false}
                                                                >
                                                                    {name}
                                                                </Button>
                                                            </Tooltip>
                                                        </Link>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Carousel>

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
                                                <TabLabel label="Profile" value="1" />
                                                <TabLabel label="Settings" value="2" />
                                                <TabLabel label="Alerts" value="3" />
                                            </TabsWrapper>
                                        </Box>
                                        <Box style={{ marginTop: '16px' }}>

                                            {/* profile tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">
                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        To facilitate smooth payouts, it's important to keep your account details updated. Otherwise, your future payouts might be delayed.
                                                    </Typography>
                                                </Card>

                                                {accounts && Array.isArray(accounts) && accounts.slice(0, 1).map(({ _id, accountProfile }) => (

                                                    <>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="Kindly provide a link to your avatar so we know who you are as a Qarrington." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="avatar url"
                                                                        defaultValue="ankara"
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="Kindly provide your current job title so we know who you are as a Qarrington." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="avatar url"
                                                                        defaultValue="ankara"
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                    </>

                                                ))}

                                                <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                                    <Button
                                                        size="large"
                                                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                        variant="contained"
                                                        fullWidth={true}
                                                        type="submit"
                                                    >
                                                        save
                                                    </Button>
                                                </Card>

                                            </TabPanel>

                                            {/* profile tab ends */}

                                            {/* settings tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">
                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        In order not to lose access to your account, kindly copy your secretKey to a safe place. You'll need it to recover your account.
                                                    </Typography>
                                                </Card>

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                        <Tooltip title="Kindly note that you can update the accessKey of your Qarrington account." placement="top">
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                placeholder="avatar url"
                                                                defaultValue="ankara"
                                                                inputProps={{ style: { textAlign: 'center' } }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip title="Kindly note that once your secret key is generated, you cannot change it later." placement="top">
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                placeholder="avatar url"
                                                                defaultValue="ankara"
                                                                inputProps={{ style: { textAlign: 'center' } }}
                                                            />
                                                        </Tooltip>
                                                    </Stack>
                                                </Card>

                                                <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                                    <Button
                                                        size="large"
                                                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                        variant="contained"
                                                        fullWidth={true}
                                                        type="submit"
                                                    >
                                                        save
                                                    </Button>
                                                </Card>

                                            </TabPanel>

                                            {/* settings tab ends */}

                                            {/* alerts tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="3">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        In order not to lose access to your account, kindly copy your secretKey to a safe place. You'll need it to recover your account.
                                                    </Typography>
                                                </Card>

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                        <Tooltip title="Kindly note that you can update the accessKey of your Qarrington account." placement="top">
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                placeholder="avatar url"
                                                                defaultValue="ankara"
                                                                inputProps={{ style: { textAlign: 'center' } }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip title="Kindly note that once your secret key is generated, you cannot change it later." placement="top">
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                placeholder="avatar url"
                                                                defaultValue="ankara"
                                                                inputProps={{ style: { textAlign: 'center' } }}
                                                            />
                                                        </Tooltip>
                                                    </Stack>
                                                </Card>

                                                <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                                    <Button
                                                        size="large"
                                                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                        variant="contained"
                                                        fullWidth={true}
                                                        type="submit"
                                                    >
                                                        save
                                                    </Button>
                                                </Card>

                                                <Grid item xs={12}>
                                                    <Card style={{ padding: '60px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                                                        <Stack spacing={2}>
                                                            <Pagination count={10} variant="outlined" shape="rounded" />
                                                        </Stack>
                                                    </Card>
                                                </Grid>

                                            </TabPanel>

                                            {/* alerts tab ends */}

                                        </Box>

                                    </TabContext>

                                    {/* tab stops */}

                                    <Footer />

                                </form>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Company />
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

const tasks = [
    {
        name: "underwrite",
        route: "/companies/underwrite",
        tooltip: "When you find, vet, and list a company, you get 10% of the company's Initial Subscription Offering or ISO proceeds.",
    },
    {
        name: "list",
        route: "/companies/list",
        tooltip: "When you list your company on Qarrington, you can raise funds through an Initial Subscription Offering or ISO."
    },
    {
        name: "spread",
        route: "/subscriptions/spread",
        tooltip: "When you buy subscriptions and sell them to your clients, you can keep the difference btw the pull and push price.",
    },
    {
        name: "buy",
        route: "/subscriptions",
        tooltip: "When you buy subscriptions, you can sell the subscriptions or use them to access the listed company's products.",
    },
    {
        name: "sell",
        route: "/dashboard",
        tooltip: "When you sell subscriptions, the payout will automatically be sent or paid to your connected bank account within days.",
    }
]

const accounts = [
    {
        accountPersonal: {
            accountFirstName: "Jack"
        },
        accountStatus: {
            accountIsActive: "dot"
        },
        accountProfile: {
            accountAvatarUrl: "/assets/media/team/jane.webp/"
        }
    }
]