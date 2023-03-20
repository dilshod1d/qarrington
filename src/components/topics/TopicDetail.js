import React from 'react';
import Head from 'next/head';
import LeftGrid from '../../components/grids/LeftGrid';
import RightGrid from '../../components/grids/RightGrid';
import Footer from '../../components/main/Footer';
import { createClient } from 'contentful';
import useSWR from 'swr';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Container, Divider, Grid, styled, Typography } from '@mui/material';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const Component = ({ topicItem }) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher)

  return (

    <>

      {/* header starts */}

      <Container style={{ backgroundColor: '#fff' }}>

        <Grid container spacing={2}>

          <Grid item xs>
            <LeftGrid />
          </Grid>

          <Grid mt={8} item xs={6}>
            <Box style={{ padding: '100px 20px 20px 20px' }}>
              <Typography variant="h1" fontWeight={700} color="black">
                {topicItem.fields.topicTitle}?
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                {topicItem.fields.topicSummary}
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                {documentToReactComponents(topicItem.fields.topicDetail)}
              </Typography>
              <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                {documentToReactComponents(topicItem.fields.topicDetail)}
              </Typography>
              <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                {documentToReactComponents(topicItem.fields.topicDetail)}
              </Typography>
              <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                {documentToReactComponents(topicItem.fields.topicDetail)}
              </Typography>
              <Typography mt={1} variant="body" fontWeight={500} color="secondary">
                {documentToReactComponents(topicItem.fields.topicDetail)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs>
            <RightGrid />
          </Grid>

        </Grid>

        <Footer />

      </Container>

      {/* header ends */}

    </>

  );

};

export default Component;

const MenuItem = {
  fontWeight: '600',
  fontSize: '12px',
  marginX: '4px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#7bed9f20'
  }
};

const HeaderCard = styled(Box)(
  ({ theme }) => `
  width: 100%;
  background-color: #fff;
  position: fixed;
  border-radius: 0;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
  z-index: 999;
`
);

const LogoWrapper = styled(Box)(
  ({ theme }) => `
        padding-right: ${theme.spacing(2.5)};
        cursor: pointer;
`
);

const AvatarWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(2.5)};
        cursor: pointer;
`
);