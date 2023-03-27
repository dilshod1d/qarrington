import React from 'react';
import Link from 'next/link';
import FooterMenu from '../menus/FooterMenu';
import { Avatar, Box, Card, Grid, Tooltip } from '@mui/material';

const Component = () => {

  return (

    <Grid style={{ position: 'sticky', top: '100px' }}>

      <Grid item xs={12} mt={4}>
        <Grid container spacing={1}>

          {companies && Array.isArray(companies) && companies?.slice(0, 9).map(({ _id, companySlug, companyListing }) => (
            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
              <Link href={companySlug}>
                <Card style={{ padding: '28px', cursor: 'pointer' }}>
                  <Tooltip title={companyListing.companyName} placement="top">
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <Avatar
                        style={{ width: 32, height: 32 }}
                        alt={companyListing.companyTicker}
                        src={companyListing.companyLogo}
                      />
                    </Box>
                  </Tooltip>
                </Card>
              </Link>
            </Grid>
          ))}

        </Grid>
      </Grid>

      <FooterMenu />

    </Grid>

  )

}

export default Component;

const companies = [
  {
    _id: 1,
    companySlug: "/han",
    companyListing: {
      companyTicker: "HAN",
      companyName: "Handshake",
      companyLogo: "/assets/media/companies/handshake.png"
    }
  },
  {
    _id: 2,
    companySlug: "/urb",
    companyListing: {
      companyTicker: "URB",
      companyName: "Urban",
      companyLogo: "/assets/media/companies/urban.png"
    }
  },
  {
    _id: 3,
    companySlug: "/win",
    companyListing: {
      companyTicker: "WIN",
      companyName: "Winsta",
      companyLogo: "/assets/media/companies/winsta.png"
    }
  },
  {
    _id: 4,
    companySlug: "/jas",
    companyListing: {
      companyTicker: "JAS",
      companyName: "Jasper",
      companyLogo: "/assets/media/companies/jasper.png"
    }
  },
  {
    _id: 5,
    companySlug: "/cir",
    companyListing: {
      companyTicker: "CIR",
      companyName: "Cirkle",
      companyLogo: "/assets/media/companies/cirkle.png"
    }
  },
  {
    _id: 6,
    companySlug: "/spa",
    companyListing: {
      companyTicker: "SPA",
      companyName: "Splash",
      companyLogo: "/assets/media/companies/splash.png"
    }
  },
  {
    _id: 7,
    companySlug: "/alo",
    companyListing: {
      companyTicker: "ALO",
      companyName: "Algoma",
      companyLogo: "/assets/media/companies/algoma.png"
    }
  },
  {
    _id: 8,
    companySlug: "/twn",
    companyListing: {
      companyTicker: "TWN",
      companyName: "Twined",
      companyLogo: "/assets/media/companies/twined.png"
    }
  },
  {
    _id: 9,
    companySlug: "/hil",
    companyListing: {
      companyTicker: "HIL",
      companyName: "Highland",
      companyLogo: "/assets/media/companies/swind.png"
    }
  }
]