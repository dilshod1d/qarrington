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
    const { data: institutions } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/institutions`, fetcher);

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            <Head>
                <title>Manage Institution • Qarrington</title>
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

                                    {institutions && institutions.slice(0, 1).map(({ _id, institutionSlides }) => (
                                        <>
                                            <Carousel>
                                                {institutionSlides && institutionSlides.map(({ _id, slideName, slideCount, slideButton, slideRoute, slideDetail, slideTooltip }) => (
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
                                                <TabLabel label="Settings" value="1" />
                                                <TabLabel label="Underwriters" value="2" />
                                                <TabLabel label="Invitations" value="3" />
                                            </TabsWrapper>
                                        </Box>

                                        <Box style={{ marginTop: '16px' }}>

                                            {/* settings tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="1">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        One of the best things about Qarrington is the fact that we do not collect sensitive data in the frontend. We only do so in the backend.
                                                    </Typography>
                                                </Card>

                                                {institutions && institutions.slice(0, 1).map(({ _id, institutionProfile, institutionSlug }) => (

                                                    <>
                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileName}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileMarket}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileLogo}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileWebsite}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileSize}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionSlug}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </Card>

                                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileHeadline}
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip title="hint" placement="top">
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        placeholder="item"
                                                                        defaultValue={institutionProfile.profileDescription}
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
                                                        Savew
                                                    </Button>
                                                </Card>

                                                <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                    <Typography variant="body2">
                                                        Kindly note that it is very important to copy your secretToken and save it somewhere safe. If you lose, forget, or can't remember your accessToken, you can use your secretToken to recover your account. However, if you lose your secretToken, you'd be required to create a new Qarrington account. With that being said, kindly use your unique [ <b>https://qarrington.com/u/qid</b> ] invitation link to invite as many contacts as you can. Each time you refer an active contact, Qarrington will reward you and the contact with 1 Qarrington draft each.
                                                    </Typography>
                                                </Box>

                                            </TabPanel>

                                            {/* settings tab stops */}

                                            {/* underwriters tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="2">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        One of the best things about Qarrington is the fact that we do not collect sensitive data in the frontend. We only do so in the backend.
                                                    </Typography>
                                                </Card>

                                                <Grid item xs={12} mb={2}>
                                                    <Grid container spacing={1}>

                                                        {institutions && institutions.slice(0, 1).map(({ _id, institutionUnderwriters }) => (
                                                            <>
                                                                {institutionUnderwriters && institutionUnderwriters.map(({ _id, underwriterFirstName, underwriterTitle, underwriterAvatar, underwriterIsActive }) => (

                                                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
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
                                                                                        anchorOrigin={{
                                                                                            vertical: 'bottom',
                                                                                            horizontal: 'right'
                                                                                        }}
                                                                                        variant={underwriterIsActive}
                                                                                    >
                                                                                        <Avatar
                                                                                            style={{ width: 50, height: 50 }}
                                                                                            alt={underwriterFirstName}
                                                                                            src={underwriterAvatar}
                                                                                        />
                                                                                    </StyledBadge>
                                                                                </Stack>
                                                                            </Box>
                                                                            <Box style={{ textAlign: 'center' }}>
                                                                                <Box mt={1.5}>
                                                                                    <Typography variant="h5" fontWeight={700}>
                                                                                        {underwriterFirstName}
                                                                                    </Typography>
                                                                                    <Typography variant="body2" fontWeight={500} color="secondary">
                                                                                        {underwriterTitle}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Card>
                                                                    </Grid>

                                                                ))}
                                                            </>
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

                                            {/* underwriters tab stops */}

                                            {/* invitations tab starts */}

                                            <TabPanel sx={{ padding: 0 }} value="3">

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                                        svioa one of the best Qarrington is the fact that we do not collect sensitive data in the frontend. We only do so in the backend.
                                                    </Typography>
                                                </Card>

                                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                                        <Tooltip title="hint" placement="top">
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                placeholder="Underwriter Email"
                                                                inputProps={{ style: { textAlign: 'center' } }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip title="hint" placement="top">
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                placeholder="Underwriter Role"
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
                                                        invite
                                                    </Button>
                                                </Card>

                                                <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                                    <Typography variant="body2">
                                                        saviooo note that it is very important to copy your secretToken and save it somewhere safe. If you lose, forget, or can't remember your accessToken, you can use your secretToken to recover your account. However, if you lose your secretToken, you'd be required to create a new Qarrington account. With that being said, kindly use your unique [ <b>https://qarrington.com/u/qid</b> ] invitation link to invite as many contacts as you can. Each time you refer an active contact, Qarrington will reward you and the contact with 1 Qarrington draft each.
                                                    </Typography>
                                                </Box>

                                            </TabPanel>

                                            {/* invitations tab stops */}

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

export async function getServerSideProps({ params }) {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/institutions?institutionSlug=${params.institutionId.replace(/\-/g, '+')}`)
            .then((r) => r.json());
        return {
            props: {
                slug: results.institutionSlug
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