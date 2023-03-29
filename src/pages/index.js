import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { pink } from '@mui/material/colors';
import HomeNavbar from '../components/navbar/HomeNavbar';
import MainLeftbar from '../components/leftbar/MainLeftbar';
import MainRightbar from '../components/rightbar/MainRightbar';
import DisclaimerFooter from '../components/footer/DisclaimerFooter';
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';
import { Box, Card, Container, Grid, Tooltip, Typography } from '@mui/material';

const Page = () => {

  return (

    <Box sx={{ background: 'white' }}>

      <Head>
        <title>Nasdaq for SaaS • Qarrington</title>
        <meta
          name="description"
          content="If you have a portfolio of early-stage startup companies looking forward to doing an ISO, follow the below steps for listing."
        />
      </Head>

      <HomeNavbar />

      <Grid container spacing={2}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >

          {/* <Grid item xs={12} md={6} lg={3}>
                        <MainLeftbar />
                    </Grid> */}

          <Grid item xs={12} md={6} lg={8} mb={4}>
            <>
              <Grid item xs={12}>

                <Card style={{ padding: '40px 0px 40px 0px', marginBottom: '20px' }}>
                  <Typography variant="h2" color="black" fontWeight={800}>
                    Buy, sell, & transfer subscriptions.
                  </Typography>
                  <Typography variant="body" color="secondary" fontWeight={600}>
                    If you have a portfolio of early-stage startup companies looking forward to raising funds thru an ISO, follow the below listing steps.
                  </Typography>
                </Card>

                <Grid item xs={12} my={0}>
                  <Grid container spacing={2}>

                    {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                      <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                        <Link href={`/qa`}>
                          <Tooltip title={tooltip} placement="top">
                            <Card style={{ padding: '35px', cursor: 'pointer' }}>
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

                <DisclaimerFooter />

              </Grid>
            </>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={3}>
                        <MainRightbar />
                    </Grid> */}

        </Box>
      </Grid>

    </Box>

  )
}

export default Page

const arrayItems = [
  {
    _id: 1,
    icon: <LooksOneRoundedIcon color="primary" sx={{ fontSize: '40px', color: pink[200] }} />,
    title: "Pay",
    detail: "Make the one-time company listing fee.",
    tooltip: "You're required to pay a one-time listing fee, which is 100% refundable after the ISO of your first listed company."
  },
  {
    _id: 2,
    icon: <LooksTwoRoundedIcon color="primary" sx={{ fontSize: '40px', color: pink[800] }} />,
    title: "Submit",
    detail: "Submit a startup company for listing.",
    tooltip: "You can list any type of startup company from any industry, but the business model must be subscription."
  },
  {
    _id: 3,
    icon: <Looks3RoundedIcon color="primary" sx={{ fontSize: '40px', color: pink[400] }} />,
    title: "Get",
    detail: "Receive proceeds after the ISO launch.",
    tooltip: "You'd get 10% from a company's ISO proceeds & 80% goes to the company. We charge 10% as a platform fee."
  }
]