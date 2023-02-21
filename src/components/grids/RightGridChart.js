import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Avatar, Box, Breadcrumbs, Button, Card, Grid, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/drafts`, fetcher);
  const { data: market } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/markets`, fetcher)

  return (

    <div style={{ position: 'sticky', top: '100px' }}>

      <Grid container spacing={1}>
        <Grid item xs={12}>

          {/* chart starts */}

          <Card style={{ paddingTop: '40px', marginBottom: '10px' }}>
            <Box width="100%" height="100%">

              {market && market.slice(0, 1).map(({ _id, time, price, volume, draftId, cappedAt, movements, recordedAt }) => (
                <Box key={_id} textAlign="center" marginBottom="10px">

                  <Box>
                    <Typography fontSize="32px" fontWeight={700} component="span" color="black">
                      {draftId.price}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontSize="16px" fontWeight={600} component="span" color={movements.high.color}>
                      {`+${movements.high.points}`}
                    </Typography>
                    <Typography variant="body2" component="span" color="secondary" marginX={0.5}>
                      \
                    </Typography>
                    <Typography fontSize="14px" fontWeight={600} component="span" color={movements.high.color}>
                      {`+${movements.high.percent}`}%
                    </Typography>
                  </Box>

                  <Box>
                    <Typography style={Data2Item} component="span" color="black">
                      {volume}
                    </Typography>
                    <Typography style={Data2Helper} component="span" color="secondary">
                      Vol.
                    </Typography>
                    <Typography style={Data2Item} component="span" color="black">
                      {`${cappedAt}`}
                    </Typography>
                    <Typography style={Data2Helper} component="span" color="secondary">
                      val.
                    </Typography>
                  </Box>

                  {/* <Box display="inline-flex" textAlign="center">
                    {movements.range && movements.range.slice(0, 6).map(({ _id, key, name, items }) => (
                      <Box sx={{ m: 0.5 }}>
                        <Button variant="outlined" size="small"
                          sx={{ padding: '0px', fontSize: '10px' }}>
                          {key}
                        </Button>
                      </Box>
                    ))}
                  </Box> */}

                </Box>

              ))}

              <AreaChart
                width={290}
                height={150}
                data={market}
                margin={{
                  top: -20,
                  right: 40,
                  left: 40,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="time" fontSize="12px" fontWeight={500} />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#2ed573" fill="#7bed9f20" />
              </AreaChart>
            </Box>
            {market && market.slice(0, 1).map(({ _id, time, price, volume, draftId, cappedAt, movements, recordedAt }) => (
              <Box key={_id} textAlign="center" marginBottom="40px">
                <Typography fontWeight={500} variant="body2"
                  component="span" color="secondary"
                  style={{ textDecoration: 'none' }}>
                  <a href={`${draftId.url}`} target="_blank"
                    rel="noopener noreferrer">
                    {draftId.name}
                  </a>
                </Typography>
              </Box>
            ))}
          </Card>

          {/* chart stops */}

          <Box style={footer} role="presentation">
            <Breadcrumbs
              separator="/"
              aria-label="breadcrumb"
              sx={{
                '& ol': {
                  justifyContent: 'center',
                  fontSize: '12px',
                  margin: 'auto',
                  textDecoration: 'none'
                }
              }}
            >
              <Link href="/a/about">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={BreadcrumbItem}
                >
                  About
                </Typography>
              </Link>
              <Link href="/a/products">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={BreadcrumbItem}
                >
                  Products
                </Typography>
              </Link>
              <Link href="/a/solutions">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={BreadcrumbItem}
                >
                  Solutions
                </Typography>
              </Link>
              <Link href="/a/mechanisms">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={BreadcrumbItem}
                >
                  Mechanisms
                </Typography>
              </Link>
              <Link href="/a/preferences">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={BreadcrumbItem}
                >
                  Preferences
                </Typography>
              </Link>
              <Link href="/">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={BreadcrumbItem}
                >
                  Logout
                </Typography>
              </Link>
            </Breadcrumbs>
          </Box>

          <Box style={footerBrand}>
            <Typography variant="body2" color="secondary">
              Qarrington, Inc. © 2023
            </Typography>
          </Box>

        </Grid>
      </Grid>

    </div>

  );

};

export default Component;

const RangeName = {
  cursor: 'pointer',
  fontWeight: '500',
  '&:hover': {
    color: '#000'
  }
};

const MarketItem = {
  fontWeight: '700',
  fontSize: '20px',
  marginRight: '4px'
};

const MarketHelper = {
  fontWeight: '700',
  fontSize: '12px',
  marginRight: '8px',
  textTransform: 'uppercase'
};

const Data2Item = {
  fontWeight: '600',
  fontSize: '12px',
  marginRight: '4px'
};

const Data2Helper = {
  fontWeight: '600',
  fontSize: '10px',
  marginRight: '8px',
  textTransform: 'uppercase'
};

const BreadcrumbItem = {
  cursor: 'pointer',
  fontWeight: '500',
  '&:hover': {
    color: '#000'
  }
};

const footer = {
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 20px 10px 20px'
};

const footerBrand = {
  textAlign: 'center'
};