import Link from 'next/link';
import Head from 'next/head';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Avatar, Box, Breadcrumbs, Button, Card, Container, Grid, Hidden, Stack, styled, Tooltip, Typography } from '@mui/material';
import RightGridGuidesStories from "@components/grids/rightGridGuidesStories";
import dbConnect from '@lib/dbConnect';
import Story from '@models/story/Story';
import Guide from '@models/guide/Guide';

const Page = ({ stories, guides }) => {
  return (
    <>
      <Head>
        <title>
          Nasdaq for SaaS • Qarrington
        </title>
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

                {/* <Typography fontSize="42px" fontWeight="700" lineHeight="50px" component="div" sx={{ my: 1 }}>
                  Raise funds through ISO, <Typography color="secondary" component="span" fontSize="42px" fontWeight="700"><s>SAFE</s></Typography>, <Typography color="secondary" component="span" fontSize="42px" fontWeight="700"><s>IPO</s></Typography>, <Typography color="secondary" component="span" fontSize="42px" fontWeight="700"><s>VC</s></Typography>, <Typography color="secondary" component="span" fontSize="42px" fontWeight="700"><s>SPAC</s></Typography>, <Typography color="secondary" component="span" fontSize="42px" fontWeight="700"><s>ICO</s></Typography>
                  <Tooltip title="Subscriptions only give customers access to a company's products, they don't represent investments in the firm." placement="top">
                    <InfoRoundedIcon fontSize="small" color="primary" />
                  </Tooltip>
                </Typography> */}

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

                    <Link href="https://calendly.com/banjodeiyowun/qarrington">
                      <Button
                        size="large"
                        sx={{ py: 1.6, textTransform: 'uppercase', fontSize: '12px' }}
                        variant="outlined"
                        fullWidth={true}
                      >
                        talk to team
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
                  <Link href="https://calendly.com/banjodeiyowun/qarrington">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      lower fees
                    </Typography>
                  </Link>

                  <Link href="https://calendly.com/banjodeiyowun/qarrington">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      product-backed
                    </Typography>
                  </Link>

                  <Link href="https://calendly.com/banjodeiyowun/qarrington">
                    <Typography variant="body2" color="secondary" sx={Breadcrumb}>
                      fewer risks
                    </Typography>
                  </Link>

                </Breadcrumbs>

                <Box textAlign="center">
                  <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
                    Kindly note that before a company can be listed, the company must have whitelisted an acceptable number of customers for its <b>Initial Subscription Offering</b>.
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
                <RightGridGuidesStories stories={stories} guides={guides} />
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


export async function getServerSideProps() {
  try {
    await dbConnect();

    const stories = await Story.find()
    const guides = await Guide.find()


    return {
      props: {
        stories: stories ? JSON.parse(JSON.stringify(stories)) : [],
        guides: guides ? JSON.parse(JSON.stringify(stories)) : []
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

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

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green2};
`
);

const Body = {
  backgroundColor: "#ffffff"
};