import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import LeftGrid from '../../../components/grids/LeftGrid';
import RightGrid from '../../../components/grids/RightGrid';
import { Badge, Box, Button, Card, Container, Grid, Stack, styled, Tooltip, Typography } from '@mui/material';
import Footer from '../../../components/main/Footer';
import useSWR from 'swr';

const Page = ({ balance, units, price, cost, name, ticker, slug }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: pulls } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls`, fetcher);

    return (

        <div>

            <Head>
                <title>{ticker} • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies without fees."
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

                                    <Box textAlign="center" sx={{ marginBottom: '16px' }}>
                                        <Grid item xs={12} sm={6} md={6} lg={12}>
                                            <Card style={{ padding: '80px' }}>
                                                <Tooltip title={`This is the balance of ${name} subscriptions that you currently own.`} placement="top">
                                                    <Box textAlign="center">
                                                        <DraftBadge badgeContent="USD" color="success" fontWeight={700}>
                                                        </DraftBadge>
                                                        <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                                            {balance}
                                                        </Typography>
                                                    </Box>
                                                </Tooltip>
                                                <Box textAlign="center" mt={1}>
                                                    <Tooltip title="Pulled Price" placement="bottom">
                                                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                            {cost}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        usd
                                                    </Typography>
                                                    <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        /
                                                    </Typography>
                                                    <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                        {units}
                                                    </Typography>
                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        units
                                                    </Typography>
                                                    <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        \
                                                    </Typography>
                                                    <Tooltip title="Current Price" placement="bottom">
                                                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                            {price}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                        usd
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    </Box>

                                    <Card style={{ padding: '60px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>

                                            <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                                <Link href={`/subscription/${slug}/pull`}>
                                                    <Button
                                                        size="large"
                                                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '13px' }}
                                                        variant="contained"
                                                        fullWidth={true}
                                                    >
                                                        Pull
                                                    </Button>
                                                </Link>
                                                <Link href={`/subscription/${slug}/push`}>
                                                    <Button
                                                        size="large"
                                                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '13px' }}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                    >
                                                        Push
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Card>

                                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Typography variant="body2">
                                            Unlike stocks and cryptos that are backed literally with nothing, your subscriptions with a Qarrington company are backed by the underlying products of the company. With that being said, kindly keep in mind that subscriptions only give you access to a company's products and services, they neither represent investment nor ownership stakes in the firm, which in this case is, {name}.
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

const DraftBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export async function getServerSideProps({ params }) {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/pulls?pullSlug=${params.subscriptionId.replace(/\-/g, '+')}`)
            .then((r) => r.json());
        return {
            props: {
                balance: results.pullSubscription.subscriptionBalance,
                units: results.pullSubscription.subscriptionUnits,
                price: results.pullPrice,
                cost: results.pullRequests.requestPrice,
                name: results.pullSubscription.subscriptionName,
                ticker: results.pullSubscription.subscriptionTicker,
                slug: results.pullSlug
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}