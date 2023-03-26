import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../../../components/menus/HeaderMenu';
import Leftbar from '../../../../components/dashboard/Leftbar';
import Completion from '../../../../components/cards/Completion';
import Footer from '../../../../components/main/Footer';
import { Box, Button, Card, Container, Grid, ListItem, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Manage Brief • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
                />
            </Head>

            <HeaderMenu />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <Leftbar />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                    <Stack spacing={1} sx={{ width: '100%' }} direction="row">
                                        <Button
                                            size="large"
                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="contained"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            save
                                        </Button>
                                        <Button
                                            size="large"
                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="contained"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            save
                                        </Button>
                                        <Button
                                            size="large"
                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="contained"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            save
                                        </Button>
                                    </Stack>
                                </Card>

                                {/*  */}

                                <form noValidate autoComplete='off'>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="avatar url"
                                                defaultValue="ankara"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="avatar url"
                                                defaultValue="ankara"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="avatar url"
                                                defaultValue="ankara"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="avatar url"
                                                defaultValue="ankara"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                placeholder="avatar url"
                                                defaultValue="ankara"
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card style={{ padding: '60px', marginBottom: '0px' }}>
                                        <Button
                                            size="large"
                                            sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                                            variant="contained"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            save
                                        </Button>
                                    </Card>

                                </form>

                                {/*  */}

                                <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <Typography variant="body2">
                                        When you open a Qarrington account, a secretKey will automatically be generated for the account. Although you can always change your accessKey, once your secretKey is generated, you will not be able to change it later. For this reason, you're required to copy your secretKey somewhere safe. It's called a secretKey because it's the sole of your account and it must not be shared with anyone.
                                    </Typography>
                                </Box>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Completion />
                    </Grid>

                </Grid>
            </Container>

            <Footer />

        </div>

    )
}

export default Page

const BriefTitle = {
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