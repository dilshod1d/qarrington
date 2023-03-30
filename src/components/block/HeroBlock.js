import React from 'react';
import Link from 'next/link';
import { Button, Grid, Tooltip, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={3}>

                <Grid style={{ textAlign: 'center' }}>
                    <Typography variant="h1" color="black" fontWeight={800}>
                        Buy, sell, and transfer asset-backed <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                            <Typography
                                component="span"
                                variant="h1" color="#00000050" fontWeight={800}
                                sx={{
                                    "&:hover": {
                                        color: '#2ed573'
                                    }
                                }}>subscriptions</Typography></Tooltip>
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        Qarrington is a subscription exchange, where early-stage startup companies are listed so users can buy, sell, & transfer asset-backed subscriptions, which is unlikely with stocks and cryptos.
                    </Typography>
                    <Link href={`/qa`}>
                        <Button
                            size="large"
                            sx={{ py: 3, px: 6, fontWeight: 800, color: 'white', textTransform: 'uppercase', fontSize: '13px' }}
                            variant="contained"
                            fullWidth={false}
                        >
                            join our weekly q&a
                        </Button>
                    </Link>
                    <Typography sx={{ my: 2 }} variant="body2" color="secondary" fontWeight={400}>
                        Before you list, we'd like to see whether your company is a fit.
                    </Typography>
                </Grid>

            </Grid>

        </>

    )
}

export default Component