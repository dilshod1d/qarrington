import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { green } from '@mui/material/colors';
import BriefNavbar from '../../../../components/navbar/BriefNavbar';
import DisclaimerFooter from '../../../../components/footer/DisclaimerFooter';
import { Box, Card, Grid, Typography } from '@mui/material';
import dbConnect from '@lib/dbConnect';
import Brief from '@models/brief/Brief';
import Divider from '@mui/material/Divider';

const Page = ({ title, detail, summary }) => {
  return (
    <Box sx={{ background: 'white' }}>
      <Head>
        <title>{title} • Qarrington</title>
        <meta name="description" content={summary} />
      </Head>

      <BriefNavbar />

      <Grid container>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={10} md={6} lg={8} mb={4}>
            <Grid item xs={12}>
              {/* one */}

              <Grid mt={10} mb={3}>
                <Grid>
                  <Typography variant="h1" color="black" fontWeight={800}>
                    {title}?
                  </Typography>
                  <Divider sx={{ my: 4 }} />
                  <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={400}>
                    {summary}
                  </Typography>
                  <Divider sx={{ my: 4 }} />
                  <Typography sx={{ my: 2 }} variant="body" color="secondary" fontWeight={600}>
                    {detail}
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={4}>
                  <Link href={`/contact`}>
                    <Card style={{ padding: '80px', textAlign: 'center', cursor: 'pointer', background: '#7bed9f' }}>
                      <Typography variant="h5" fontWeight={700}>
                        If you don't find this brief helpful, you can always reach out to our 24/7 account managers and we'd try to get in touch with
                        you in less than 24 hours or so.
                      </Typography>
                    </Card>
                  </Link>
                </Grid>
              </Grid>

              {/* one */}

              <DisclaimerFooter />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  await dbConnect();
  const briefItem = await Brief.findOne({ briefSlug: params.briefSlug });
  return {
    props: {
      title: briefItem.briefTitle,
      detail: briefItem.briefDetail,
      summary: briefItem.briefSummary
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  await dbConnect();
  const briefItems = await Brief.find();
  return {
    paths: briefItems.map((item) => {
      const topicSlug = item.briefTopic.toLowerCase().replace(/ /g, '-');
      const briefSlug = item.briefSlug;
      return {
        params: {
          topicSlug,
          briefSlug
        }
      };
    }),
    fallback: false
  };
}
