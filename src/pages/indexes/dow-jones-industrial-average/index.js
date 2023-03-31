import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Container, Grid, Stack, styled, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';
import StockStoryGuideSlide from '../../../components/slide/StockStoryGuideSlide';

const Page = () => {

    return (

        <>

            <Head>
                <title>How Subscriptions Can Outperform the Dow Jones Industrial Average • Qarrington</title>
                <meta
                    name="description"
                    content={`Buy & sell the subscriptions of innovative startups just like the Dow Jones Industrial Average. However, instead of shares, it's product-backed subscriptions.`}
                />
            </Head>

            <MainContent style={Body}>

                <Grid
                    container
                    sx={{ height: '100%' }}
                    alignItems="stretch"
                    spacing={0}
                >

                    {/* left container starts */}

                    <Grid
                        xs={12}
                        md={6}
                        alignItems="center"
                        display="flex"
                        justifyContent="center"
                        item
                    >
                        <Container maxWidth="sm">

                            <Box style={{ textAlign: 'center' }}>

                                <Box
                                    style={{
                                        display: 'flex',
                                        cursor: 'pointer',
                                        marginBottom: '20px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Avatar
                                        style={{ width: 40, height: 40 }}
                                        alt="Qarrington Logo"
                                        src="/assets/media/companies/qarrington.png"
                                    />
                                </Box>

                                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                                    How subscriptions can outperform the DJIA
                                    <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                                        <InfoRoundedIcon fontSize="small" color="primary" />
                                    </Tooltip>
                                </Typography>

                                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                                    We're building a subscription exchange, where you can buy & sell the subscriptions of startup companies. It's like the DJIA stocks, but instead of shares, it's product-backed subscriptions.
                                </Typography>

                            </Box>

                            <form noValidate autoComplete="on">

                                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                                    <Stack spacing={1.2} sx={{ width: '100%' }}>

                                        <Link href="/account/access">
                                            <Button
                                                size="large"
                                                sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                variant="outlined"
                                                fullWidth={true}
                                            >
                                                i'm a qarrington
                                            </Button>
                                        </Link>

                                        <Link href="/account/open">
                                            <Button
                                                size="large"
                                                sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                                variant="contained"
                                                fullWidth={true}
                                            >
                                                i'm not a qarrington yet
                                            </Button>
                                        </Link>

                                    </Stack>

                                </Box>

                                <Breadcrumbs separator="/" aria-label="breadcrumb"
                                    sx={{
                                        "& ol": {
                                            justifyContent: "center",
                                            margin: "auto",
                                            mt: "20px"
                                        }
                                    }}>
                                    <Typography variant="body2" fontWeight={700} color="secondary">
                                        lower fees
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="secondary">
                                        global coverage
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="secondary">
                                        fewer risks
                                    </Typography>

                                </Breadcrumbs>

                                <Box textAlign="center">
                                    <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                                        Once you log in to your account, kindly provide all the necessary account details and contacts for smooth payouts. Otherwise, your future payouts might be delayed.
                                    </Typography>
                                </Box>

                            </form>

                        </Container>
                    </Grid>

                    {/* left container ends */}

                    {/* right container starts */}

                    <StockStoryGuideSlide />

                    {/* right container ends */}

                </Grid>
            </MainContent>

        </>

    );

}

export default Page;

const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const Body = {
    backgroundColor: "#ffffff"
};