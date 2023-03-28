import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainNavbar from '../../components/navbar/MainNavbar';
import MainLeftbar from '../../components/leftbar/MainLeftbar';
import MainRightbar from '../../components/rightbar/MainRightbar';
import DisclaimerFooter from '../../components/footer/DisclaimerFooter';
import { blue } from '@mui/material/colors';
import { Avatar, Box, Card, Container, Grid, Tooltip, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Compare • Qarrington</title>
                <meta
                    name="description"
                    content="If you're not convinced yet, see how Qarrington compares with several alternatives such as stock and cryptocurrency exchanges."
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
                                        If you're not convinced yet, see how Qarrington compares with several alternatives such as stock and cryptocurrency exchanges.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {exchanges && Array.isArray(exchanges) && exchanges.map(({ _id, exchangeLogo, exchangeName, exchangeType, exchangeDetail }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                <Tooltip title={exchangeDetail} placement="top">
                                                    <Card style={{ padding: '40px' }}>
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Avatar
                                                                style={{ width: 40, height: 40 }}
                                                                alt={exchangeName}
                                                                src={exchangeLogo}
                                                            />
                                                        </Box>
                                                    </Card>
                                                </Tooltip>
                                            </Grid>
                                        ))}

                                        {compares && Array.isArray(compares) && compares.map(({ _id, compareRewards }) => (
                                            <>
                                                {compareRewards && Array.isArray(compareRewards) && compareRewards.map(({ _id, compareRewardName }) => (
                                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                        <Card style={{ padding: '40px' }}>
                                                            <Box mt={1} style={{ textAlign: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                                        {compareRewardName}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </>
                                        ))}

                                        {compares && Array.isArray(compares) && compares.map(({ _id, compareRisks }) => (
                                            <>
                                                {compareRisks && Array.isArray(compareRisks) && compareRisks.map(({ _id, compareRiskName }) => (
                                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                        <Card style={{ padding: '40px' }}>
                                                            <Box mt={1} style={{ textAlign: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                                        {compareRiskName}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </>
                                        ))}

                                        {compares && Array.isArray(compares) && compares.map(({ _id, compareBacks }) => (
                                            <>
                                                {compareBacks && Array.isArray(compareBacks) && compareBacks.map(({ _id, compareBackName }) => (
                                                    <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                        <Card style={{ padding: '40px' }}>
                                                            <Box mt={1} style={{ textAlign: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                                        {compareBackName}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </>
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

const exchanges = [
    {
        exchangeLogo: "/assets/media/comparisons/qarrington.png",
        exchangeName: "Qarrington",
        exchangeType: "Subscriptions",
        exchangeDetail: "Qarrington is a subscription exchange, where the subscriptions of early-stage startups are bought & sold by end users."
    },
    {
        exchangeLogo: "/assets/media/comparisons/nasdaq.png",
        exchangeName: "Nasdaq",
        exchangeType: "Stocks",
        exchangeDetail: "Nasdaq is a stock exchange that allows retail investors to buy, sell, and trade the shares of publicly-listed companies."
    },
    {
        exchangeLogo: "/assets/media/comparisons/coinbase.png",
        exchangeName: "Coinbase",
        exchangeType: "Cryptocurrencies",
        exchangeDetail: "Coinbase is a cryptocurrency exchange, where retail investors can buy, sell, and transfer the coins of blockchain projects."
    }
]

const compares = [
    {
        compareRewards: [
            {
                compareRewardKey: "Qarrington",
                compareRewardName: "Moderate Rewards"
            },
            {
                compareRewardKey: "Nasdaq",
                compareRewardName: "High Rewards"
            },
            {
                compareRewardKey: "Coinbase",
                compareRewardName: "Highest Rewards"
            }
        ],
        compareRisks: [
            {
                compareRiskKey: "Qarrington",
                compareRiskName: "Fewer Risks"
            },
            {
                compareRiskKey: "Nasdaq",
                compareRiskName: "Higher Risks"
            },
            {
                compareRiskKey: "Coinbase",
                compareRiskName: "Highest Risks"
            }
        ],
        compareBacks: [
            {
                compareBackKey: "Qarrington",
                compareBackName: "Product Backed"
            },
            {
                compareBackKey: "Nasdaq",
                compareBackName: "Zero Backed"
            },
            {
                compareBackKey: "Coinbase",
                compareBackName: "Zero Backed"
            }
        ]
    }
]