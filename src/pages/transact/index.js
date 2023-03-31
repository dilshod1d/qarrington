import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { orange } from '@mui/material/colors';
import MainNavbar from '../../components/navbar/MainNavbar';
import MainLeftbar from '../../components/leftbar/MainLeftbar';
import MainRightbar from '../../components/rightbar/MainRightbar';
import DisclaimerFooter from '../../components/footer/DisclaimerFooter';
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';
import { Box, Card, Container, Grid, Tooltip, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Transact • Qarrington</title>
                <meta
                    name="description"
                    content="If you'd like to jump-start your subscription portfolio, kindly follow the below steps on how to buy, sell, and transfer subscriptions."
                />
            </Head>

            <MainNavbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <MainLeftbar />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                        If you'd like to jump-start your subscription portfolio, kindly follow the below steps on how to buy, sell, and transfer subscriptions.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                <Link href={`/qa`}>
                                                    <Tooltip title={tooltip} placement="top">
                                                        <Card style={{ padding: '35px', cursor: 'pointer' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                {icon}
                                                            </Box>
                                                            <Box mt={1} style={{ textAlign: 'center' }}>
                                                                <Box mb={1}>
                                                                    <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                                        {title}
                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                                        {detail}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Tooltip>
                                                </Link>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>

                                <DisclaimerFooter />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <MainRightbar />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page

const arrayItems = [
    {
        _id: 1,
        icon: <LooksOneRoundedIcon color="primary" sx={{ fontSize: '40px', color: orange[200] }} />,
        title: "Open",
        detail: "Create a Qarrington account, it's free.",
        tooltip: "Whether you're an underwriter, a founder, or an end user, you're required to have a verified Qarrington account."
    },
    {
        _id: 2,
        icon: <LooksTwoRoundedIcon color="primary" sx={{ fontSize: '40px', color: orange[800] }} />,
        title: "Connect",
        detail: "Link your preferred bank account.",
        tooltip: "Each time you sell subscriptions, the subscription payouts will automatically be sent to your linked bank account."
    },
    {
        _id: 3,
        icon: <Looks3RoundedIcon color="primary" sx={{ fontSize: '40px', color: orange[400] }} />,
        title: "Pull",
        detail: "Buy subscriptions during/after an ISO.",
        tooltip: "You can always buy/pull subscriptions, but your account must be verified before you can create a sell/push request."
    }
]