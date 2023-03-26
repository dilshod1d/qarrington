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
                <title>Briefs • Qarrington</title>
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
                                                    <Link href="/dashboard/briefs/manage">
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
                                                    placeholder="Search from more than 24 briefs ..."
                                                    inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Tooltip title="Read" placement="top">
                                            <Grid item xs={12} md={6} lg={2} display="flex" justifyContent="flex-end">
                                                <ListItemIcon sx={{ color: '#7bed9f', cursor: 'pointer' }}>
                                                    <Link href="/briefs">
                                                        <AccessTimeFilledRoundedIcon />
                                                    </Link>
                                                </ListItemIcon>
                                            </Grid>
                                        </Tooltip>
                                    </ListItem>
                                </Card>

                                {briefs && Array.isArray(briefs) && briefs?.slice(0, 3).map(({ _id, briefUrl, briefTags, briefTitle, briefDetail, briefSummary, briefPostedAt }) => (
                                    <Grid item xs={12}>
                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                            <Link href={`/dashboard/briefs/manage`}>
                                                <Typography textAlign="center" sx={ItemTitle} variant="h4" color="black" fontWeight={800}>
                                                    {briefTitle}?
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

const briefs = [
    {
        _id: 1,
        briefUrl: "what-is-qarrington",
        briefTags: [
            {
                briefTagName: "platform"
            },
            {
                briefTagName: "marketplace"
            },
            {
                briefTagName: "company"
            }
        ],
        briefTitle: "What is Qarrington",
        briefDetail: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions. Imagine a stock exchange such as Nasdaq, where company shares are bought and sold, however, instead of shares, it's subscriptions, which are fully backed by products and services offered by the listed companies on Qarrington.",
        briefSummary: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions.",
        briefPostedAt: "Fri, Apr 25, 2023, 11:45 PM"
    },
    {
        _id: 2,
        briefUrl: "what-does-qarrington-do",
        briefTags: [
            {
                briefTagName: "platform"
            },
            {
                briefTagName: "marketplace"
            },
            {
                briefTagName: "company"
            }
        ],
        briefTitle: "What does Qarrington do",
        briefDetail: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions. Imagine a stock exchange such as Nasdaq, where company shares are bought and sold, however, instead of shares, it's subscriptions, which are fully backed by products and services offered by the listed companies on Qarrington.",
        briefSummary: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions.",
        briefPostedAt: "Fri, Apr 25, 2023, 11:45 PM"
    },
    {
        _id: 3,
        briefUrl: "why-was-qarrington-created",
        briefTags: [
            {
                briefTagName: "platform"
            },
            {
                briefTagName: "marketplace"
            },
            {
                briefTagName: "company"
            }
        ],
        briefTitle: "Why was Qarrington created",
        briefDetail: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions. Imagine a stock exchange such as Nasdaq, where company shares are bought and sold, however, instead of shares, it's subscriptions, which are fully backed by products and services offered by the listed companies on Qarrington.",
        briefSummary: "Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions.",
        briefPostedAt: "Fri, Apr 25, 2023, 11:45 PM"
    }
]