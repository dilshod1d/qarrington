import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeftSide from '../../../components/topics/LeftSide';
import Navbar from '../../../components/topics/Navbar';
import RightSide from '../../../components/topics/RightSide';
import Footer from '../../../components/main/Footer';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';
import { createClient } from 'contentful';
import useSWR from 'swr';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const Page = ({ topicItem, sectionTitle }) => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: sections } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/sections`, fetcher);

    return (

        <div style={{ backgroundColor: '#fff' }}>

            <Head>
                <title>{sectionTitle} • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <Navbar />

            <Container>

                <Grid container spacing={2}>

                    <Grid item xs>
                        <LeftSide />
                    </Grid>

                    <Grid mt={8} item xs={6}>
                        <Box style={{ padding: '100px 20px 20px 20px' }}>
                            <Typography variant="h1" fontWeight={700} color="black">
                                Getting to know Qarrington & all.
                            </Typography>
                            <Divider sx={{ my: 3 }} />
                            <Typography mt={1} mb={4} variant="h5" fontWeight={500} color="secondary">
                                Get yourself familiar with what Qarrington is and does.
                            </Typography>
                        </Box>
                        <Grid item xs={12} mb={2}>
                            <Grid container spacing={1}>

                                {topicItem.slice(0, 2).map(ethos => (
                                    <Grid key={ethos.sys.id} item xs={12}>
                                        <Link href={`/topics/ethos/${ethos.fields.topicUrl}`}>
                                            <Card style={{ padding: '20px 40px 40px 40px', cursor: 'pointer' }}>
                                                {/* <Box style={{ textAlign: 'center' }}>
                                                    <Box mt={2}>
                                                        <Typography variant="h5" fontWeight={600} color="secondary">
                                                            {ethos.fields.topicTitle}
                                                        </Typography>
                                                        <Typography mt={1} variant="body2" fontWeight={700}>
                                                            {ethos.fields.topicSummary}
                                                        </Typography>
                                                    </Box>
                                                </Box> */}
                                                <Box mt={2}>
                                                    <Typography variant="h6" fontWeight={700} color="black">
                                                        {ethos.fields.topicTitle}
                                                    </Typography>
                                                    {/* <Typography variant="body" fontWeight={600} color="secondary">
                                                        {ethos.fields.topicSummary}
                                                    </Typography> */}
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}

                                {/* {sections && Array.isArray(sections) && sections?.map(({ sectionId, sectionUrl, sectionIcon, sectionTitle, sectionDetail }) => (
                                    <Grid key={sectionId} item xs={12} sm={6} md={6} lg={6}>
                                        <Link href={`/topics/${sectionUrl}`}>
                                            <Card style={{ padding: '20px 40px 40px 40px', cursor: 'pointer' }}>
                                                <Box mt={2}>
                                                    <Typography gutterBottom variant="h6" fontWeight={700} color="black" textTransform="uppercase">
                                                        {sectionTitle}
                                                    </Typography>
                                                    <Typography variant="body" fontWeight={600} color="secondary">
                                                        {sectionDetail}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))} */}

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                        <RightSide />
                    </Grid>

                </Grid>

                <Footer />

            </Container>

        </div>

    )
}

export default Page

export async function getStaticProps({ params }) {
    const res = await client.getEntries({
        content_type: 'ethos',
        'fields.sectionUrl': params.sectionId
    })
    const results = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sections?sectionUrl=${params.sectionId.replace(/\-/g, '+')}`)
        .then((r) => r.json());
    return {
        props: {
            topicItem: res.items[0],
            sectionModel: results.sectionUrl
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const datas = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sections?sectionUrl`)
        .then((r) => r.json());
    const paths = datas.map(koko => {
        return {
            params: {
                sectionId: `${koko.sectionUrl}`,
                sectionTitle: `${koko.sectionTitle}`
            }
        }
    })
    return {
        paths,
        fallback: true
    }
    // return {
    //     paths: datas.items.map((item) => ({
    //         params: { sectionId: item.sectionUrl },
    //     })),
    //     fallback: true,
    // };
}