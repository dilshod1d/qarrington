import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/topics/Navbar';
import Footer from '../../components/topics/Footer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';

const Page = () => {

    return (

        <>

            <Head>
                <title>Cryptos • Qarrington</title>
                <meta
                    name="description"
                    content={`Buy, sell, & transfer the subscriptions of innovative startup companies. It's like buying cryptos, but instead of coins, it's product-backed subscriptions.`}
                />
            </Head>

            <Navbar />

            <Grid style={{ backgroundColor: '#fff' }}>
                <Container style={{ backgroundColor: '#fff' }}>
                    <Grid container spacing={2}>

                        <Grid item xs>
                            {/* <LeftSide /> */}
                        </Grid>

                        <Grid my={8} item xs={7}>

                            <Box style={{ padding: '100px 0px 0px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    How subscriptions can outperform the crypto market in the future.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    Buy, sell, and transfer the subscriptions of innovative startup companies. It's like buying cryptos, but instead of coins, it's product-backed subscriptions.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                    Technically, the cryptocurrency market is an innovative space that is believed to play a critical role in the future financial market in several countries. Even though the rewards can be enormous, the risks involved are considered to outweigh the returns. With that being said, since subscriptions are mostly used to access digital products rather than for investment purposes, the rewards and risks involved in buying the subscriptions of an early-stage startup company are usually moderate.
                                </Typography>
                                <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                    The introduction of a cryptocurrency i.e. bitcoin is an amazing mechanism for the global economy, but there's no single use case for the asset other than for investment purposes, which makes bitcoin and every single cryptocurrency to be radically volatile. Not only that subscriptions can be bought, sold, and transferred, but they can also be used to access problem-solving products.
                                </Typography>
                            </Box>

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