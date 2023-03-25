import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Breadcrumbs, Button, Card, Container, Divider, Grid, Stack, styled, TextField, Tooltip, Typography } from '@mui/material';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import KeyboardCommandKeyTwoToneIcon from '@mui/icons-material/KeyboardCommandKeyTwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';

const Component = () => {
  return (
    <div style={{ position: 'sticky', top: '100px' }}>
      {/* RightGrid Starts Here */}

      <Box mt={1.5} mb={4}>
        <Typography variant="body" fontWeight={500} color="secondary">
          If you think this topic is not helpful enough and you would like to talk to one of our account managers, you can always email us using the below form and we'd try to reply within 12hrs.
        </Typography>
      </Box>
      <Box>
        <form noValidate autoComplete="on">
          <Card style={{ padding: '100px', marginBottom: '20px' }}>
            <Stack spacing={1.2} sx={{ width: '100%' }}>
              <Tooltip title="In order to submit this form, you have to be logged in. Otherwise, you would be prompted to log in to your account." placement="top">
                <TextField
                  inputProps={{ style: { textAlign: 'center' } }}
                  rows={3}
                  maxRows={3}
                  multiline
                  placeholder="what can we help you with?"
                />
              </Tooltip>
              <Button
                size="large"
                sx={{ color: 'white', py: 2, textTransform: 'uppercase', fontSize: '13px' }}
                variant="contained"
                fullWidth={true}
                type="submit"
              >
                submit
              </Button>
            </Stack>
          </Card>
          <Box textAlign="center">
            <Typography variant="body2" mt={3} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
              By clicking on the "Submit" button or otherwise submitting the form above, I acknowledge that I have read and that I do hereby agree with the Service Terms and Privacy Policies of using the Qarrington website.
            </Typography>
          </Box>
        </form>


      </Box>
      {/* footer starts */}

      <Grid mt={3}>

        <Box textAlign="center">
          <Typography variant="body2" mt={1} component="div" color="secondary" padding="0px 20px 0px 20px" gutterBottom>
            Qarrington Limited and its affiliates do not endorse or recommend any subscriptions launched by any companies identified on, or linked through, this website. Please seek professional advice to evaluate specific subscriptions or other content on this website. All content (including any links to third-party websites) is provided for informational purposes only (and not for trading purposes), and is not intended to provide legal, accounting, tax, investment, financial, or other advice and should not be relied upon for such advice. The views, opinions, and advice of any third party reflect those of the individual authors and are not endorsed by Qarrington Limited or its affiliates. Qarrington Limited and its affiliates have not prepared, reviewed, or updated the content of third parties on this website or the content of any third-party websites, and assume no responsibility for such information.
          </Typography>
        </Box>

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
            <Link href="/about">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                About
              </Typography>
            </Link>
            <Link href="/challenges">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Challenges
              </Typography>
            </Link>
            <Link href="/products">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Products
              </Typography>
            </Link>
            <Link href="/comparisons">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Comparisons
              </Typography>
            </Link>
            <Link href="/topics">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Topics
              </Typography>
            </Link>
            <Link href="/help">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Help
              </Typography>
            </Link>
            <Link href="/users">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Users
              </Typography>
            </Link>
            <Link href="/resources">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Resources
              </Typography>
            </Link>
            <Link href="/stocks">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Stocks
              </Typography>
            </Link>
            <Link href="/cryptos">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Cryptos
              </Typography>
            </Link>
            <Link href="/topics/terms">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Terms
              </Typography>
            </Link>
            <Link href="/topics/policies">
              <Typography
                variant="body2"
                color="secondary"
                sx={BreadcrumbItem}
              >
                Policies
              </Typography>
            </Link>
          </Breadcrumbs>
        </Box>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <Typography variant="body2" color="secondary">Qarrington, Inc. © 2023</Typography>
        </Box>

      </Grid>
    </div>
  );
};

export default Component;

const IconButtonWrapper = styled(Box)(
  ({ theme }) => `
            padding-left: ${theme.spacing(0.8)};
            padding-right: ${theme.spacing(0.8)};
            cursor: pointer;
    `
);

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

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