import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import LeftGrid from '../../components/grids/LeftGrid';
import RightGrid from '../../components/grids/RightGrid';
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
import Footer from '../../components/main/Footer';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import useSWR from 'swr';

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
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher)

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
            await fetch(`https://qarrington.com/api/accounts`, {
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

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Manage Account • Qarrington</title>
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

                                    <Carousel>
                                        {tasks && tasks.map(({ _id, name, route, detail, tooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                                                <Card style={{ padding: '60px' }}>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Box component="label" display="flex" justifyContent="center">
                                                            <Avatar
                                                                style={{ width: 90, height: 90 }}
                                                                variant="rounded"
                                                                alt="name"
                                                                src="/assets/media/accounts/000.png"
                                                            />
                                                        </Box>
                                                        <Box mt={1.5} mb={1.2}>
                                                            <Typography variant="body">{detail}</Typography>
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
                                                <TabLabel label="Base" value="1" />
                                                <TabLabel label="Contact" value="2" />
                                                <TabLabel label="Wire" value="3" />
                                            </TabsWrapper>
                                        </Box>
                                        <Box style={{ marginTop: '16px' }}>

                                            {/* base starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">
                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        One of the best things about Qarrington is the fact that we do not collect sensitive data in the frontend. We only do so in the backend.
                                                    </Typography>
                                                </Card>

                                                {data && Array.isArray(data) && data.slice(0, 1).map(({ _id, accountQid, accountKey, accountProfile, accountReview, accountConnections }) => (

                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="With your accountQid, you can recover your accountKey, join whitelists, and invite users." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Qid"
                                                                        defaultValue={accountQid}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Kindly tell us what your occupation is so that we know a bit more about you." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Title"
                                                                        defaultValue={accountProfile.profileTitle}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly update your accessToken as you see fit. It's your gateway to Qarrington." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Key"
                                                                        defaultValue={accountKey}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                {/* <Tooltip title="Kindly update your secretToken & save it somewhere safe. It's very important." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Secrect Token"
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip> */}

                                                            </Stack>

                                                        </Card>


                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly paste the link to the avatar you'd like to use as your Account Profile." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Avatar"
                                                                        defaultValue={accountProfile.profileAvatar}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Kindly leave your feedback on how you're liking what we do at Qarrington." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Review"
                                                                        defaultValue={accountReview.reviewContent}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>
                                                    </>

                                                ))}
                                            </TabPanel>

                                            {/* base stops */}

                                            {/* contact starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">
                                                {data && Array.isArray(data) && data.slice(0, 1).map(({ _id, accountContact }) => (

                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Typography variant="body" color="secondary" fontWeight={600}>
                                                                Woah use third-party firms to collect and spread programmable subscriptions. Thus, Qarrington is neither a bank nor a stockbroker.
                                                            </Typography>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly enter your U.S. Bank Name. If not, you could use a digital bank i.e. Wise." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Email Address"
                                                                        defaultValue={accountContact.contactEmail}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Kindly provide your Last Name exactly as it is shown on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Phone Number"
                                                                        defaultValue={accountContact.contactNumber}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly provide your Last Name exactly as it is shown on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Home Address"
                                                                        defaultValue={accountContact.contactAddress}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                {/* <Tooltip title="Kindly provide your First Name exactly as it is shown on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Name"
                                                                        defaultValue={accountBank.bankAccountName}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip> */}

                                                            </Stack>

                                                        </Card>

                                                    </>
                                                ))}
                                            </TabPanel>

                                            {/* contact stops */}

                                            {/* wire starts */}

                                            <TabPanel sx={{ padding: 0 }} value="3">
                                                {data && Array.isArray(data) && data.slice(0, 1).map(({ _id, accountBank }) => (

                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Typography variant="body" color="secondary" fontWeight={600}>
                                                                We use third-party firms to collect and spread programmable subscriptions. Thus, Qarrington is neither a bank nor a stockbroker.
                                                            </Typography>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly enter your U.S. Bank Name. If not, you could use a digital bank i.e. Wise." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Bank Name"
                                                                        defaultValue={accountBank.bankName}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Kindly provide your Last Name exactly as it is shown on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Bank Country"
                                                                        defaultValue={accountBank.bankCountry}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly provide your Last Name exactly as it is shown on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Bank Currency"
                                                                        defaultValue={accountBank.bankCurrency}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Kindly provide your First Name exactly as it is shown on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="Account Name"
                                                                        defaultValue={accountBank.bankAccountName}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>

                                                            <Stack spacing={2} sx={{ width: '100%' }}>

                                                                <Tooltip title="Kindly enter your Account Number exactly as it is on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        type="number"
                                                                        id="outlined-required"
                                                                        placeholder="Account Number"
                                                                        defaultValue={accountBank.bankAccountNumber}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                                <Tooltip title="Kindly enter your Routing Number exactly as it is on your bank account." placement="top">
                                                                    <TextField
                                                                        required
                                                                        type="number"
                                                                        id="outlined-required"
                                                                        placeholder="Routing Number"
                                                                        defaultValue={accountBank.bankRoutingNumber}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>

                                                            </Stack>

                                                        </Card>
                                                    </>
                                                ))}
                                            </TabPanel>

                                            {/* wire stops */}
                                        </Box>
                                    </TabContext>

                                    {/* tab stops */}



                                    <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                        <Button
                                            size="large"
                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="contained"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            Savew
                                        </Button>
                                    </Card>

                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Typography variant="body2">
                                            Kindly note that it is very important to copy your secretToken and save it somewhere safe. If you lose, forget, or can't remember your accessToken, you can use your secretToken to recover your account. However, if you lose your secretToken, you'd be required to create a new Qarrington account. With that being said, kindly use your unique [ <b>https://qarrington.com/u/qid</b> ] invitation link to invite as many contacts as you can. Each time you refer an active contact, Qarrington will reward you and the contact with 1 Qarrington draft each.
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

const BadgeButton = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '14px 12px',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginTop: '12px',
        fontSize: '12px',
        cursor: 'pointer',
        '&.hover': {
            color: '#000'
        }
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
        name: "list",
        route: "/companies/list",
        detail: "In order to list a company, simply navigate to the listing page, provide the company details, and submit the company for approval.",
        tooltip: "When you list a company, the company will only be submitted if the listing is executed by an approved underwriter."
    },
    {
        name: "buy",
        route: "/",
        detail: "In order to buy a company's subscriptions, simply navigate to the homepage, search for the company, and click on the company.",
        tooltip: "When you buy a subscription during launch, you cannot sell the subscription until after the lock period of 90 days."
    },
    {
        name: "sell",
        route: "/dashboard",
        detail: "In order to sell a company's subscriptions, simply navigate to the portfolio section of your dashboard, and click on the company.",
        tooltip: "When you sell a subscription after the lock period, your monthly access to the company's products will be revoked."
    }
]