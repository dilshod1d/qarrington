import React from "react";
import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Container, Grid, Stack, styled, Tooltip, Typography } from '@mui/material';
import MainStoryGuideSlide from '../../../components/slide/MainStoryGuideSlide';

const Page = ({ from, to, preposition }) => {

  return (

    <>

      <Head>
        <title>
          Fund Your {from} {preposition} {to} Flight Expenses • Qarrington
        </title>
        <meta
          name="description"
          content={`Qarrington is a subscription exchange that lets you buy and sell the subscriptions of technology companies to cover your ${from} ${preposition} ${to} expenses.`}
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
                  Fund your {from} {preposition} {to} flight in 2023
                  <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography>

                <Typography variant="h6" component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                  Qarrington is a subscription exchange that lets you buy and sell the subscriptions of technology companies to fund your {from} {preposition} {to} flight in 2023. Think stocks, but backed by products.
                </Typography>

              </Box>

              <form noValidate autoComplete="on">

                <Box style={{ textAlign: 'center', padding: '14px 60px 0px 60px' }}>

                  <Stack spacing={1.2} sx={{ width: '100%' }}>

                    <Link href="/account/access">
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        fullWidth={true}
                      >
                        i'm a qarrington
                      </Button>
                    </Link>

                    <Link href="/account/open">
                      <Button
                        size="large"
                        sx={{ color: 'white', py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="contained"
                        fullWidth={true}
                      >
                        i'm not a qarrington yet
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
                  <Link href="/account/access">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      access account
                    </Typography>
                  </Link>

                  <Link href="/account/recover">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      recover account
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

  );

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

export async function getServerSideProps(context) {
  const { destinationId } = context.params;
  let fromId, preposition, toId, index;
  const url = process.env.NEXT_PUBLIC_APP_URL;
  console.log(url);
  const data = destinationId.split('-');
  if (data.length === 3) {
    fromId = data[0];
    preposition = data[1];
    toId = data[2];
  }
  else {
    console.log(data);
    if (data.includes('from')) {
      index = data.indexOf('from')
    }
    else {
      index = data.indexOf('to')
    }
    console.log(index);
    fromId = data.slice(0, index);
    fromId = fromId.join(" ")
    preposition = data.slice(index, index + 1);
    preposition = preposition.toString()
    toId = data.slice(index + 1);
    toId = toId.join(" ");
  }

  console.log(fromId);
  const results = await fetch(
    `${url}/api/destinations?destinationToUrl=${toId}&destinationFromUrl=${fromId}`
  ).then((r) => r.json());
  console.log(results);
  if (!results.readItems.readdestinationToUrlItems || !results.readItems.readdestinationFromUrlItems || (preposition !== 'to' && preposition !== 'from')) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      to: results.readItems.readdestinationToUrlItems.destinationToName,
      from: results.readItems.readdestinationFromUrlItems.destinationFromName,
      preposition
    }
  };
}