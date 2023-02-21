import { getServerSideSitemap } from 'next-sitemap';
import Destination from '../../../../../models/destination/Destination';
import { childSitemapSize } from '../../../../config';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

const leading_zeros_format = (n, nPositions = 2) =>
  String(n).padStart(nPositions, '0');
export const getServerSideProps = async (ctx) => {
  const { child } = ctx.params;
  let fields = [];
  if (child) {
    if (/^[0-9]+.xml$/g.test(child)) {
      let page = Number(child.slice(0, child.indexOf('.xml')));
      console.log(page);
      for (let i = 0; i < childSitemapSize; i++) {
        fields.push({
          loc: `${siteUrl}sitemap/destination/${leading_zeros_format(
            page, 5
          )}/${leading_zeros_format(i, 5)}.xml`,
          lastmod: new Date().toISOString()
        });
      }
    } else {
      if (/^[0-9]{1,2}\/[0-9]+.xml$/g.test(child)) {
        console.log('sub-child');
      }
    }
  }
  // const destinations = await Destination.find()
  //   .limit(pageUrlSize)
  //   .skip(pageUrlSize * page);
  //   console.log("Destinations " +destinations)
  // const destinationUrls = destinations.map((destination) => ({
  //   loc: `${siteUrl}destination/${destination.destinationFromUrl.replace(" ","-")}-to-${destination.destinationToUrl.replace(" ","-")}`,
  //   lastmod: new Date().toISOString()
  // }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}

/*

add 50 parent sitemaps to robots.txt

app.com/destination/01.xml
...
app.com/destination/50.xml

***** ***** *****

add 50000 child sitemaps to each parent sitemap

app.com/destination/01/00001.xml
...
app.com/destination/01/50000.xml

***** ***** *****

add 50k dynamic urls to each child sitemap

app.com/destination/01/00001.xml
...
app.com/destination/dallas-to-london
app.com/destination/dallas-from-london
app.com/destination/london-to-dallas
app.com/destination/london-from-dallas

*/
