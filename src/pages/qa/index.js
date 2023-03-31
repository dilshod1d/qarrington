import React from "react";
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Container, Grid, Stack, styled, Tooltip, Typography } from '@mui/material';
import MainStoryGuideSlide from '../../components/slide/MainStoryGuideSlide';

const Page = () => {

  return (

    <>

      <Head>
        <title>Q&A • Qarrington</title>
        <meta
          name="description"
          content="If you'd like to list a startup company for an Initial Subscription Offering or ISO, kindly join our weekly Q&A so we can see how your business model fits."
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

                <Box
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    justifyContent: 'center'
                  }}
                >
                  <Link href="/">
                    <Avatar
                      style={{ width: 40, height: 40 }}
                      alt="Qarrington Logo"
                      src="/assets/media/companies/qarrington.png"
                    />
                  </Link>
                </Box>

                <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Imagine raising $85M with 0% equity dilution
                  <Tooltip title="Subscriptions only give customers access to a company's products, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  Imagine a subscription exchange, where startups can raise funds thru <Tooltip title="This is the process of listing a company on a subscription exchange, where its subscriptions can be sold to customers." placement="top">
                    <Typography
                      component="span"
                      fontWeight={700}
                      color="primary"
                      variant="h6"
                      sx={{
                        "&:hover": {
                          color: '#000'
                        }
                      }}>Initial Subscription Offering</Typography></Tooltip>. If you want to list a company as a <b>founder</b> or list other companies as an <b>underwriter</b>, we're here.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <Link href="/">
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        fullWidth={true}
                      >
                        how qarrington works
                      </Button>
                    </Link>

                    <Link href="https://calendly.com/banjodeiyowun/qarrington">
                      <Button
                        size="large"
                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="contained"
                        fullWidth={true}
                      >
                        join weekly q&a
                      </Button>
                    </Link>

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
                  <Link href="/compare">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      compare
                    </Typography>
                  </Link>

                  <Link href="/contact">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      contact
                    </Typography>
                  </Link>

                </Breadcrumbs>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    Once you log in to your account, kindly provide all the necessary account details and contacts for smooth payouts. Otherwise, your future payouts might be delayed.
                  </Typography>
                </Box>

              </form>

            </Container>
          </Grid>

          {/* left container ends */}

          {/* right container starts */}

          <MainStoryGuideSlide />

          {/* right container ends */}

        </Grid>
      </MainContent>

    </>

  )

}

export default Page;

const Breadcrumb = {
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    color: '#000'
  },
};

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

const Body = {
  backgroundColor: "#ffffff"
};