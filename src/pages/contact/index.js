import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LoggedOut from '../../components/navbar/LoggedOut';
import Admin from '../../components/topics/Admin';
import Company from '../../components/topics/Company';
import Footer from '../../components/topics/Footer';
import { purple } from '@mui/material/colors';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import { Box, Card, Container, Grid, Tooltip, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Contact • Qarrington</title>
                <meta
                    name="description"
                    content="If you're unable to find a brief that answers your question, kindly email, call, or text our 24/7 account managers & we'd reply in 12hrs."
                />
            </Head>

            <LoggedOut />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <Admin />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mt={12} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                        If you're unable to find a brief that answers your question, kindly email, call, or text our 24/7 account managers & we'd reply in 12hrs.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                <Link href={`/account`}>
                                                    <Tooltip title={tooltip} placement="top">
                                                        <Card style={{ padding: '40px' }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                {icon}
                                                            </Box>
                                                            <Box mt={1} style={{ textAlign: 'center' }}>
                                                                <Box mb={1}>
                                                                    <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                                        {title}
                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                                        {detail}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Tooltip>
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
                        <Company />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page

const arrayItems = [
    {
        _id: 1,
        icon: <InsertCommentRoundedIcon color="primary" sx={{ fontSize: '40px', color: purple[200] }} />,
        title: "Email",
        detail: "Send us an email, we're  24/7 online.",
        tooltip: "support@site.com"
    },
    {
        _id: 2,
        icon: <PhoneInTalkRoundedIcon color="primary" sx={{ fontSize: '40px', color: purple[800] }} />,
        title: "Call",
        detail: "Give us a call from any country.",
        tooltip: "+18743294580"
    },
    {
        _id: 3,
        icon: <SmsRoundedIcon color="primary" sx={{ fontSize: '40px', color: purple[400] }} />,
        title: "Text",
        detail: "Send us an SMS, we reply globally.",
        tooltip: "+18437840278"
    }
]