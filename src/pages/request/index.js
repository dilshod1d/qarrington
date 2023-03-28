import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { purple } from '@mui/material/colors';
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
                <title>Request • Qarrington</title>
                <meta
                    name="description"
                    content="If you'd like to integrate the world's largest subscription data into your platform, kindly follow the below steps to get started today."
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
                                        If you'd like to integrate the world's largest subscription data into your platform, kindly follow the below steps to get started today.
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
        icon: <LooksOneRoundedIcon color="primary" sx={{ fontSize: '40px', color: purple[200] }} />,
        title: "Select",
        detail: "Choose the plan that fits your needs.",
        tooltip: "You can select the monthly subscription data plan that best describes the use cases of your products or business."
    },
    {
        _id: 2,
        icon: <LooksTwoRoundedIcon color="primary" sx={{ fontSize: '40px', color: purple[800] }} />,
        title: "Call",
        detail: "Make API calls to get subscription data.",
        tooltip: "Based on your current plan, you can make calls to our REST API to get timely, reliable, and accurate subscription data."
    },
    {
        _id: 3,
        icon: <Looks3RoundedIcon color="primary" sx={{ fontSize: '40px', color: purple[400] }} />,
        title: "Manage",
        detail: "Integrate the data into your products.",
        tooltip: "You can use the subscription data from our REST API to facilitate commercial and non-commercial use cases."
    }
]