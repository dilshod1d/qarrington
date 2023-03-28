import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
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
                <title>Raise • Qarrington</title>
                <meta
                    name="description"
                    content="If you're a founder looking forward to raising funds through an ISO, kindly go through an underwriter and then follow the below steps."
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
                                        If you're a founder looking forward to raising funds through an ISO, kindly go through an underwriter and then follow the below steps.
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
        icon: <LooksOneRoundedIcon color="primary" sx={{ fontSize: '40px', color: blue[200] }} />,
        title: "Onboard",
        detail: "Whitelist users for your company's ISO.",
        tooltip: "You are required to have whitelisted a minimum of 1,000 subscribers before your company's ISO can be launched."
    },
    {
        _id: 2,
        icon: <LooksTwoRoundedIcon color="primary" sx={{ fontSize: '40px', color: blue[800] }} />,
        title: "Push",
        detail: "Sell subscriptions to the invited users.",
        tooltip: "Once your company's ISO is launched, your company's initial subscriptions can only be sold to whitelisted subscribers."
    },
    {
        _id: 3,
        icon: <Looks3RoundedIcon color="primary" sx={{ fontSize: '40px', color: blue[400] }} />,
        title: "Receive",
        detail: "Receive proceeds after the ISO launch.",
        tooltip: "You'd get up to 90% of the ISO proceeds. So, it'd only cost you a 10% platform fee and a 10% underwriter fee; if applicable."
    }
]