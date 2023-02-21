import { getServerSideSitemap } from 'next-sitemap';
import Expense from '../../../../../models/expense/Expense';
import Location from '../../../../../models/location/Location';
import {
  expenses_childSitemapSize,
  expenses_pageUrlSize
} from '../../../../config';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

export const getServerSideProps = async (ctx) => {
  const { child, subchild } = ctx.params;
  let fields = [];
  if (child && subchild) {
    if (/^[0-9]+$/g.test(child) && /^[0-9]+.xml$/g.test(subchild)) {
      let expCount = await Expense.count();
      let locCount = await Location.count();
      const totalRoutes = expCount * locCount;
      const nbrLocPages = Math.ceil(locCount / expenses_pageUrlSize);

      // Extract route params
      let pageParam = Number(child);
      let offsetParam = Number(subchild.slice(0, subchild.indexOf('.xml')));

      // let totalOffset =
      //   offsetParam * expenses_pageUrlSize +
      //   pageParam * expenses_childSitemapSize * expenses_pageUrlSize;
      let totalOffset =
        offsetParam * locCount +
        pageParam * expenses_childSitemapSize * locCount;

      // let pageOffset = Math.floor(totalOffset / nbrLocPages);
      let pageOffset = Math.floor(pageParam);

      // Get the expenses
      const expenses = await Expense.find()
        .select({ expenseUrl: 1 })
        .limit(1)
        .skip(pageOffset);
      // Get the locations
      const locations = await Location.find()
        .select({ locationUrl: 1 })
        .limit(expenses_pageUrlSize)
        .skip(offsetParam);
      expenses.forEach((expense) => {
        // Add the expense alone
        fields.push({
          loc: `${siteUrl}expense/${expense.expenseUrl
            .replace(/\s+/g, '-')
            .toLowerCase()}`,
          lastmod: new Date().toISOString()
        });
        // Add all the locations to that specific expense
        locations.forEach((location) => {
          fields.push({
            loc: `${siteUrl}expense/${expense.expenseUrl
              .replace(/\s+/g, '-')
              .toLowerCase()}/${location.locationUrl
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace(/&(?!#?[a-z0-9]+;)/, '&amp;')}`,
            lastmod: new Date().toISOString()
          });
        });
      });
    }
  }
  if (fields.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      },
      props: {}
    };
  }

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
