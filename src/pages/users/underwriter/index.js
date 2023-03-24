import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { pink } from '@mui/material/colors';
import Navbar from '../../../components/topics/Navbar';
import Footer from '../../../components/topics/Footer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';

const Page = () => {

    return (

        <>

            <Head>
                <title>How to Use Qarrington as a SaaS Underwriter • Qarrington</title>
                <meta
                    name="description"
                    content={`A SaaS Underwriter is a startup incubator, accelerator, angel, advisor, or investor with an innovative portfolio of early-stage startup companies.`}
                />
            </Head>

            <Grid style={{ backgroundColor: '#fff' }}>

                <Navbar />

                <Container style={{ backgroundColor: '#fff' }}>
                    <Grid container spacing={2}>

                        <Grid item xs>
                            {/* <LeftSide /> */}
                        </Grid>

                        <Grid my={8} item xs={7}>

                            <Box style={{ padding: '0px 0px 0px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    How to use Qarrington as a SaaS Underwriter.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    A SaaS Underwriter is a startup incubator, accelerator, angel, advisor, or investor with an innovative portfolio of early-stage startup companies.
                                </Typography>
                            </Box>

                            {/* card starts */}

                            <Grid item xs={12} my={4}>
                                <Grid container spacing={1}>

                                    {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                            <Link href={`/account`}>
                                                <Card style={{ padding: '50px', cursor: 'pointer' }}>
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
                                            </Link>
                                        </Grid>
                                    ))}

                                </Grid>
                            </Grid>

                            {/* card ends */}

                            {/* footer starts */}

                            <Footer />

                            {/* footer ends */}

                        </Grid>

                        <Grid item xs>
                            {/* <RightSide /> */}
                        </Grid>

                    </Grid>
                </Container>
            </Grid >

        </>

    )
}

export default Page

const arrayItems = [
    {
        _id: 1,
        icon: <AccountCircleIcon color="primary" sx={{ fontSize: '40px', color: pink[200] }} />,
        title: "Open",
        detail: "Create a Qarrington account, it's free.",
        tooltip: ""
    },
    {
        _id: 2,
        icon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '40px', color: pink[800] }} />,
        title: "Connect",
        detail: "Link your preferred bank account.",
        tooltip: ""
    },
    {
        _id: 3,
        icon: <AddCircleRoundedIcon color="primary" sx={{ fontSize: '40px', color: pink[400] }} />,
        title: "List",
        detail: "Submit a startup company for listing.",
        tooltip: ""
    }
]