import React from 'react';
import Head from 'next/head';
import Navbar from '../../../../components/topics/Navbar';
import Footer from '../../../../components/topics/Footer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { dowStocks } from '../../../../../indexes/dowStocks';

const Page = () => {

    return (

        <>

            <Head>
                <title>Dow Jones Industrial Average • Qarrington</title>
                <meta
                    name="description"
                    content={`Buy, sell, & transfer the subscriptions of innovative startup companies. It's like buying stocks, but instead of shares, it's product-backed subscriptions.`}
                />
            </Head>

            <Grid style={{ backgroundColor: '#fff' }}>

                <Navbar />

                <Container style={{ backgroundColor: '#fff' }}>
                    <Grid container spacing={2}>

                        <Grid item xs>
                            {/* <LeftSide /> */}
                        </Grid>

                        <Grid my={8} item xs={7}>

                            <Box style={{ padding: '0px 0px 0px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    How subscriptions can outperform the stock market in the future.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    Buy, sell, and transfer the subscriptions of innovative startup companies. It's like buying stocks, but instead of shares, it's product-backed subscriptions.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                    In the late 1400s, the stock market was designed in Antwerp, Belgium based on the mechanism known as the Naked Asset Model (NAM), a system where financial assets such as currencies, shares, and cryptocurrencies are literally backed by nothing. Even though the subscription market is still in its early stage, each subscription unit sold or bought on a subscription exchange like Qarrington ... is fully backed by the underlying products and services of the listed companies.
                                </Typography>
                                <Typography component="div" mt={1.5} variant="body" fontWeight={500} color="secondary">
                                    For example, if today, you bet the sum of $25,000 on a company's stock, and by tomorrow morning, the price of the stock goes to $0, that's it. On the contrary to that, if you buy the subscriptions of an early-stage innovative technology company for the same amount and the price tanks to $0 the following day, you'd still have access to the products and services offered by the startup.
                                </Typography>
                            </Box>

                            {/* footer starts */}

                            <Footer />

                            {/* footer ends */}

                        </Grid>

                        <Grid item xs>
                            {/* <RightSide /> */}
                        </Grid>

                    </Grid>
                </Container>
            </Grid >

        </>

    )
}

export default Page

export async function getStaticProps() {
    // Instead of fetching your `/api` route you can call the same
    // function directly in `getStaticProps`
    const stockItem = await dowStocks()
  
    // Props returned will be passed to the page component
    // return { props: { posts } }
        return {
      props: {
        name: stockItem.stockName,
        ticker: stockItem.stockTicker
      }
    }
  }

// export async function getStaticProps({ params }) {
//     const stockItem = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stocks?stockUrl=${params.stockId}`).then(r => r.json());
//     return {
//       props: {
//         name: stockItem.stockName,
//         ticker: stockItem.stockTicker
//       }
//     }
//   }
  
  export async function getStaticPaths() {
    const stockItems = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stocks?stockUrl`).then((r) => r.json());
    return {
      paths: stockItems.map(item => {
        const stockId = item.stockUrl;
        return {
          params: {
            stockId
          }
        }
      }),
      fallback: false
    }
  }

// export async function getStaticProps({ params }) {
//     await dbConnect()
//     const cryptoItem = await Crypto.findOne({ cryptoRoute: params.cryptoId });
//     return {
//       props: {
//         name: cryptoItem.cryptoName,
//         ticker: cryptoItem.cryptoTicker
//       },
//       revalidate: 60,
//     }
//   }
  
//   export async function getStaticPaths() {
//     await dbConnect()
//     const cryptoItems = await Crypto.find();
//     return {
//       paths: cryptoItems.map(item => {
//         const cryptoId = item.cryptoRoute;
//         return {
//           params: {
//             cryptoId
//           }
//         }
//       }),
//       fallback: false
//     }
//   }