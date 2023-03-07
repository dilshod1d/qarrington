import React from 'react';
import Head from 'next/head';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, Pagination, Stack, styled, Tooltip, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import useSWR from 'swr';
import Link from 'next/link';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

    return (

        <div>

            <Head>
                <title>Subscriptions • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <HeaderMenu />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={9} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {companies && companies.map(({ _id, companyTicker, companyListing, companyKpi }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                <Link href={`/subscriptions/${companyTicker}`}>
                                                    <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Avatar
                                                                style={{ width: 40, height: 40 }}
                                                                alt={companyListing.companyName}
                                                                src={companyListing.companyLogo}
                                                            />
                                                        </Box>
                                                        <Box style={{ textAlign: 'center' }}>
                                                            <Tooltip title={companyListing.companyName} placement="top">
                                                                <Box>
                                                                    {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyPrice, companyPricePercentChange, companyPricePointChange }) => (
                                                                        <>
                                                                            <Box textAlign="center" mt={1.5} mb={0.5}>
                                                                                <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                                                    {companyPrice}
                                                                                </Typography>
                                                                                <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                                    usd
                                                                                </Typography>
                                                                                <Typography component="span" mx={0.5} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                                    /
                                                                                </Typography>
                                                                                <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                                                    {companyPricePercentChange}
                                                                                </Typography>
                                                                                <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                                    %
                                                                                </Typography>
                                                                                <Typography component="span" mx={0.5} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                                    \
                                                                                </Typography>
                                                                                <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                                                                    {companyPricePointChange}
                                                                                </Typography>
                                                                                <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                                    pts
                                                                                </Typography>
                                                                            </Box>
                                                                            <Box>
                                                                                <Typography textTransform="uppercase" variant="body" fontWeight={700} color="secondary">
                                                                                    {companyTicker}
                                                                                </Typography>
                                                                            </Box>
                                                                        </>
                                                                    ))}
                                                                </Box>

                                                            </Tooltip>
                                                        </Box>
                                                    </Card>
                                                </Link>
                                            </Grid>
                                        ))}

                                        <Grid item xs={12}>
                                            <Box spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Pagination count={10} variant="outlined" shape="rounded" />
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Footer />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <RightGrid />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page