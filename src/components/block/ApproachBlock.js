import React from 'react';
import Link from 'next/link';
import { green } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Badge, Box, Card, Grid, styled, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <ProductBadge badgeContent="approach"></ProductBadge>
                </Grid>
                <Grid item xs={12} my={0}>
                    <Grid container spacing={2}>
                        {listItems && Array.isArray(listItems) && listItems?.map(({ _id, listIcon, listTitle, listDetail }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Box style={{ padding: '40px' }}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {listIcon}
                                    </Box>
                                    <Box mt={1} style={{ textAlign: 'center' }}>
                                        <Box mb={1}>
                                            <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                {listTitle}
                                            </Typography>
                                            <Typography variant="body" fontWeight={600} color="secondary">
                                                {listDetail}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                        {cardItems && Array.isArray(cardItems) && cardItems?.map(({ _id, cardValue, cardDetail, cardVariant }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/qa`}>
                                    <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                        <Box mt={1} style={{ textAlign: 'center' }}>
                                            <Box mb={1}>
                                                <Typography gutterBottom variant="h2" fontWeight={700} color="black">
                                                    {cardValue}
                                                </Typography>
                                                <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                                    {cardDetail}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

        </>

    )
}

export default Component

const ProductBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        color: '#ffffff',
        fontWeight: 800,
        background: '#000000',
        fontSize: '12px',
        textTransform: 'uppercase',
        padding: '20px 16px',
    },
}));

const listItems = [
    {
        listIcon: <AccountCircleIcon color="primary" sx={{ fontSize: '55px', color: green[200] }} />,
        listTitle: "Open",
        listDetail: "Create a Qarrington account without your personal data such as email. It's 100% free."
    },
    {
        listIcon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '55px', color: green[800] }} />,
        listTitle: "Connect",
        listDetail: "Link your preferred physical or online bank account to your Qarrington account."
    },
    {
        listIcon: <ArrowCircleRightRoundedIcon color="primary" sx={{ fontSize: '55px', color: green[400] }} />,
        listTitle: "Pull",
        listDetail: "Buy subscriptions during and after a company's ISO with a credit/debit card."
    }
]

const cardItems = [
    {
        cardValue: "284",
        cardDetail: "Companies",
        cardVariant: 300
    },
    {
        cardValue: "278,250",
        cardDetail: "Users",
        cardVariant: 800
    },
    {
        cardValue: "120",
        cardDetail: "Countries",
        cardVariant: 400
    }
]