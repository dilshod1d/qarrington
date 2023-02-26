import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Badge, Box, Breadcrumbs, Button, Container, Grid, Hidden, Stack, styled, TextField, Tooltip, Typography } from '@mui/material';
import useSWR from 'swr';

const Page = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/accounts`, fetcher)

  return (

    <>

      <Head>
        <title>Retake Account • Qarrington</title>
        <meta
          name="description"
          content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
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
                  If you have lost your accountKey, no worries.
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  It's ok to forget or misplace your accountKey, if that's your case, kindly enter your accountId below to recover it. If you can't remember your accountId either, you'd need a new account.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <TextField
                      sx={{ input: { textAlign: "center" } }}
                      required
                      placeholder="Enter your accountId"
                    />

                    <Button
                      size="large"
                      sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                      variant="contained"
                      fullWidth={true}
                      type="submit"
                    >
                      Continue
                    </Button>

                  </Stack>

                </Box>

                <Breadcrumbs separator="/" aria-label="breadcrumb"
                  sx={{
                    "& ol": {
                      justifyContent: "center",
                      margin: "auto",
                      mt: "20px"
                    }
                  }}>
                  <Link href="/account/create">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      create account
                    </Typography>
                  </Link>

                  <Link href="/account/access">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      access account
                    </Typography>
                  </Link>

                </Breadcrumbs>

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

const Breadcrumb = {
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    color: '#000'
  },
};