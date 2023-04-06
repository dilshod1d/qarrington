import React from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import TopicNavbar from '../../../components/navbar/TopicNavbar';
import MainLeftbar from '../../../components/leftbar/MainLeftbar';
import MainRightbar from '../../../components/rightbar/MainRightbar';
import DisclaimerFooter from '../../../components/footer/DisclaimerFooter';
import { Box, Card, Container, Grid, ListItem, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';
import dbConnect from "@lib/dbConnect";
import Topic from '@models/topic/Topic';
import ReactMarkdown from 'react-markdown';


const Page = ({ slug, title, detail }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: briefs } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/briefs`, fetcher);

    return (

        <div>

            <Head>
                <title>{title} • Qarrington</title>
                <meta
                    name="description"
                    content={detail}
                />
            </Head>

            <TopicNavbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <MainLeftbar />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                            <Card style={{ padding: '60px', backgroundColor: 'black', color: 'white', marginBottom: '10px' }}>
                                    <ListItem disablePadding>
                                        <Tooltip title="Contact" placement="top">
                                            <Grid item xs={12} md={6} lg={2} display="flex" justifyContent="flex-end">
                                                <ListItemIcon sx={{ color: '#7bed9f', cursor: 'pointer' }}>
                                                    <Link href="/topics/contact">
                                                        <RoomPreferencesRoundedIcon />
                                                    </Link>
                                                </ListItemIcon>
                                            </Grid>
                                        </Tooltip>
                                        <Grid item xs={12} md={6} lg={8} display="flex" justifyContent="center">
                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    placeholder="Search from more than 48 briefs ..."
                                                    inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Tooltip title="Compare" placement="top">
                                            <Grid item xs={12} md={6} lg={2} display="flex" justifyContent="flex-end">
                                                <ListItemIcon sx={{ color: '#7bed9f', cursor: 'pointer' }}>
                                                    <Link href="/topics/compare">
                                                        <MeetingRoomRoundedIcon />
                                                    </Link>
                                                </ListItemIcon>
                                            </Grid>
                                        </Tooltip>
                                    </ListItem>
                                </Card>

                                {briefs && Array.isArray(briefs) && briefs?.slice(0, 3).map(({ _id, briefSlug, briefTitle, briefDetail, briefSummary, briefTopicId, briefPostedAt }) => (
                                    <Grid key={_id} item xs={12}>
                                        <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                            <Link href={`/topics/topicSlug/${briefSlug}`}>
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

const ItemTitle = {
    cursor: 'pointer',
    color: '#000000',
    '&:hover': {
        color: '#2ed573'
    }
};

export async function getStaticProps({ params }) {
    await dbConnect()
    const topicItem = await Topic.findOne({ topicSlug: params.topicId });
    return {
        props: {
            slug: topicItem.topicSlug,
            title: topicItem.topicTitle,
            detail: topicItem.topicDetail
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    await dbConnect()
    const topicItems = await Topic.find();
    return {
        paths: topicItems.map(item => {
            const topicId = item.topicSlug;
            return {
                params: {
                    topicId
                }
            }
        }),
        fallback: false
    }
}