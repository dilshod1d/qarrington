import Head from 'next/head';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, Pagination, Stack, styled, Tooltip, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import Link from 'next/link';
import Company from '@models/company/Company';
import dbConnect from '@lib/dbConnect';

const Page = ({ companies }) => {
  return (
    <div>
      <Head>
        <title>Companies • Qarrington</title>
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
                    {companies &&
                      Array.isArray(companies) &&
                      companies?.map(({ id, companySlug, companyListing, isLaunched }) => (
                        <Grid key={id} item xs={12} sm={6} md={6} lg={6}>
                          <Link href={!isLaunched ? `/${companySlug}` : `/portfolio/${companySlug}`}>
                            <Card style={{ padding: '60px', cursor: 'pointer' }}>
                              <Box style={{ textAlign: 'center' }}>
                                <Box
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Avatar style={{ width: 50, height: 50 }} alt={companyListing.companyName} src={companyListing.companyLogo} />
                                </Box>
                                <Typography variant="h5" fontWeight={700} my={1.5} color="black">
                                  {companyListing.companyDescription}
                                </Typography>
                                <Typography textTransform="uppercase" variant="body2" fontWeight={600} color="secondary">
                                  {companyListing.companyName}
                                </Typography>
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

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();
    const companies = await Company.find();
    return {
      props: {
        companies: JSON.parse(JSON.stringify(companies)).map(({ _id, companySlug, companyListing, companyStatus }) => {
          return {
            id: _id.toString(),
            companySlug,
            companyListing,
            isLaunched: companyStatus.companyIsLaunched
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
