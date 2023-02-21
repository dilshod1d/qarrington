import { getServerSideSitemap } from 'next-sitemap';
import Destination from '../../../../../models/destination/Destination';
import { childSitemapSize, pageUrlSize } from '../../../../config';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

const leading_zeros_format = (n, nPositions = 2) =>
  String(n).padStart(nPositions, '0');
export const getServerSideProps = async (ctx) => {
  const { child, subchild } = ctx.params;
  let fields = [];
  if (child && subchild) {
    if (/^[0-9]+$/g.test(child) && /^[0-9]+.xml$/g.test(subchild)) {
      let page = Number(child);
      let offset = Number(subchild.slice(0, subchild.indexOf('.xml')));

      let totalOffset =
        page * childSitemapSize * pageUrlSize + offset * pageUrlSize;
      const count = await Destination.count();
      let iterations = Math.ceil(pageUrlSize / (count * 4));

      const destA = await Destination.find()
        .select('destinationFromUrl')
        .limit(iterations)
        .skip(offset);
      const destinations = await Destination.distinct('destinationToUrl');

      let i = 0;
      destA.forEach((dA) => {
        destinations.forEach((destination) => {
          if (
            i >= pageUrlSize ||
            dA.destinationFromUrl === destination
          )
            return;
          fields.push({
            loc: `${siteUrl}destination/${dA.destinationFromUrl
              .replace(/\s+/g, '-')
              .toLowerCase()}-to-${destination
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')}`,
            lastmod: new Date().toISOString()
          });
          fields.push({
            loc: `${siteUrl}destination/${destination
              .replace(/\s+/g, '-')
              .toLowerCase()}-to-${dA.destinationFromUrl
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')}`,
            lastmod: new Date().toISOString()
          });
          fields.push({
            loc: `${siteUrl}destination/${dA.destinationFromUrl
              .replace(/\s+/g, '-')
              .toLowerCase()}-from-${destination
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')}`,
            lastmod: new Date().toISOString()
          });
          fields.push({
            loc: `${siteUrl}destination/${destination
              .replace(/\s+/g, '-')
              .toLowerCase()}-from-${dA.destinationFromUrl
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')}`,
            lastmod: new Date().toISOString()
          });
          i = +4;
        });
      });
      // const destinations = await Destination.find()
      // .select('destinationFromUrl destinationToUrl')
      // .limit(pageUrlSize)
      // .skip(totalOffset);

    }
  }
  // if (fields.length === 0) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/404'
  //     },
  //     props: {}
  //   };
  // }

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
