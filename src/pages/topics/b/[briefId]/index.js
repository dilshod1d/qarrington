import React from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import Navbar from '../../../../components/topics/Navbar';
import Admin from '../../../../components/topics/Admin';
import Company from '../../../../components/topics/Company';
import Footer from '../../../../components/topics/Footer';
import { Box, Card, Container, Grid, ListItem, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import dbConnect from "@lib/dbConnect";
import Topic from '@models/topic/Topic';
import Divider from '@mui/material/Divider';

const Page = ({ url, title, detail, summary, postedAt }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: topics } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics`, fetcher);

    return (

        <div>

            <Head>
                <title>{title} • Qarrington</title>
                <meta
                    name="description"
                    content={summary}
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

                                {/* <Card style={{ padding: '60px', backgroundColor: 'black', color: 'white', marginBottom: '10px' }}>
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
                                                    placeholder="Search from more than 24 topics ..."
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
                                </Card> */}

                                <Grid item xs={12}>
                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Typography variant="h1" fontWeight={700} color="black">
                                            {title}
                                        </Typography>
                                    </Card>
                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Typography variant="h5" fontWeight={500} color="secondary">
                                            {summary}
                                        </Typography>
                                    </Card>
                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                            {detail}
                                        </Typography>
                                    </Card>
                                </Grid>

                                {/* <Box style={{ padding: '0px 0px 0px 0px' }}>
                                    <Typography variant="h1" fontWeight={700} color="black">
                                        {title}
                                    </Typography>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                        {summary}
                                    </Typography>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                        {detail}
                                    </Typography>
                                </Box> */}

                                {/* <Grid mt={2} item xs={12}>
                                    <Box spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Pagination count={10} variant="outlined" shape="rounded" />
                                    </Box>
                                </Grid> */}

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

export async function getStaticProps({ params }) {
    await dbConnect()
    const topicItem = await Topic.findOne({ topicUrl: params.topicId });
    return {
        props: {
            url: topicItem.topicUrl,
            title: topicItem.topicTitle,
            detail: topicItem.topicDetail,
            summary: topicItem.topicSummary,
            postedAt: topicItem.topicPostedAt
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    await dbConnect()
    const topicItems = await Topic.find();
    return {
        paths: topicItems.map(item => {
            const topicId = item.topicUrl;
            return {
                params: {
                    topicId
                }
            }
        }),
        fallback: false
    }
}