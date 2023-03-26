import { getVariantForBoxes } from '@helpers/prices-helpers';
import { Box, Button, Breadcrumbs, Card, Grid, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { getCompanyBy } from '@services/companies-services';
import { useEffect, useState, useRef } from 'react';

const dictionary = {
  N: 'companyNow',
  H: 'companyHour',
  D: 'companyDay',
  W: 'companyWeek',
  M: 'companyMonth',
  Y: 'companyYear'
};

const PriceGrid = ({ id, kpi }) => {
  const [currentKpi, setCurrentKpi] = useState(
    new Array(60)
    .fill(null)
    .map((n, i) => {
      if (kpi[i]) return kpi[i];
      return null;
    })
    .reverse());

  const letter = useRef('N')

  useEffect(() => {
    const refetching = async () => {
        const response = await getCompanyBy({ id })
        if(response.success) {
          const currKpi = response.data.companyKpi[dictionary[letter.current]].data
          setCurrentKpi(
            new Array(60)
              .fill(null)
              .map((n, i) => {
                if (currKpi[i]) return currKpi[i];
                return null;
              })
              .reverse()
          )
        }
      }
      const interval = setInterval(refetching, 5000)
      return () => clearInterval(interval)
  }, [])

  const handleChange = async (e, lett) => {
    e.preventDefault();
    letter.current = lett

    const response = await getCompanyBy({ id })
    if(response.success) {
      const currKpi = response.data.companyKpi[dictionary[letter.current]].data
      setCurrentKpi(
        new Array(60)
          .fill(null)
          .map((n, i) => {
            if (currKpi[i]) return currKpi[i];
            return null;
          })
          .reverse()
      )
    }
  };

  return (
    <Card style={{ padding: '40px', marginBottom: '10px' }}>
      <Box textAlign="center" marginBottom="10px">
        <Box>
          <Typography fontSize="32px" fontWeight={700} component="span" color="black">
            ${currentKpi.at(-1)?.companyPrice ? currentKpi.at(-1).companyPrice : 'n/a'}
          </Typography>
        </Box>

        <Box>
          <Typography fontSize="16px" fontWeight={600} component="span" color={currentKpi.at(-1)?.companyVariant}>
            {`${currentKpi.length > 0 ? currentKpi.at(-1)?.companyPointChange.toFixed(2) : 'n/a'}`}
          </Typography>
          <Typography variant="body2" component="span" color="secondary" marginX={0.5}>
            \
          </Typography>
          <Typography fontSize="14px" fontWeight={600} component="span" color={currentKpi.at(-1)?.companyVariant}>
            {`${currentKpi.length > 0 ? currentKpi.at(-1).companyPercentChange + '%' : 'n/a'}`}
          </Typography>
        </Box>

        <Box>
          <Typography style={Data2Item} component="span" color="black">
            {currentKpi.length > 0 ? currentKpi.at(-1).companyVolume : 'n/a'}
          </Typography>
          <Typography style={Data2Helper} component="span" color="secondary">
            Vol
          </Typography>
          <Typography style={Data2Item} component="span" color="black">
            {`${currentKpi.length > 0 ? currentKpi.at(-1).companyCapitalization : 'n/a'}`}
          </Typography>
          <Typography style={Data2Helper} component="span" color="secondary">
            Cap
          </Typography>
        </Box>
      </Box>
      <Grid item xs={12} mt={1.5}>
        <Grid container spacing={1}>
          {currentKpi.map((data, id) =>
            data ? (
              <Tooltip key={data._id} title={data.companyIsRecordedAt} placement="top">
                <Grid item xs={12} sm={6} md={6} lg={1} mb={-0.5}>
                  <Box
                    style={{
                      padding: '7px',
                      border: '1px',
                      borderRadius: '3px',
                      backgroundColor: getVariantForBoxes(data)
                    }}
                  ></Box>
                </Grid>
              </Tooltip>
            ) : (
              <Tooltip key={id} title={'no data'} placement="top">
                <Grid item xs={12} sm={6} md={6} lg={1} mb={-0.5}>
                  <Box
                    style={{
                      padding: '7px',
                      border: '1px',
                      borderRadius: '3px',
                      backgroundColor: grey['500']
                    }}
                  >
                    <></>
                  </Box>
                </Grid>
              </Tooltip>
            )
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} mt={1}>
        <Grid container spacing={1} display="flex" justifyContent="center">
          {/* <Grid item xs={12} sm={1.5} mt={-0.4}>
            <Typography textAlign="right" fontWeight="600" color="secondary" component="span" fontSize="11px">FALL</Typography>
          </Grid> */}
          <Tooltip title="low" placement="top">
            <Grid item xs={12} sm={6} md={6} lg={1}>
              <Box
                style={{
                  padding: '7px',
                  border: '1px',
                  borderRadius: '3px',
                  backgroundColor: green[200]
                }}
              >
                <></>
              </Box>
            </Grid>
          </Tooltip>
          <Tooltip title="mid" placement="top">
            <Grid item xs={12} sm={6} md={6} lg={1}>
              <Box
                style={{
                  padding: '7px',
                  border: '1px',
                  borderRadius: '3px',
                  backgroundColor: green[400]
                }}
              >
                <></>
              </Box>
            </Grid>
          </Tooltip>
          <Tooltip title="high" placement="top">
            <Grid item xs={12} sm={6} md={6} lg={1}>
              <Box
                style={{
                  padding: '7px',
                  border: '1px',
                  borderRadius: '3px',
                  backgroundColor: green[600]
                }}
              >
                <></>
              </Box>
            </Grid>
          </Tooltip>
          <Tooltip title="hot" placement="top">
            <Grid item xs={12} sm={6} md={6} lg={1}>
              <Box
                style={{
                  padding: '7px',
                  border: '1px',
                  borderRadius: '3px',
                  backgroundColor: green[800]
                }}
              >
                <></>
              </Box>
            </Grid>
          </Tooltip>
          {/* <Grid item xs={12} sm={2} mt={-0.4}>
            <Typography textAlign="left" fontWeight="600" color="secondary" component="span" fontSize="11px">RISE</Typography>
          </Grid> */}
        </Grid>
      </Grid>

      <Box role="presentation">
        <Breadcrumbs
          separator="|"
          aria-label="breadcrumb"
          sx={{
            '& ol': {
              justifyContent: 'center',
              fontSize: '12px',
              margin: '20px -20px -20px 0px',
              textDecoration: 'none'
            }
          }}
        >
          {Object.keys(dictionary).map((letter) => {
            return (
              <Button key={letter} onClick={(e) => handleChange(e, letter)} sx={ButtonItem}>
                <Typography variant="body2" color="black" sx={PeriodItem}>
                  {letter}
                </Typography>
              </Button>
            );
          })}
        </Breadcrumbs>
      </Box>
      <Box role="presentation">
        <Breadcrumbs
          separator="|"
          aria-label="breadcrumb"
          sx={{
            '& ol': {
              justifyContent: 'center',
              margin: '25px 0px 0px 0px',
              textDecoration: 'none'
            }
          }}
        >
          {/* <a style={{ textDecoration: 'none' }}
            href={`${companyListing.companyWebsite}`}
            target="_blank"
            rel="noopener noreferrer">
            <Typography
              fontSize="11px"
              color="secondary"
              sx={DomainItem}
            >
              {companyListing.companyName}
            </Typography>
          </a> */}
        </Breadcrumbs>
      </Box>
    </Card>
  );
};

export default PriceGrid;

const PeriodItem = {
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontWeight: '700',
  display: 'block',
  padding: 0,
  fontWeight: 500,
  minWidth: 'auto',
  height: 'min-content',
  backgroundColor: 'transparent',
  '&:hover': {
    color: '#c5c5c5'
  }
};

const DomainItem = {
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontWeight: '600',
  '&:hover': {
    color: '#000'
  }
};

const ButtonItem = {
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontWeight: '700',
  display: 'block',
  padding: 0,
  fontWeight: 500,
  minWidth: 'auto',
  height: 'min-content',
  backgroundColor: 'transparent',
  '&:hover': {
    color: '#c5c5c5',
    backgroundColor: 'transparent'
  }
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
