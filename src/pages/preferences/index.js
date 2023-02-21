import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Box, Card, Container, Grid, Tooltip, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import useSWR from 'swr';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/languages`, fetcher)

    return (

        <div>

            <Head>
                <title>Preferences • Qarrington</title>
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

                                        {data && data.map(({ _id, code, title }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={3}>
                                                <Link href={`${code}`}>
                                                    <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                        <Tooltip title="Account Targets are calculated as the Account Charge of your chosen Account Type X the Account Units X 200 Percent." placement="top">
                                                            <>
                                                                <Box style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    <Typography variant="body" fontWeight="600" color="black" gutterBottom>
                                                                        {title}
                                                                    </Typography>
                                                                </Box>
                                                                <Box style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    <Typography variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                                                                        {code}
                                                                    </Typography>
                                                                </Box>
                                                            </>
                                                        </Tooltip>
                                                    </Card>
                                                </Link>
                                            </Grid>
                                        ))}

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