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
import Brief from '@models/brief/Brief';
import Divider from '@mui/material/Divider';

const Page = ({ url, title, detail, summary, postedAt }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: briefs } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/briefs`, fetcher);

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
    const briefItem = await Brief.findOne({ briefSlug: params.briefId });
    return {
        props: {
            slug: briefItem.briefSlug,
            title: briefItem.briefTitle,
            detail: briefItem.briefDetail,
            summary: briefItem.briefSummary,
            postedAt: briefItem.briefPostedAt
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    await dbConnect()
    const briefItems = await Brief.find();
    return {
        paths: briefItems.map(item => {
            const briefId = item.briefSlug;
            return {
                params: {
                    briefId
                }
            }
        }),
        fallback: false
    }
}