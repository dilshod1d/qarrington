import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="black" fontWeight={700}>
                        Build your first subscription portfolio on a leading subscription exchange.
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        Qarrington allows you to build your first subscription portfolio by buying and selling the subscriptions of industry-leading startup companies disrupting the world and touching lives.
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
                        In order to list a company, let's see whether there's a fit.
                    </Typography>
                </Grid>
                <Grid item xs={12} my={0}>
                    <Grid container spacing={1}>
                        {subscriptions && Array.isArray(subscriptions) && subscriptions?.map(({ _id, name, image, ticker, variant, movement }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={3}>
                                <Card style={{ padding: '40px' }}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Avatar
                                            style={{ width: 32, height: 32 }}
                                            alt={name}
                                            src={image}
                                        />
                                    </Box>
                                    <Box mt={1} style={{ textAlign: 'center' }}>
                                        <Typography gutterBottom variant="h6" fontWeight={700} color="black">
                                            {name}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600} color="secondary">
                                            ${ticker}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

        </>

    )
}

export default Component

const subscriptions = [
    {
        _id: 1,
        name: "Birdio",
        image: "/assets/media/companies/birdio.png",
        ticker: "BRD",
        variant: "primary",
        movement: "2.74"
    },
    {
        _id: 2,
        name: "Wiskie",
        image: "/assets/media/companies/wiskie.png",
        ticker: "WSK",
        variant: "error",
        movement: "0.59"
    },
    {
        _id: 3,
        name: "Qarrington",
        image: "/assets/media/companies/qarrington.png",
        ticker: "QAR",
        variant: "primary",
        movement: "1.62"
    },
    {
        _id: 4,
        name: "Twined",
        image: "/assets/media/companies/twined.png",
        ticker: "TWN",
        variant: "primary",
        movement: "4.10"
    },
    {
        _id: 5,
        name: "Spread",
        image: "/assets/media/companies/spread.png",
        ticker: "SPR",
        variant: "error",
        movement: "2.38"
    },
    {
        _id: 6,
        name: "Swind",
        image: "/assets/media/companies/swind.png",
        ticker: "SWI",
        variant: "primary",
        movement: "5.04"
    },
    {
        _id: 7,
        name: "Highland",
        image: "/assets/media/companies/highland.png",
        ticker: "HGH",
        variant: "error",
        movement: "3.08"
    },
    {
        _id: 8,
        name: "Algoma",
        image: "/assets/media/companies/algoma.png",
        ticker: "ALG",
        variant: "primary",
        movement: "5.15"
    },
    {
        _id: 9,
        name: "Splash",
        image: "/assets/media/companies/splash.png",
        ticker: "SPH",
        variant: "primary",
        movement: "1.49"
    },
    {
        _id: 10,
        name: "Varozo",
        image: "/assets/media/companies/varozo.png",
        ticker: "VAR",
        variant: "primary",
        movement: "5.74"
    },
    {
        _id: 11,
        name: "Klasic",
        image: "/assets/media/companies/klasic.png",
        ticker: "KSC",
        variant: "primary",
        movement: "4.48"
    },
    {
        _id: 12,
        name: "Humble",
        image: "/assets/media/companies/humble.png",
        ticker: "HUM",
        variant: "primary",
        movement: "3.72"
    },
    {
        _id: 13,
        name: "Wask",
        image: "/assets/media/companies/wask.png",
        ticker: "WAS",
        variant: "primary",
        movement: "4.09"
    },
    {
        _id: 14,
        name: "Crossborder",
        image: "/assets/media/companies/crossborder.png",
        ticker: "CSS",
        variant: "primary",
        movement: "2.07"
    },
    {
        _id: 15,
        name: "Bright",
        image: "/assets/media/companies/bright.png",
        ticker: "BRT",
        variant: "primary",
        movement: "4.82"
    },
    {
        _id: 16,
        name: "Cirkle",
        image: "/assets/media/companies/cirkle.png",
        ticker: "CKL",
        variant: "error",
        movement: "4.21"
    },
    {
        _id: 17,
        name: "PawPaw",
        image: "/assets/media/companies/pawpaw.png",
        ticker: "PAW",
        variant: "primary",
        movement: "1.87"
    },
    {
        _id: 18,
        name: "Pinner",
        image: "/assets/media/companies/pinner.png",
        ticker: "PIN",
        variant: "primary",
        movement: "3.28"
    },
    {
        _id: 19,
        name: "Splitted",
        image: "/assets/media/companies/splitted.png",
        ticker: "SPT",
        variant: "primary",
        movement: "6.05"
    },
    {
        _id: 20,
        name: "Jasper",
        image: "/assets/media/companies/jasper.png",
        ticker: "JAS",
        variant: "primary",
        movement: "1.87"
    },
    {
        _id: 21,
        name: "Urban",
        image: "/assets/media/companies/urban.png",
        ticker: "URB",
        variant: "primary",
        movement: "5.72"
    },
    {
        _id: 22,
        name: "Winsta",
        image: "/assets/media/companies/winsta.png",
        ticker: "WIN",
        variant: "primary",
        movement: "3.09"
    },
    {
        _id: 23,
        name: "Babooze",
        image: "/assets/media/companies/babooze.png",
        ticker: "BAB",
        variant: "error",
        movement: "4.04"
    },
    {
        _id: 24,
        name: "Boosto",
        image: "/assets/media/companies/boosto.png",
        ticker: "BST",
        variant: "primary",
        movement: "3.73"
    }
]