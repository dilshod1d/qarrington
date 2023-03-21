import React from 'react';
import Head from 'next/head';
import LeftGrid from '../../../components/grids/LeftGrid';
import RightGrid from '../../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';
import Footer from '../../../components/main/Footer';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Button, Fab, InputBase, Tooltip } from '@mui/material';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: "topic",
    })

    return {
        paths: res.items.map((item) => ({
            params: { topicId: item.fields.topicUrl },
        })),
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const res = await client.getEntries({
        content_type: "topic",
        'fields.topicUrl': params.topicId
    })

    return {
        props: {
            topic: res.items[0],
        },
        revalidate: 60,
    };
}

const Page = ({ topic }) => {
    console.log(topic);

    return (

        <>

            <Head>
                <title>{topic.fields.topicTitle} • Qarrington</title>
                <meta
                    name="description"
                    content={topic.fields.topicDetail}
                />
            </Head>

            <Grid style={{ backgroundColor: '#fff' }}>

                {/* header starts */}

                <HeaderCard>
                    <Container mb={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            {/* LogoBox Starts Here */}

                            <Grid>
                                <Box display="flex" justifyContent="flex-start">
                                    <LogoWrapper>
                                        <Link href="/">
                                            <Avatar
                                                variant="rounded"
                                                alt="Setment Logo"
                                                src="/assets/media/logos/primary-filled.png"
                                            />
                                        </Link>
                                    </LogoWrapper>

                                    <Link href="/companies">
                                        <Box sx={{ marginLeft: -1.2 }}>
                                            <Button sx={MenuItem} variant='text' color='secondary'>
                                                Companies
                                            </Button>
                                        </Box>
                                    </Link>

                                    <Link href="/subscriptions">
                                        <Box sx={{ marginLeft: -1.2 }}>
                                            <Button sx={MenuItem} variant='text' color='secondary'>
                                                Subscriptions
                                            </Button>
                                        </Box>
                                    </Link>

                                    <Link href="/help">
                                        <Box sx={{ marginLeft: -1.2 }}>
                                            <Button sx={MenuItem} variant='text' color='secondary'>
                                                Help
                                            </Button>
                                        </Box>
                                    </Link>

                                </Box>
                            </Grid>

                            {/* LogoBox Ends Here */}

                            {/* SearchBox Starts Here */}

                            <Grid>
                                <Box display="flex" justifyContent="center">
                                    <Card
                                        component="form"
                                        sx={{
                                            p: '2px 4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 450
                                        }}
                                    >
                                        <Link href="/">
                                            <Tooltip title="All Listings">
                                                <QrCodeRoundedIcon
                                                    sx={{ m: '10px', cursor: 'pointer' }}
                                                />
                                            </Tooltip>
                                        </Link>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Search tickers, companies, or products ..."
                                            inputProps={{ 'aria-label': 'search Qarrington' }}
                                        />

                                        <SearchIcon
                                            sx={{ m: '10px' }}
                                        />

                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <Link href="/">
                                            <Tooltip
                                                title="New Listings"
                                                placement="bottom"
                                            >
                                                <InfoRoundedIcon
                                                    sx={{ m: '10px', color: '#2ed573', cursor: 'pointer' }}
                                                />
                                            </Tooltip>
                                        </Link>
                                    </Card>
                                </Box>
                            </Grid>

                            {/* SearchBox Ends Here */}

                            {/* UserBox Starts Here */}

                            <Grid>
                                <Box display="flex" justifyContent="flex-end">

                                    <Link href="/subscriptions">
                                        <Box sx={{ marginRight: -1.2 }}>
                                            <Button sx={MenuItem} variant='text' color='secondary'>
                                                Subscriptions
                                            </Button>
                                        </Box>
                                    </Link>

                                    <Link href="/portfolio">
                                        <Box sx={{ marginRight: -1.2 }}>
                                            <Button sx={MenuItem} variant='text' color='secondary'>
                                                Portfolio
                                            </Button>
                                        </Box>
                                    </Link>

                                    <Link href="/account">
                                        <Box sx={{ marginRight: -1.2 }}>
                                            <Button sx={MenuItem} variant='text' color='secondary'>
                                                Account
                                            </Button>
                                        </Box>
                                    </Link>

                                    <AvatarWrapper>
                                        <Link href="/companies">
                                            <Fab size="small" color="primary" aria-label="add">
                                                <HistoryEduRoundedIcon sx={{ color: '#ffffff' }} />
                                            </Fab>
                                        </Link>
                                    </AvatarWrapper>

                                </Box>
                            </Grid>

                            {/* UserBox Ends Here */}
                        </Box>
                    </Container>
                </HeaderCard>

                {/* header ends */}

                <Container style={{ backgroundColor: '#fff' }}>

                <Grid container spacing={2}>

                    <Grid item xs>
                    <LeftGrid />
                    </Grid>

                    <Grid mt={8} item xs={6}>
                        <Box style={{ padding: '100px 20px 20px 20px' }}>
                            <Typography variant="h1" fontWeight={700} color="black">
                                {topic.fields.topicTitle}?
                            </Typography>
                            <Divider sx={{ my: 4 }} />
                            <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                {topic.fields.topicSummary}
                            </Typography>
                            <Divider sx={{ my: 4 }} />
                            <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                {documentToReactComponents(topic.fields.topicDetail)}
                            </Typography>
                            <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                {documentToReactComponents(topic.fields.topicDetail)}
                            </Typography>
                            <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                {documentToReactComponents(topic.fields.topicDetail)}
                            </Typography>
                            <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                {documentToReactComponents(topic.fields.topicDetail)}
                            </Typography>
                            <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                                {documentToReactComponents(topic.fields.topicDetail)}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs>
                    <RightGrid />
                    </Grid>

                    </Grid>

                    <Footer />

                </Container>

            </Grid>

        </>

    )
}

export default Page

const MenuItem = {
    fontWeight: '600',
    fontSize: '12px',
    marginX: '4px',
    textTransform: 'uppercase',
    '&:hover': {
        backgroundColor: '#7bed9f20'
    }
};

const HeaderCard = styled(Box)(
    ({ theme }) => `
    width: 100%;
    background-color: #fff;
    position: fixed;
    border-radius: 0;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(10)};
    z-index: 999;
  `
);

const LogoWrapper = styled(Box)(
    ({ theme }) => `
          padding-right: ${theme.spacing(2.5)};
          cursor: pointer;
  `
);

const AvatarWrapper = styled(Box)(
    ({ theme }) => `
          padding-left: ${theme.spacing(2.5)};
          cursor: pointer;
  `
);