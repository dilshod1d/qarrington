import React from 'react';
import { pink } from '@mui/material/colors';
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material'
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

            <Box width="100%" height="100%">

              {companies && companies.slice(0, 1).map(({ _id, companyTicker, companyKpi, companyListing }) => (
                <>
                  {companyKpi && companyKpi.slice(0, 1).map(({ _id, companyCurrency, companyCapitalization, companyVolume, companyPrice, companyPriceVariant, companyPercentChange, companyPointChange, companyActiveCustomers, companyIsRecordedAt }) => (
                    <Box key={_id} textAlign="center" marginBottom="10px">
                      <Box>
                        <Typography fontSize="32px" fontWeight={700} component="span" color="black">
                          {companyPrice}
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
            </Box>

            <Grid item xs={12} mb={2}>
              <Grid container spacing={2}>
                {cubes && cubes.map(({ _id, date, price, variant }) => (
                  <Tooltip title={date} placement="top">
                    <Grid key={_id} item xs={12} sm={6} md={6} lg={1}>
                      <Box style={{ padding: '7px', border: '1px', borderRadius: '3px', backgroundColor: pink[variant] }}>
                        <></>
                      </Box>
                    </Grid>
                  </Tooltip>
                ))}
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
    _id: 1,
    date: "one1",
    price: "20",
    variant: 300
  },
  {
    _id: 2,
    date: "one2",
    price: "20",
    variant: 600
  },
  {
    _id: 3,
    date: "one3",
    price: "20",
    variant: 200
  },
  {
    _id: 4,
    date: "one3",
    price: "20",
    variant: 100
  },
  {
    _id: 5,
    date: "one3",
    price: "20",
    variant: 800
  },
  {
    _id: 6,
    date: "one3",
    price: "20",
    variant: 500
  }
]