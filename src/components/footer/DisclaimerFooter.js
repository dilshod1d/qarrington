import React from 'react';
import Link from 'next/link';
import { Box, Breadcrumbs, Typography } from '@mui/material';

const Component = () => {

    return (

        <Box mt={8} mb={4}>

            <Box role="presentation">
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
                    <Link href="/users">
                        <Typography
                            variant="body2"
                            color="secondary"
                            sx={BreadcrumbItem}
                        >
                            Users
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
                    <Link href="/topics/terms">
                        <Typography
                            variant="body2"
                            color="secondary"
                            sx={BreadcrumbItem}
                        >
                            Terms
                        </Typography>
                    </Link>
                    <Link href="/topics/privacy">
                        <Typography
                            variant="body2"
                            color="secondary"
                            sx={BreadcrumbItem}
                        >
                            Privacy
                        </Typography>
                    </Link>
                </Breadcrumbs>
            </Box>

            <Box my={2}>
                <Typography textAlign="center" variant="body2" color="secondary">
                    Qarrington Limited and its affiliates do not endorse or recommend any subscriptions launched by any companies identified on, or linked through, this site. Please seek professional advice to evaluate specific subscriptions or other content on this site. All content (including any links to third-party sites) is provided for informational purposes only (and not for trading purposes), and is not intended to provide legal, accounting, tax, investment, financial, or other advice and should not be relied upon for such advice. The views, opinions, and advice of any third party reflect those of the individual authors and are not endorsed by Qarrington Limited or its affiliates. Qarrington Limited and its affiliates have not prepared, reviewed, or updated the content of third parties on this site or the content of any third-party sites, and assume no responsibility for such information.
                </Typography>
            </Box>

            <Box textAlign="center">
                <Typography variant="body2" color="secondary">
                    Qarrington, Inc. © 2023
                </Typography>
            </Box>

        </Box>

    )
}

export default Component

const BreadcrumbItem = {
    cursor: 'pointer',
    fontWeight: '600',
    '&:hover': {
        color: '#000'
    }
}