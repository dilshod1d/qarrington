import React from 'react';
import useSWR from 'swr';
import { Box, Card, Grid, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, Tooltip } from 'recharts';
import FooterMenu from '../menus/FooterMenu';

const Component = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: companies } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, fetcher);

  return (

    <div style={{ position: 'sticky', top: '100px' }}>

      <Grid container spacing={1}>
        <Grid item xs={12}>

          {/* chart starts */}

          <Card style={{ paddingTop: '40px', marginBottom: '10px' }}>
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

              {/* <AreaChart
                width={290}
                height={150}
                data={companies}
                margin={{
                  top: -20,
                  right: 40,
                  left: 40,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="companyKpi.companyIsRecordedAt" fontSize="12px" fontWeight={500} />
                <Tooltip />
                <Area type="monotone" dataKey="companyKpi.companyPrice" stroke="#2ed573" fill="#7bed9f20" />
              </AreaChart> */}

              <AreaChart
                width={290}
                height={150}
                data={charts}
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
            {companies && companies.slice(0, 1).map(({ _id, companyTicker, companyListing }) => (
              <Box key={_id} textAlign="center" marginBottom="40px">
                <Typography fontWeight={500} variant="body2"
                  component="span" color="secondary"
                  style={{ textDecoration: 'none' }}>
                  <a style={{ textDecoration: 'none', color: 'gray' }} href={`${companyListing.companyWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {companyListing.companyName}
                  </a>
                </Typography>
              </Box>
            ))}
          </Card>

          {/* chart stops */}

          <FooterMenu />

        </Grid>
      </Grid>

    </div>

  );

};

export default Component;

const charts = [
  {
    time: "1h",
    price: "28"
  },
  {
    time: "2h",
    price: "26"
  },
  {
    time: "3h",
    price: "34"
  },
  {
    time: "4h",
    price: "41"
  },
  {
    time: "5h",
    price: "39"
  },
  {
    time: "6h",
    price: "46"
  },
  {
    time: "7h",
    price: "45"
  }
]

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