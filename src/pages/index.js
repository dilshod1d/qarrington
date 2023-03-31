import React from 'react';
import Head from 'next/head';
import HomeNavbar from '../components/navbar/HomeNavbar';
import DisclaimerFooter from '../components/footer/DisclaimerFooter';
import { Box, Grid } from '@mui/material';
import HeroBlock from '../components/block/HeroBlock';
import FeatureBlock from '../components/block/FeatureBlock';
import StatBlock from '../components/block/StatBlock';
import TickerBlock from '../components/block/TickerBlock';
import UnderwriterBlock from '../components/block/UnderwriterBlock';
import FounderBlock from '../components/block/FounderBlock';
import SubscriberBlock from '../components/block/SubscriberBlock';
import PublisherBlock from '../components/block/PublisherBlock';

const Page = () => {

  return (

    <Box sx={{ background: 'white' }}>

      <Head>
        <title>Nasdaq for SaaS • Qarrington</title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange, where companies are listed so everyone can buy, sell, & transfer subscriptions that are backed by the underlying assets."
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
              <StatBlock />
              <FeatureBlock />
              <TickerBlock />
              <UnderwriterBlock />
              <FounderBlock />
              <SubscriberBlock />
              <PublisherBlock />

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