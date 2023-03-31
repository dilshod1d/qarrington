import React from 'react';
import Link from 'next/link';
import { Button, Grid, Tooltip, Typography } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Component = () => {

    return (

        <>

            <Grid my={3}>

                <Grid style={{ textAlign: 'center' }}>
                    <Typography variant="h1" color="black" fontWeight={800}>
                        Buy & sell <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                            <Typography
                                component="span"
                                variant="h1" color="#00000050" fontWeight={800}
                                sx={{
                                    "&:hover": {
                                        color: '#2ed573'
                                    }
                                }}>subscriptions</Typography></Tooltip>
                        <Typography variant="h1" color="black" fontWeight={800}>
                            backed by <u>Class A products</u>
                            <Tooltip title="These are products that often require monthly recurring payments from users before access can be granted online." placement="top">
                                <InfoRoundedIcon fontSize="small" color="primary" />
                            </Tooltip></Typography>
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        Qarrington is a subscription exchange, where early-stage startup companies are listed so users can buy, sell, & transfer their subscriptions just like stocks, but instead of shares, it's subscriptions.
                    </Typography>
                    <Link href={`/qa`}>
                        <Button
                            size="large"
                            sx={{ py: 2.5, px: 6, fontWeight: 800, color: 'white', textTransform: 'uppercase', fontSize: '13px' }}
                            variant="contained"
                            fullWidth={false}
                        >
                            join our weekly q&a
                        </Button>
                    </Link>
                    <Typography sx={{ my: 2 }} variant="body2" color="secondary" fontWeight={400}>
                        Currently, we only onboard new accounts through our weekly Q&A.
                    </Typography>
                </Grid>

            </Grid>

        </>

    )
}

export default Component