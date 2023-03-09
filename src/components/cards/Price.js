import React from 'react';
import { green } from '@mui/material/colors';
import { Box, Card, Divider, Grid, Tooltip, Typography } from '@mui/material'
import FooterMenu from '../menus/FooterMenu';
import useSWR from 'swr';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

  return (

    <div style={{ position: 'sticky', top: '100px' }}>

      <Grid container spacing={1}>
        <Grid item xs={12}>

          {/* chart starts */}

          <Card style={{ padding: '40px', marginBottom: '10px' }}>

            {companies && companies.slice(0, 1).map(({ _id, companyTicker, companyKpi, companyListing }) => (
              <>
                {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyCurrency, companyCapitalization, companyVolume, companyPrice, companyPriceVariant, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                  <Box key={_id} textAlign="center" marginBottom="10px">
                    <Box>
                      <Typography fontSize="32px" fontWeight={700} component="span" color="black">
                        ${companyPrice}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography fontSize="16px" fontWeight={600} component="span" color={companyPriceVariant}>
                        {`+${companyPointChange}`}
                      </Typography>
                      <Typography variant="body2" component="span" color="secondary" marginX={0.5}>
                        \
                      </Typography>
                      <Typography fontSize="14px" fontWeight={600} component="span" color={companyPriceVariant}>
                        {`+${companyPercentChange}`}%
                      </Typography>
                    </Box>

                    <Box>
                      <Typography style={Data2Item} component="span" color="black">
                        {companyVolume}
                      </Typography>
                      <Typography style={Data2Helper} component="span" color="secondary">
                        Vol
                      </Typography>
                      <Typography style={Data2Item} component="span" color="black">
                        {`${companyCapitalization}`}
                      </Typography>
                      <Typography style={Data2Helper} component="span" color="secondary">
                        Cap
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </>
            ))}

            <Grid item xs={12} mb={0}>
              <Grid container spacing={1}>
                {cubes && cubes.map(({ _id, date, price, variant }) => (
                  <Tooltip title={date} placement="top">
                    <Grid key={_id} item xs={12} sm={6} md={6} lg={1} mb={-0.5}>
                      <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[variant] }}>
                        <></>
                      </Box>
                    </Grid>
                  </Tooltip>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} mt={1}>
              <Grid container spacing={1} display="flex" justifyContent="center">
                {/* <Grid item xs={12} sm={1.5} mt={-0.4}>
                  <Typography textAlign="right" fontWeight="600" color="secondary" component="span" fontSize="11px">FALL</Typography>
                </Grid> */}
                <Tooltip title="low" placement="top">
                  <Grid item xs={12} sm={6} md={6} lg={1}>
                    <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[100] }}>
                      <></>
                    </Box>
                  </Grid>
                </Tooltip>
                {/* <Tooltip title="low" placement="top">
                  <Grid item xs={12} sm={6} md={6} lg={1}>
                    <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[300] }}>
                      <></>
                    </Box>
                  </Grid>
                </Tooltip> */}
                <Tooltip title="mid" placement="top">
                  <Grid item xs={12} sm={6} md={6} lg={1}>
                    <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[500] }}>
                      <></>
                    </Box>
                  </Grid>
                </Tooltip>
                {/* <Tooltip title="low" placement="top">
                  <Grid item xs={12} sm={6} md={6} lg={1}>
                    <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[700] }}>
                      <></>
                    </Box>
                  </Grid>
                </Tooltip> */}
                <Tooltip title="high" placement="top">
                  <Grid item xs={12} sm={6} md={6} lg={1}>
                    <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: green[900] }}>
                      <></>
                    </Box>
                  </Grid>
                </Tooltip>
                {/* <Grid item xs={12} sm={2} mt={-0.4}>
                  <Typography textAlign="left" fontWeight="600" color="secondary" component="span" fontSize="11px">RISE</Typography>
                </Grid> */}
              </Grid>
            </Grid>

          </Card>

          <FooterMenu />

        </Grid>
      </Grid>

    </div>
  );
};

export default Component;

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

const cubes = [
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 100
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 800
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 500
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 300
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 600
  },
  {
    date: "Fri, May 22, 2023, 7:45 PM",
    price: "20",
    variant: 200
  }
]