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
import { checkIfComanyHasFuturIsoDate, checkIfCompanyIsInIsoDate } from '@helpers/companies-helpers';

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

                {companies.map((company) => (
                  <Grid key={company._id} mt={0} mb={-2} mx={0.5}>

                    <Link href={checkIfComanyHasFuturIsoDate(company) ? `/${company.companyListing.companyTicker.toLowerCase()}` : checkIfCompanyIsInIsoDate(company) ? `/portfolio/${company.companyListing.companyTicker.toLowerCase()}` : `/subscriptions/${company.companyListing.companyTicker.toLowerCase()}`}>
                      <Tooltip title={company.companyListing.companyName} placement="top">
                        <Card style={{ padding: '16px', cursor: 'pointer' }}>
                          <Box
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <Avatar
                              style={{ width: 24, height: 24 }}
                              alt={company.companyListing.companyName}
                              src={company.companyListing.companyLogo}
                            />
                          </Box>
                          <Box style={{ textAlign: 'center' }}>
                            <Box mt={0.5}>
                              <Typography component="span" variant="primary" color={company.companyKpi.companyDay.data[0]?.companyVariant ? company.companyKpi.companyDay.data[0]?.companyVariant : "primary"} fontWeight={500}>
                                {company.companyKpi.companyDay.data[0] ? company.companyKpi.companyDay.data[0].companyPercentChange.toFixed(2) : '0.00'}
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
