import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '../../components/menus/HeaderMenu';
import Menu from '../../components/cards/Menu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, Stack, styled, Tab, Tooltip, Typography } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Footer from '../../components/main/Footer';
import useSWR from 'swr';
import { Pagination } from '@mui/lab';
import Pull from '@models/pull/Pull';
import Push from '@models/push/Push';
import Pick from '@models/pick/Pick';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import dbConnect from '@lib/dbConnect';

const Page = ({ pushes, picks, pulls, pullAccountPortfolio }) => {

  const [value, setValue] = useState(pulls.length > 0 ? '2' : '1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title>Portfolio • Qarrington</title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange that allows you to buy, sell, and exchange the subscriptions of your favorite technology companies with lower fees."
        />
      </Head>

      <HeaderMenu />

      <Container>
        <Grid container spacing={2}>
          {/* Menu Starts Here */}

          <Grid item xs={12} md={6} lg={3}>
            <Menu />
          </Grid>

          {/* Menu Ends Here */}

          <Grid item xs={12} md={6} lg={6} mb={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <Card style={{ padding: '80px', marginBottom: '16px' }}>
                      <Tooltip title="Portfolio" placement="top">
                        <Box textAlign="center">
                          <CurrencyBadge badgeContent="USD" color="success" fontWeight={700}></CurrencyBadge>
                          <Typography variant="h2" fontWeight="700" color="black" marginTop={1} marginBottom={0.5}>
                            ${pullAccountPortfolio}
                          </Typography>
                        </Box>
                      </Tooltip>
                      <Box textAlign="center">
                        <Typography variant="body2" fontWeight="600" color="secondary" textTransform="uppercase">
                          account portfolio
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>

                {/* tab starts */}

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
                      <TabLabel label="Picked" value="1" />
                      <TabLabel label="Pulled" value="2" />
                      <TabLabel label="Pushed" value="3" />
                    </TabsWrapper>
                  </Box>

                  <Box style={{ marginBottom: '0px', marginTop: '16px' }}>
                    {/* picked starts */}

                    <TabPanel sx={{ padding: 0 }} value="1">
                      <Grid item xs={12} mb={2}>
                        <Grid container spacing={1}>
                          {picks.length > 0 && picks.map(({ id, pickCompany, pickTicker }) => (
                              <Grid key={id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/portfolio/${pickTicker}`}>
                                  <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                    <Box
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      <Stack direction="row" spacing={2}>
                                        <Avatar
                                          alt={pickCompany.pickCompanyName}
                                          src={pickCompany.pickCompanyLogo}
                                          sx={{ height: '40px', width: '40px' }}
                                        />
                                      </Stack>
                                    </Box>
                                    <Box style={{ textAlign: 'center' }}>
                                      <Box style={{ textAlign: 'center' }}>
                                        <Box>
                                          <Box textAlign="center" mt={1.5} mb={0.5}>
                                            <Typography
                                              component="span"
                                              mr={0.2}
                                              variant="body"
                                              fontWeight="700"
                                              color="black"
                                              textTransform="uppercase"
                                            >
                                              {pickCompany.pickCompanyName}
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                              {pickTicker}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Card>
                                </Link>
                              </Grid>
                            ))}

                          <Grid item xs={12}>
                            <Card style={{ padding: '60px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                              <Stack spacing={2}>
                                <Pagination count={10} variant="outlined" shape="rounded" />
                              </Stack>
                            </Card>
                            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                              <Typography variant="body2">
                                The above subscriptions are the subscriptions of companies that you currently own in your account portfolio. With that
                                being said, kindly note that when you submit a pull request, the subscription will not be shown here unless the
                                request is matched with a push request.
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>

                    {/* picked stops */}

                    {/* pulled starts */}

                    <TabPanel sx={{ padding: 0 }} value="2">
                      <Grid item xs={12} mb={2}>
                        <Grid container spacing={1}>
                          {pulls.length > 0 && pulls.map(({ _id, pullTicker, pullCompany, pullStatus }) => (
                              <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/portfolio/${pullTicker}`}>
                                  <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                    <Box
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      <Stack direction="row" spacing={2}>
                                        <StyledBadge
                                          overlap="circular"
                                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                          variant={pullStatus.pullIsMatched ? "dot" : "standard"}
                                        >
                                          <Avatar
                                            alt={pullCompany.pullCompanyName}
                                            src={pullCompany.pullCompanyLogo}
                                            sx={{ height: '40px', width: '40px' }}
                                          />
                                        </StyledBadge>
                                      </Stack>
                                    </Box>
                                    <Box style={{ textAlign: 'center' }}>
                                      <Box style={{ textAlign: 'center' }}>
                                        <Box>
                                          <Box textAlign="center" mt={1.5} mb={0.5}>
                                            <Typography
                                              component="span"
                                              mr={0.2}
                                              variant="body"
                                              fontWeight="700"
                                              color="black"
                                              textTransform="uppercase"
                                            >
                                              {pullCompany.pullCompanyName}
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                              {pullTicker}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Card>
                                </Link>
                              </Grid>
                            ))}

                          <Grid item xs={12}>
                            <Card style={{ padding: '60px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                              <Stack spacing={2}>
                                <Pagination count={10} variant="outlined" shape="rounded" />
                              </Stack>
                            </Card>
                            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                              <Typography variant="body2">
                                The above subscriptions are the subscriptions of companies that you currently own in your account portfolio. With that
                                being said, kindly note that when you submit a pull request, the subscription will not be shown here unless the
                                request is matched with a push request.
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>

                    {/* pulled stops */}

                    {/* pushed starts */}

                    <TabPanel sx={{ padding: 0 }} value="3">
                      <Grid item xs={12} mb={2}>
                        <Grid container spacing={1}>
                          {pushes.length > 0 && pushes.map(({ _id, pushTicker, pushCompany, pushStatus }) => (
                              <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/portfolio/${pushTicker}`}>
                                  <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                    <Box
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      <Stack direction="row" spacing={2}>
                                        <StyledBadge
                                          overlap="circular"
                                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                          variant={pushStatus.pushIsMatched}
                                        >
                                          <Avatar
                                            alt={pushCompany.pushCompanyName}
                                            src={pushCompany.pushCompanyLogo}
                                            sx={{ height: '40px', width: '40px' }}
                                          />
                                        </StyledBadge>
                                      </Stack>
                                    </Box>
                                    <Box style={{ textAlign: 'center' }}>
                                      <Box>
                                        <Box textAlign="center" mt={1.5} mb={0.5}>
                                          <Typography
                                            component="span"
                                            mr={0.2}
                                            variant="body"
                                            fontWeight="700"
                                            color="black"
                                            textTransform="uppercase"
                                          >
                                            {pushCompany.pushCompanyName}
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                            {pushTicker}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Card>
                                </Link>
                              </Grid>
                            ))}

                          <Grid item xs={12}>
                            <Card style={{ padding: '60px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                              <Stack spacing={2}>
                                <Pagination count={10} variant="outlined" shape="rounded" />
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
                        </Grid>
                      </Grid>
                    </TabPanel>

                    {/* pushed stops */}
                  </Box>
                </TabContext>

                {/* tab stops */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <RightGrid />
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </div>
  );
};

export default Page;

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
    const pullsFetched = await Pull.find({ pullAccount: { pullAccountId: accountId } });

    const pulls = pullsFetched.map(({ _id, pullCompany, pullPrice, pullAmount, pullUnits, pullStatus, pullTicker }) => {
      return { id: _id.toString(), pullCompany: JSON.parse(JSON.stringify(pullCompany)), pullPrice, pullAmount, pullUnits, pullTicker, pullStatus: JSON.parse(JSON.stringify(pullStatus))};
    });

    const pullAccountPortfolio = pulls?.reduce((acc, curr) => acc + curr.pullCompany.pullCompanyPortfolio ,0) || 0

    const pushesFetched = await Push.find({ pushAccount: { pushAccountId: accountId } });
    const pushes = pushesFetched.map(({ _id, pushAmount, pushTicker, pushCompany, pushStatus }) => {
      return { id: _id.toString(), pushAmount };
    });

    const picksFetched = await Pick.find({ pickAccountId: accountId });
    const picks = picksFetched.map(({ _id, pickCompany, pickTicker }) => {
      return { id: _id.toString(), pickTicker, pickCompany: JSON.parse(JSON.stringify(pickCompany)) };
    });
  
    return {
      props: {
        pulls,
        pushes,
        picks,
        pullAccountPortfolio
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

const TabsWrapper = styled(TabList)(
  ({ theme }) => `
          &.MuiTabs-root {
            height: 0;
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
