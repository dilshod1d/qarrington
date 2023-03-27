import { useState } from 'react';
import Head from 'next/head';
import HeaderMenu from '@components/menus/HeaderMenu';
import LeftGrid from '@components/grids/LeftGrid';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Badge, Box, Button, Card, Container, Grid, Stack, styled, Tab, TextField, Tooltip, Typography } from '@mui/material';
import Footer from '@components/main/Footer';
import dbConnect from '@lib/dbConnect';
import Company from '@models/company/Company';
import { checkIfCompanyIsInIsoDate } from '@helpers/companies-helpers';
import { useRouter } from 'next/router';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import PriceGrid from '@components/cards/PriceGrid';
import { cancelPushOf } from '@services/checkout-services';
import Push from '@models/push/Push';

const Page = ({ company, push }) => {
  const [value, setValue] = useState('3');

  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitPush = async (e) => {
    e.preventDefault();
    const response = await cancelPushOf(router.query.pushId)
    if(response?.status === 204) router.push('/portfolio')
  };

  return (
    <div>
      <Head>
        <title>
          {company.companyName} ({company.companyTicker}) Portfolio • Qarrington
        </title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies without fees."
        />
      </Head>

      <HeaderMenu />

      <Container>
        <Grid container spacing={2}>
          {/* LeftGrid Starts Here */}

          <Grid item xs={12} md={6} lg={3}>
            <LeftGrid />
          </Grid>

          {/* LeftGrid Ends Here */}

          <Grid item xs={12} md={6} lg={6} mb={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box textAlign="center" sx={{ marginBottom: '16px' }}>
                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <Card style={{ padding: '80px' }}>
                      <Tooltip title={`Portfolio`} placement="top">
                        <Box textAlign="center">
                          <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                            {`$${push.pushAmount}`}
                          </Typography>
                        </Box>
                      </Tooltip>
                      <Box textAlign="center" mt={1}>
                        <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                          {push.pushUnits}
                        </Typography>
                        <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                          units
                        </Typography>
                        <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                          |
                        </Typography>
                        <Tooltip title="Pushed unit price" placement="top">
                          <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                            ${push.pushPrice}
                          </Typography>
                        </Tooltip>
                        <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                          usd
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                </Box>
                <TabContext value={value}>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <TabsWrapper
                      onChange={handleChange}
                      indicatorColor="transparent"
                      TabIndicatorProps={{
                        sx: { backgroundColor: 'transparent', height: 4 }
                      }}
                      sx={{
                        '& button:hover': { backgroundColor: '#c7c7c7' },
                        '& button:active': { backgroundColor: '#b6b6b6' },
                        '& button.Mui-selected': { backgroundColor: '#a7a7a7' },
                        '& div.MuiTabs-scroller': { overflowY: 'auto' }
                      }}
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      <TabLabel label="Pick" value="1" disabled />
                      <TabLabel label="Pull" value="2" disabled/>
                      <TabLabel label="Push" value="3"/>
                    </TabsWrapper>
                  </Box>

                  <Box style={{ marginBottom: '0px', marginTop: '16px' }}>
                    <TabPanel sx={{ padding: 0 }} value="3">
                      <form noValidate autoComplete="off" onSubmit={handleSubmitPush}>
                        <Grid item xs={12}>
                          <Card style={{ padding: '60px' }}>
                            <Stack spacing={1} sx={{ width: '100%' }}>
                              <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                <Tooltip
                                  title="To receive the above subscription units in your portfolio, this amount will be charged to your credit/debit card."
                                  placement="top"
                                >
                                  <Button
                                    size="large"
                                    sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '14px' }}
                                    variant="contained"
                                    fullWidth={true}
                                    type="submit"
                                  >
                                    {`Cancel push of $${push.pushPrice * push.pushUnits} for ${company.companySlug.toUpperCase()}`}
                                  </Button>
                                </Tooltip>
                              </Stack>
                            </Stack>
                          </Card>
                          <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="body2">
                              The above subscriptions are the subscriptions that you recently pushed or sold. In addition to that, when you submit a
                              push request to sell the subscriptions of a company, the subscriptions will not be shown in your dashboard unless the
                              request is matched with a pull request.
                            </Typography>
                          </Box>
                        </Grid>
                      </form>
                    </TabPanel>
                  </Box>
                </TabContext>
                {/* tab stops */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <PriceGrid id={company.id} kpi={company.companyKpi.companyNow.data} />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Page;

const TabsWrapper = styled(TabList)(
  ({ theme }) => `
          &.MuiTabs-root {
            height: 0;
            margin-bottom: 0px;
          }
    `
);

const TabLabel = styled(Tab)(
  ({ theme }) => `
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
    `
);

const CurrencyBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: -8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}));

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/account/access',
        permanent: false
      }
    };
  }

  console.log(ctx.params)

  const { id: accountId } = session.user;

  try {
    await dbConnect();
    const { portfolioId, pushId } = ctx.params;

    const company = await Company.findOne({ companySlug: portfolioId.toLowerCase() });
    const parsedCompany = JSON.parse(JSON.stringify(company));

    const { _id, companyIso, companyListing, companySlug, companyKpi } = parsedCompany;
    const {
      companyTicker,
      companyName,
      companyLogo,
      companyHeadline,
      companyProduct,
      companyDescription,
      companyIndustry,
      companyMarket,
      companyWebsite,
      companyEmail
    } = companyListing;
    const { companyIsoUnits, companyIsoPrice, companyIsoDate, companyIsoTime } = companyIso;
    const companyBids = companyKpi.companyBids || { companyBidPrice: 0, companyBidUnits: 0 }
    const companyAsks = companyKpi.companyAsks || { companyAskPrice: 0, companyAskUnits: 0 }
    const companyisOnIsoDate = checkIfCompanyIsInIsoDate(company);

    const pushFetched = await Push.findById(pushId);
    console.log(pushFetched)

    // If user is not who created the pull then redirect
    if(pushFetched.pushAccountId !== accountId) {
      return {
        redirect: {
          destination: '/portfolio',
          permanent: false
        }
      };
    }

    const push = { 
      id: pushFetched._id.toString(), 
      pushCompany: JSON.parse(JSON.stringify(pushFetched.pushCompany)), 
      pushPrice: pushFetched.pushPrice, 
      pushAmount: pushFetched.pushAmount, 
      pushUnits: pushFetched.pushUnits
    }

    console.log(push)
    

    return {
      props: {
        company: {
          id: _id.toString(),
          companyIso,
          companyListing,
          companySlug,
          companyTicker,
          companyName,
          companyLogo,
          companyHeadline,
          companyProduct,
          companyDescription,
          companyIndustry,
          companyMarket,
          companyWebsite,
          companyEmail,
          companyIsoUnits,
          companyIsoPrice,
          companyIsoDate,
          companyIsoTime,
          companyBids,
          companyAsks,
          companyisOnIsoDate,
          companyKpi
        },
        push
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
