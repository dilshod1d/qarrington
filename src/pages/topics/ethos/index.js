import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../../components/menus/HeaderMenu';
import RightGrid from '../../../components/grids/RightGrid';
import Footer from '../../../components/main/Footer';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';
import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

// export async function getStaticPaths() {
//     const res = await client.getEntries({
//         content_type: "ethos",
//     })

//     return {
//         paths: res.items.map((item) => ({
//             params: { topicId: item.fields.topicUrl },
//         })),
//         fallback: true,
//     };
// }

export async function getStaticProps() {
    const res = await client.getEntries({
        content_type: "ethos"
    })

    return {
        props: {
            ethoItem: res.items,
        },
        revalidate: 60,
    }
}

const Page = ({ ethoItem }) => {
    console.log(ethoItem);

    return (

        <div>

            <Head>
                <title>Ethos • Qarrington</title>
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

                                        {/* {ethoItem.map(ethos => (
                                            <li key={ethos.sys.id}>
                                                <Link href={'/topics/ethos/' + ethos.fields.topicUrl}>
                                                    {ethos.fields.topicTitle}
                                                </Link>
                                            </li>
                                        ))} */}

                                        {ethoItem.map(ethos => (
                                            <Grid key={ethos.sys.id} item xs={12} sm={6} md={6} lg={6}>
                                                <Link href={`/topics/ethos/${ethos.fields.topicUrl}`}>
                                                    <Card style={{ padding: '60px', cursor: 'pointer' }}>
                                                        <Box style={{ textAlign: 'center' }}>
                                                            <Box mt={2}>
                                                                <Typography variant="h5" fontWeight={600} color="secondary">
                                                                    {ethos.fields.topicTitle}
                                                                </Typography>
                                                                <Typography mt={1} variant="body2" fontWeight={700}>
                                                                    {ethos.fields.topicSummary}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
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

const sections = [
    {
        sectionId: "1",
        sectionUrl: "/users",
        sectionIcon: "/assets/media/sections/users.png",
        sectionTitle: "Users",
        sectionDetail: "This is user section card detail."
    },
    {
        sectionId: "2",
        sectionUrl: "/underwriters",
        sectionIcon: "/assets/media/sections/underwriters.png",
        sectionTitle: "Underwriters",
        sectionDetail: "This is underwriter section card detail."
    },
    {
        sectionId: "3",
        sectionUrl: "/founders",
        sectionIcon: "/assets/media/sections/founders.png",
        sectionTitle: "Founders",
        sectionDetail: "This is founder section card detail."
    },
    {
        sectionId: "4",
        sectionUrl: "/ethos",
        sectionIcon: "/assets/media/sections/ethos.png",
        sectionTitle: "Ethos",
        sectionDetail: "This is etho section card detail."
    },
    {
        sectionId: "5",
        sectionUrl: "/fundamentals",
        sectionIcon: "/assets/media/sections/fundamentals.png",
        sectionTitle: "Fundamentals",
        sectionDetail: "This is fundamental section card detail."
    },
    {
        sectionId: "6",
        sectionUrl: "/guidelines",
        sectionIcon: "/assets/media/sections/guidelines.png",
        sectionTitle: "Guidelines",
        sectionDetail: "This is guideline section card detail."
    }
]