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
import Pull from '@models/pull/Pull';
import Push from '@models/push/Push';
import { useRouter } from 'next/router';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Pick from '@models/pick/Pick';
import PriceGrid from '@components/cards/PriceGrid';

const Page = ({ company, pulls, pushes, picks }) => {
  const [value, setValue] = useState(company.companyisOnIsoDate ? '1' : '2');
  const [pickUnits, setPickUnits] = useState('');
  const [pullUnits, setPullUnits] = useState('');
  const [pullPrice, setPullPrice] = useState(company.companyAsks?.companyAskPrice);
  const [pushUnits, setPushUnits] = useState('');
  const [pushPrice, setPushPrice] = useState(company.companyBids?.companyBidPrice);

  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSumbmitPick = (e) => {
    e.preventDefault();
    router.push(`/api/checkout/${company.companySlug}?units=${pickUnits}&type=pick`);
  };

  const handleSubmitPull = (e) => {
    e.preventDefault();
    router.push(`/api/checkout/${company.companySlug}?units=${pullUnits}&type=pull&price=${pullPrice}`);
  };

  const handleSubmitPush = (e) => {
    e.preventDefault();
    router.push(`/api/checkout/${company.companySlug}?units=${pushUnits}&type=push&price=${pushPrice}`);
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
                  {pulls.length > 0 && (
                    <Grid item xs={12} sm={6} md={6} lg={12}>
                      <Card style={{ padding: '80px' }}>
                        <Tooltip title={`Portfolio`} placement="top">
                          <Box textAlign="center">
                            <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                              {`$${pulls.at(-1).pullCompany.pullCompanyPortfolio}`}
                            </Typography>
                          </Box>
                        </Tooltip>
                        <Box textAlign="center" mt={1}>
                          <Tooltip title="Pulled Price" placement="top">
                            <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                              {pulls.at(-1).pullCompany.pullCompanyCost}
                            </Typography>
                          </Tooltip>
                          <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                            usd
                          </Typography>
                          <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                            /
                          </Typography>
                          <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                            {pulls.at(-1).pullCompany.pullCompanyUnits}
                          </Typography>
                          <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                            units
                          </Typography>
                          <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                            \
                          </Typography>
                          <Tooltip title="Current Price" placement="top">
                            <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                              {pulls.at(-1).pullCompany.pullCompanyPrice}
                            </Typography>
                          </Tooltip>
                          <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                            usd
                          </Typography>
                        </Box>
                        <Box mt={2} display="flex" justifyContent="center">
                          <Stack direction="row" spacing={1}>
                            {company.companyBids?.companyBidPrice > 0 &&
                                <Tooltip
                                  title="The Bid Price is the highest price you could buy this subscription. Kindly note that prices are updated in real-time."
                                  placement="top"
                                >
                                  <Card
                                    sx={{
                                      padding: '4px 8px 4px 8px',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      backgroundColor: '#ff4757',
                                      color: 'white'
                                    }}
                                  >
                                    ${company.companyBids.companyBidPrice}
                                  </Card>
                                </Tooltip>
                              }
                            {company.companyAsks?.companyAskPrice > 0 &&
                                <Tooltip
                                  title="The Ask Price is the lowest price you could sell this subscription. Kindly note that prices are updated in real-time."
                                  placement="top"
                                >
                                  <Card
                                    sx={{
                                      padding: '4px 8px 4px 8px',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      backgroundColor: '#2ed573',
                                      color: 'white'
                                    }}
                                  >
                                    ${company.companyAsks.companyAskPrice}
                                  </Card>
                                </Tooltip>
                              }
                          </Stack>
                        </Box>
                      </Card>
                    </Grid>
                  )}
                  {picks.length > 0 &&
                    picks.map(({ _id, pickCompany, pickAmount, pickPrice, pickUnits }) => (
                      <Grid key={_id} item xs={12} sm={6} md={6} lg={12}>
                        <Card style={{ padding: '80px' }}>
                          <Tooltip title={`Portfolio`} placement="top">
                            <Box textAlign="center">
                              <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                                ${pickAmount}
                              </Typography>
                            </Box>
                          </Tooltip>
                          <Box textAlign="center" mt={1}>
                            <Tooltip title="Pick Price" placement="top">
                              <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                                {pickPrice}
                              </Typography>
                            </Tooltip>
                            <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                              usd
                            </Typography>
                            <Typography component="span" mx={1} variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                              /
                            </Typography>
                            <Typography component="span" mr={0.2} variant="body2" fontWeight="700" color="black" textTransform="uppercase">
                              {pickUnits}
                            </Typography>
                            <Typography component="span" variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                              units
                            </Typography>
                          </Box>
                          <Box mt={2} display="flex" justifyContent="center">
                            <Stack direction="row" spacing={1}>
                              {company.companyBids?.companyBidPrice > 0 &&
                                <Tooltip
                                  title="The Bid Price is the highest price you could buy this subscription. Kindly note that prices are updated in real-time."
                                  placement="top"
                                >
                                  <Card
                                    sx={{
                                      padding: '4px 8px 4px 8px',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      backgroundColor: '#ff4757',
                                      color: 'white'
                                    }}
                                  >
                                    ${company.companyBids.companyBidPrice}
                                  </Card>
                                </Tooltip>
                              }
                              {company.companyAsks?.companyAskPrice > 0 &&
                                <Tooltip
                                  title="The Ask Price is the lowest price you could sell this subscription. Kindly note that prices are updated in real-time."
                                  placement="top"
                                >
                                  <Card
                                    sx={{
                                      padding: '4px 8px 4px 8px',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      backgroundColor: '#2ed573',
                                      color: 'white'
                                    }}
                                  >
                                    ${company.companyAsks.companyAskPrice}
                                  </Card>
                                </Tooltip>
                              }
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
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
                      <TabLabel label="Pick" value="1" disabled={!company.companyisOnIsoDate} />
                      <TabLabel label="Pull" value="2" disabled={company.companyisOnIsoDate} />
                      <TabLabel label="Push" value="3" disabled={company.companyisOnIsoDate} />
                    </TabsWrapper>
                  </Box>

                  <Box style={{ marginBottom: '0px', marginTop: '16px' }}>
                    <TabPanel sx={{ padding: 0 }} value="1">
                      <form noValidate autoComplete="off" onSubmit={handleSumbmitPick}>
                        <Grid item xs={12}>
                          <Card style={{ padding: '60px' }}>
                            <Stack spacing={1} sx={{ width: '100%' }}>
                              <TextField
                                sx={{ input: { textAlign: 'center' } }}
                                required
                                disabled
                                placeholder="pick price"
                                defaultValue={`$${company.companyIsoPrice}`}
                              />
                              <TextField
                                sx={{ input: { textAlign: 'center', textTransform: 'lowercase' } }}
                                required
                                placeholder="pick units"
                                onChange={({ target }) => setPickUnits(target.value)}
                                value={pickUnits}
                                type="number"
                              />
                              <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                <Button
                                  size="large"
                                  sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '14px' }}
                                  variant="contained"
                                  fullWidth={true}
                                  type="submit"
                                >
                                  {`Transfer ${pickUnits * company.companyIsoPrice} USD`}
                                </Button>
                              </Stack>
                            </Stack>
                          </Card>
                          <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="body2">
                              If the current price of a subscription matches or falls below your specified price, your pull request will automatically
                              be executed. Otherwise, it will be on hold for 90 days. If there's no pair after 90 days and your pull request is
                              canceled, you'll automatically be refunded. However, kindly note that the transaction fees are non-refundable. With that
                              being said, when you buy a company's subscriptions, you will be able to use the subscription units to access the
                              company's products. In addition to that, each subscription unit gives you a month of access to the company's products.
                            </Typography>
                          </Box>
                        </Grid>
                      </form>
                    </TabPanel>

                    <TabPanel sx={{ padding: 0 }} value="2">
                      <form noValidate autoComplete="off" onSubmit={handleSubmitPull}>
                        <Grid item xs={12}>
                          <Card style={{ padding: '60px' }}>
                            <Stack spacing={1} sx={{ width: '100%' }}>
                              <Tooltip
                                title="Kindly specify the maximum price you're willing to buy a subscription unit or leave blank to buy at the current lowest price."
                                placement="top"
                              >
                                <TextField
                                  sx={{ input: { textAlign: 'center' } }}
                                  required
                                  placeholder="current lowest ask price"
                                  type="number"
                                  onChange={({ target }) => setPullPrice(target.value)}
                                  value={pullPrice}
                                />
                              </Tooltip>
                              <Tooltip
                                title="Kindly specify the subscription units you'd like to buy. If there's no pair after 90 days, your request will be canceled."
                                placement="top"
                              >
                                <TextField
                                  sx={{ input: { textAlign: 'center', textTransform: 'lowercase' } }}
                                  required
                                  placeholder="pull units"
                                  type="number"
                                  onChange={({ target }) => setPullUnits(target.value)}
                                  value={pullUnits}
                                />
                              </Tooltip>
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
                                    {`Transfer $${pullPrice * pullUnits} USD`}
                                  </Button>
                                </Tooltip>
                              </Stack>
                            </Stack>
                          </Card>
                          <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="body2">
                              If the current price of a subscription matches or falls below your specified price, your pull request will automatically
                              be executed. Otherwise, it will be on hold for 90 days. If there's no pair after 90 days and your pull request is
                              canceled, you'll automatically be refunded. However, kindly note that the transaction fees are non-refundable. With that
                              being said, when you buy a company's subscriptions, you will be able to use the subscription units to access the
                              company's products. In addition to that, each subscription unit gives you a month of access to the company's products.
                            </Typography>
                          </Box>
                        </Grid>
                      </form>
                    </TabPanel>
                    <TabPanel sx={{ padding: 0 }} value="3">
                      <form noValidate autoComplete="off" onSubmit={handleSubmitPush}>
                        <Grid item xs={12}>
                          <Card style={{ padding: '60px' }}>
                            <Stack spacing={1} sx={{ width: '100%' }}>
                              <Tooltip
                                title="Kindly specify the minimum price you're willing to sell a subscription unit or leave blank to sell at the current highest price."
                                placement="top"
                              >
                                <TextField
                                  sx={{ input: { textAlign: 'center' } }}
                                  required
                                  placeholder="current highest bid price"
                                  type="number"
                                  onChange={({ target }) => setPushPrice(target.value)}
                                  value={pushPrice}
                                />
                              </Tooltip>
                              <Tooltip
                                title="Kindly specify the subscription units you'd like to sell. If there's no pair after 90 days, your request will be canceled."
                                placement="top"
                              >
                                <TextField
                                  sx={{ input: { textAlign: 'center', textTransform: 'lowercase' } }}
                                  required
                                  placeholder="push units"
                                  type="number"
                                  onChange={({ target }) => setPushUnits(target.value)}
                                  value={pushUnits}
                                />
                              </Tooltip>
                              <Stack marginTop={0} direction="row" width="100%" spacing={2}>
                                <Tooltip
                                  title="To receive this amount in your bank account, the above subscription units will be taken from your portfolio."
                                  placement="top"
                                >
                                  <Button
                                    size="large"
                                    sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '14px' }}
                                    variant="contained"
                                    fullWidth={true}
                                    type="submit"
                                  >
                                    {`Receive ${pushUnits * pushPrice} USD`}
                                  </Button>
                                </Tooltip>
                              </Stack>
                            </Stack>
                          </Card>

                          <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="body2">
                              If the current price of a subscription matches or rises above your specified price, your push request will automatically
                              be executed. Otherwise, it will be on hold for 90 days. If there's no pair after 90 days and your push request is
                              canceled, you'll still own the subscription units. In addition, no transaction fees will be charged because there's no
                              payout. With that being said, when you sell a company's subscriptions, the payout will automatically be transferred to
                              your connected bank account. However, you might lose access to the company's products and services.
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
  
  const { id: accountId } = session.user;

  try {
    await dbConnect();
    const { portfolioId } = ctx.params;
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
    
    const pullsFetched = await Pull.find({ pullTicker: portfolioId.toLowerCase(), pullAccountId: accountId });
    const pulls = pullsFetched.map(({ _id, pullCompany, pullPrice, pullAmount, pullUnits }) => {
      return { id: _id.toString(), pullCompany: JSON.parse(JSON.stringify(pullCompany)), pullPrice, pullAmount, pullUnits };
    });
    
    const pushesFetched = await Push.find({ pushTicker: portfolioId.toLowerCase(), pushAccountId: accountId });
    const pushes = pushesFetched.map(({ _id, pushAmount }) => {
      return { id: _id.toString(), pushAmount };
    });

    const picksFetched = await Pick.find({ pickTicker: portfolioId.toLowerCase(), pickAccountId: accountId });
    const picks = picksFetched.map(({ _id, pickCompany, pickPrice, pickAmount, pickUnits }) => {
      return { id: _id.toString(), pickCompany: JSON.parse(JSON.stringify(pickCompany)), pickPrice, pickAmount, pickUnits };
    });

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
        pulls,
        pushes,
        picks
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
