import React from "react";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Button, Container, Grid, Hidden, Stack, styled, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Page = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher)

  return (
    <>
      <Head>
        <title>
          Cover Your Flight Expenses With Subscriptions • Qarrington
        </title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of technology companies to cover your flight expenses."
        />
      </Head>

      <MainContent style={Body}>

        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >

          {/* left container starts */}

          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">

              <Box style={{ textAlign: 'center' }}>

                <Box sx={{ cursor: 'pointer' }}>
                  <Link href="/">
                    <Image
                      alt="Qarrington Logo"
                      height={32}
                      width={32}
                      src="/assets/media/companies/qarrington.png"
                    />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Cover your flight expenses in 2023
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  Qarrington is a subscription exchange, where you can buy and sell the subscriptions of technology companies to cover your flight expenses. It's like stocks and cryptos, but backed by products.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <Link href="/account/create">
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        fullWidth={true}
                      >
                        i'm a consumer
                      </Button>
                    </Link>

                    <Link href="/account/create">
                      <Button
                        size="large"
                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="contained"
                        fullWidth={true}
                      >
                        i'm a business
                      </Button>
                    </Link>

                  </Stack>

                </Box>

                <Box textAlign="center">
                  <Typography variant="body2" mt={2} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    By clicking the above button, I hereby agree that I have read and accepted the Service Terms and Privacy Policies governing my use of the Qarrington website.
                  </Typography>
                </Box>

              </form>

            </Container>
          </Grid>

          {/* left container ends */}

          {/* right container starts */}

          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >

              <Container maxWidth="sm">
                <Box textAlign="center">
                  <Carousel>
                    {data && Array.isArray(data) && data.slice(0, 5).map(({ _id, accountProfile, accountReview }) => (
                      <Box key={_id}>
                        <Box
                          style={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right'
                            }}
                            variant={accountProfile.profileIsActive}
                          >
                            <Avatar
                              style={{ width: 80, height: 80 }}
                              alt={accountProfile.profileName}
                              src={accountProfile.profileAvatar}
                            />
                          </StyledBadge>
                        </Box>
                        <Box marginTop="16px">
                          <Typography variant="h5" component="div" fontWeight="600" gutterBottom>{accountProfile.profileName}</Typography>
                          <Typography variant="body" component="div" gutterBottom>{accountProfile.profileTitle}</Typography>
                          <Typography variant="h4" component="div" fontWeight="600">{accountReview.reviewContent}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Carousel>
                </Box>
              </Container>

            </GridWrapper>
          </Hidden>

          {/* right container ends */}

        </Grid>
      </MainContent>

    </>

  );

}

export default Page;

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green2};
`
);

const Body = {
  backgroundColor: "#ffffff"
};

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
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));