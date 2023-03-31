import React from 'react';
import Link from 'next/link';
import { pink } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Box, Button, Card, Grid, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="black" fontWeight={700}>
                        Well, maybe we just invented a new job title; it's called <i>SaaS Underwriter</i>.
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        On Qarrington, a SaaS Underwriter is a startup incubator, accelerator, angel, advisor, or investor with an innovative portfolio of early-stage startup companies founded by exceptional founders.
                    </Typography>
                    <Link href={`/qa`}>
                        <Button
                            size="large"
                            sx={{ fontWeight: 700, color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={false}
                        >
                            list company
                        </Button>
                    </Link>
                    <Typography sx={{ my: 2 }} variant="body2" color="secondary" fontWeight={400}>
                        It's our culture to validate our underwriters through a weekly Q&A.
                    </Typography>
                </Grid>
                <Grid item xs={12} mt={6}>
                    <Grid container spacing={2}>
                        {cardItems && Array.isArray(cardItems) && cardItems?.map(({ _id, cardIcon, cardTitle, cardDetail }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/qa`}>
                                    <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {cardIcon}
                                        </Box>
                                        <Box mt={1} style={{ textAlign: 'center' }}>
                                            <Box mb={1}>
                                                <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                    {cardTitle}
                                                </Typography>
                                                <Typography variant="body2" fontWeight={700} color="secondary">
                                                    {cardDetail}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                        <Typography sx={{ mt: 4, textAlign: 'center' }} variant="body" color="secondary" fontWeight={600}>
                            A SaaS Underwriter to Qarrington is what an Investment Bank is to Nasdaq, but with a few differences. For example, a SaaS Underwriter is expected to source, vet, and submit a company for an ISO in return for 10% of the proceeds, while an Investment Bank is often responsible for buying securities, in this case; an IPO, and then reselling them to retail investors for profit.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </>

    )
}

export default Component

const cardItems = [
    {
        cardIcon: <AccountCircleIcon color="primary" sx={{ fontSize: '55px', color: pink[200] }} />,
        cardTitle: "Open",
        cardDetail: "Create a Qarrington account without your personal data such as email. It's 100% free."
    },
    {
        cardIcon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '55px', color: pink[800] }} />,
        cardTitle: "Connect",
        cardDetail: "Link your preferred physical or online bank account to your Qarrington account."
    },
    {
        cardIcon: <AddCircleRoundedIcon color="primary" sx={{ fontSize: '55px', color: pink[400] }} />,
        cardTitle: "List",
        cardDetail: "Submit a startup company for listing so the company can whitelist subscribers for its ISO."
    }
]