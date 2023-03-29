import React from 'react';
import Head from 'next/head';
import HomeNavbar from '../components/navbar/HomeNavbar';
import DisclaimerFooter from '../components/footer/DisclaimerFooter';
import { Box, Grid } from '@mui/material';
import HeroBlock from '../components/block/HeroBlock';
import FeatureBlock from '../components/block/FeatureBlock';
import GuideBlock from '../components/block/GuideBlock';

const Page = () => {

  return (

    <Box sx={{ background: 'white' }}>

      <Head>
        <title>Nasdaq for SaaS • Qarrington</title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange, where startup companies are listed so customers can buy, sell, and transfer their subscriptions just like stocks."
        />
      </Head>

      <HomeNavbar />

      <Grid container>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >

          <Grid item xs={10} md={6} lg={8} mb={4}>
            <Grid item xs={12}>

              {/* one */}

              <HeroBlock />
              <FeatureBlock />
              <GuideBlock />

              {/* one */}

              <DisclaimerFooter />

            </Grid>
          </Grid>

        </Box>
      </Grid>

    </Box>

  )
}

export default Page