import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/dashboard/Navbar';
import Admin from '../../../components/dashboard/Admin';
import Company from '../../../components/dashboard/Company';
import Footer from '../../../components/dashboard/Footer';
import { Box, Card, Container, Grid, ListItem, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Topics • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
                />
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <Admin />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mt={12} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', backgroundColor: 'black', color: 'white', marginBottom: '10px' }}>
                                    <ListItem disablePadding>
                                        <Tooltip title="Post" placement="top">
                                            <Grid item xs={12} md={6} lg={2} display="flex" justifyContent="flex-end">
                                                <ListItemIcon sx={{ color: '#7bed9f', cursor: 'pointer' }}>
                                                    <Link href="/dashboard/topics/manage">
                                                        <AddCircleRoundedIcon />
                                                    </Link>
                                                </ListItemIcon>
                                            </Grid>
                                        </Tooltip>
                                        <Grid item xs={12} md={6} lg={8} display="flex" justifyContent="center">
                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    placeholder="Search from more than 885 topics ..."
                                                    inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Tooltip title="Read" placement="top">
                                            <Grid item xs={12} md={6} lg={2} display="flex" justifyContent="flex-end">
                                                <ListItemIcon sx={{ color: '#7bed9f', cursor: 'pointer' }}>
                                                    <Link href="/topics">
                                                        <AccessTimeFilledRoundedIcon />
                                                    </Link>
                                                </ListItemIcon>
                                            </Grid>
                                        </Tooltip>
                                    </ListItem>
                                </Card>

                                {topics && Array.isArray(topics) && topics?.slice(0, 3).map(({ _id, topicUrl, topicTags, topicTitle, topicDetail, topicSummary, topicPostedAt }) => (
                                    <Grid item xs={12}>
                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                            <Link href={`/dashboard/topics/manage`}>
                                                <Typography textAlign="center" sx={ItemTitle} variant="h4" color="black" fontWeight={800}>
                                                    {topicTitle}?
                                                </Typography>
                                            </Link>
                                        </Card>
                                    </Grid>
                                ))}

                                <Grid mt={2} item xs={12}>
                                    <Box spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Pagination count={10} variant="outlined" shape="rounded" />
                                    </Box>
                                </Grid>

                                <Footer />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Company />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page

const ItemTitle = {
    cursor: 'pointer',
    color: '#000000',
    '&:hover': {
        color: '#2ed573'
    }
};

const topics = [
    {
        _id: 1,
        topicUrl: "what-is-qarrington",
        topicTags: [
            {
                topicTagName: "platform"
            },
            {
                topicTagName: "marketplace"
            },
            {
                topicTagName: "company"
            }
        ],
        topicTitle: "What is Qarrington",
        topicDetail: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions. Imagine a stock exchange such as Nasdaq, where company shares are bought and sold, however, instead of shares, it's subscriptions, which are fully backed by products and services offered by the listed companies on Qarrington.",
        topicSummary: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions.",
        topicPostedAt: "Fri, Apr 25, 2023, 11:45 PM"
    },
    {
        _id: 2,
        topicUrl: "what-does-qarrington-do",
        topicTags: [
            {
                topicTagName: "platform"
            },
            {
                topicTagName: "marketplace"
            },
            {
                topicTagName: "company"
            }
        ],
        topicTitle: "What does Qarrington do",
        topicDetail: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions. Imagine a stock exchange such as Nasdaq, where company shares are bought and sold, however, instead of shares, it's subscriptions, which are fully backed by products and services offered by the listed companies on Qarrington.",
        topicSummary: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions.",
        topicPostedAt: "Fri, Apr 25, 2023, 11:45 PM"
    },
    {
        _id: 3,
        topicUrl: "why-was-qarrington-created",
        topicTags: [
            {
                topicTagName: "platform"
            },
            {
                topicTagName: "marketplace"
            },
            {
                topicTagName: "company"
            }
        ],
        topicTitle: "Why was Qarrington created",
        topicDetail: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions. Imagine a stock exchange such as Nasdaq, where company shares are bought and sold, however, instead of shares, it's subscriptions, which are fully backed by products and services offered by the listed companies on Qarrington.",
        topicSummary: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions.",
        topicPostedAt: "Fri, Apr 25, 2023, 11:45 PM"
    }
]