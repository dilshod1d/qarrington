import { green, grey, red } from '@mui/material/colors';

export const getVariantForBoxes = ({ companyPercentChange }) => {
  return green [
      companyPercentChange >= 0.05 
          ? "800" 
          : companyPercentChange >= 0 
            ? "600"
            : companyPercentChange >= -0.05
              ? "400"
              : "200"
    ]
}