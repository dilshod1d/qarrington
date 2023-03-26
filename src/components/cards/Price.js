import { Grid } from '@mui/material';
import FooterMenu from '@components/menus/FooterMenu';
import PriceGrid from '@components/cards/PriceGrid';

const Component = ({ kpi, id }) => (
  <div style={{ position: 'sticky', top: '100px' }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PriceGrid kpi={kpi} id={id} />
        <FooterMenu />
      </Grid>
    </Grid>
  </div>
);


export default Component;