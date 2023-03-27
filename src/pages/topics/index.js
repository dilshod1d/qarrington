import React from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import Navbar from '../../components/topics/Navbar';
import Admin from '../../components/topics/Admin';
import Company from '../../components/topics/Company';
import Footer from '../../components/topics/Footer';
import { Box, Card, Container, Grid, ListItem, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: briefs } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/briefs`, fetcher);

    return (

        <div>

            <Head>
                <title>Topics • Qarrington</title>
                <meta
                    name="description"
                    content="It's easy to find topical answers to all types of questions about using Qarrington. Alternatively, you can contact our account managers for 24/7 support."
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
                                                    placeholder="Search from more than 872 topics ..."
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