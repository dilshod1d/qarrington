import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticProps() {
    const res = await client.getEntries({
        content_type: "topic"
    })

    return {
        props: {
            topics: res.items,
        },
        revalidate: 60,
    }
}

// export async function getStaticPaths() {
// }


const Page = ({ topics }) => {
    console.log(topics)

    return (

        <div>

            <Head>
                <title>Help • Qarrington</title>
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

                                        <>
                                            {topics.map(topic => (
                                                <li key={topic.sys.id}>
                                                    <Link href={'/topics/' + topic.fields.topicUrl}>
                                                        {topic.fields.topicTitle}
                                                    </Link>
                                                </li>
                                            ))}
                                        </>

                                        {/* {help && help.map(({ _id, name, email, avatar, content }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                <Card style={{ padding: '60px' }}>
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <StyledBadge
                                                            overlap="circular"
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right'
                                                            }}
                                                            variant="dot"
                                                        >
                                                            <Avatar
                                                                style={{ width: 50, height: 50 }}
                                                                alt={name}
                                                                src={avatar}
                                                            />
                                                        </StyledBadge>
                                                    </Box>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Box mt={2}>
                                                            <Typography variant="body" fontWeight={600} color="secondary">
                                                                {name}
                                                            </Typography>
                                                            <Typography mt={1} variant="h5" fontWeight={700}>
                                                                {content}
                                                            </Typography>
                                                        </Box>
                                                        <Box mt={1}>
                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                {email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))} */}

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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));