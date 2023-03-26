import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Container,
  Card,
  Grid,
  Tab,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  TabContext,
  TabList,
} from '@mui/lab';
import Link from 'next/link';
import useSWR from 'swr';
import Marquee from "react-fast-marquee";
import { getCompaniesWithBestCap } from '@services/companies-services';

const Component = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    (async () => setCompanies(await getCompaniesWithBestCap({ quantity: 20 })))()
  }, [])

  return (

    <Container>
      <Box sx={{ marginTop: "108px", marginBottom: 2 }}>
        <Box display="flex" justifyContent="center">
          <Marquee gradient={false} pauseOnHover={true}>
            <Grid item xs={12} mb={2}>
              <Grid container spacing={0}>

                {companies.map(({ _id, companyListing, companyKpi }) => (
                  <Grid key={_id} mt={0} mb={-2} mx={0.5}>

                    <Link href={`/subscriptions/${companyListing.companyTicker.toLowerCase()}`}>
                      <Tooltip title={companyListing.companyName} placement="top">
                        <Card style={{ padding: '16px', cursor: 'pointer' }}>
                          <Box
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <Avatar
                              style={{ width: 24, height: 24 }}
                              alt={companyListing.companyName}
                              src={companyListing.companyLogo}
                            />
                          </Box>
                          <Box style={{ textAlign: 'center' }}>
                            <Box mt={0.5}>
                              <Typography component="span" variant="primary" color={companyKpi.companyDay.data[0].companyVariant} fontWeight={500}>
                                {companyKpi.companyDay.data[0] ? companyKpi.companyDay.data[0].companyPercentChange.toFixed(2) : '0.00'}
                              </Typography>
                              <Typography component="span" variant="body2" fontWeight={400} color="secondary">
                                %
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Tooltip>
                    </Link>

                  </Grid>
                ))}

              </Grid>
            </Grid>

          </Marquee>
        </Box>
      </Box>
    </Container>

  )

}

export default Component;
