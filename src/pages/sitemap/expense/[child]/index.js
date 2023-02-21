import { getServerSideSitemap } from 'next-sitemap';
import { expenses_childSitemapSize } from '../../../../config';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

const leading_zeros_format = (n, nPositions = 2) =>
  String(n).padStart(nPositions, '0');
export const getServerSideProps = async (ctx) => {
  const { child } = ctx.params;
  let fields = [];
  if (child) {
    if (/^[0-9]+.xml$/g.test(child)) {
      let page = Number(child.slice(0, child.indexOf('.xml')));
      for (let i = 0; i < expenses_childSitemapSize; i++) {
        fields.push({
          loc: `${siteUrl}sitemap/expense/${leading_zeros_format(
            page, 5
          )}/${leading_zeros_format(i,5)}.xml`,
          lastmod: new Date().toISOString()
        });
      }
    }
  }

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}

/*

add 10 parent sitemaps to robots.txt

app.com/expenses/01.xml
...
app.com/expenses/10.xml

***** ***** *****

add 70 child sitemaps to each parent sitemap

app.com/expenses/01/01.xml
...
app.com/expenses/01/70.xml

***** ***** *****

add 50k dynamic urls to each child sitemap

app.com/expenses/01/01.xml
...
app.com/expense/flight > example of expenseId route
app.com/expense/flight/dallas > example of locationId route
app.com/expense/vacation
app.com/expense/vacation/toronto

*/
