import React from 'react';
import Head from 'next/head';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, Pagination, Stack, styled, Tooltip, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import Link from 'next/link';
import Company from '@models/company/Company';
import dbConnect from '@lib/dbConnect';
import { checkIfCompanyHasPastIsoDate } from '@helpers/companies-helpers';

const Page = ({ companies }) => {
  return (
    <div>
      <Head>
        <title>Subscriptions • Qarrington</title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
        />
      </Head>

      <HeaderMenu />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={9} mb={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={2}>
                    {companies.map(({ _id, companySlug, companyListing }) => (
                      <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                        <Link href={`/subscriptions/${companySlug}`}>
                          <Card style={{ padding: '60px', cursor: 'pointer' }}>
                            <Box
                              style={{
                                display: 'flex',
                                justifyContent: 'center'
                              }}
                            >
                              <Avatar style={{ width: 40, height: 40 }} alt={companyListing.companyName} src={companyListing.companyLogo} />
                            </Box>
                            <Box style={{ textAlign: 'center' }}>
                              <Box>
                                <Box textAlign="center" mt={1.5} mb={0.5}>
                                  <Typography component="span" mr={0.2} variant="body" fontWeight="700" color="black" textTransform="uppercase">
                                    {companyListing.companyName}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                    {companyListing.companyTicker}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Card>
                        </Link>
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <Box spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination count={10} variant="outlined" shape="rounded" />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Footer />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <RightGrid />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Page;

export async function getServerSideProps() {
  try {
    await dbConnect();
    const companies = await Company.find();
    const companiesWithPastIsoDates = companies.filter(checkIfCompanyHasPastIsoDate);

    return {
      props: {
        companies: companiesWithPastIsoDates.map(({ _id, companySlug, companyListing }) => {
          return {
            id: _id.toString(),
            companySlug: JSON.parse(JSON.stringify(companySlug)),
            companyListing: JSON.parse(JSON.stringify(companyListing))
          };
        })
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
