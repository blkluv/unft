import { useEffect, useCallback } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useStateContext } from '../utils/context/StateContext';
import Layout from '../components/Layout';
import Helmet from "react-helmet";
import {
  Intro,
  Selection,
  Partners,
  HotBid,
  Categories,
  Discover,
  Description,
} from '../screens/Home';
import chooseBySlug from '../utils/chooseBySlug';
import { getDataByCategory, getAllDataByType } from '../lib/cosmic';

const Home = ({
  reviews,
  landing,
  categoriesGroup,
  categoryTypes,
  navigationItems,
}) => {
  const { categories, onCategoriesChange, setNavigation } = useStateContext();

  const handleContextAdd = useCallback(
    (category, data, navigation) => {
      onCategoriesChange({ groups: category, type: data });
      setNavigation(navigation);
    },
    [onCategoriesChange, setNavigation]
  );

  useEffect(() => {
    let isMounted = true;

    if (!categories['groups']?.length && isMounted) {
      handleContextAdd(
        categoriesGroup?.groups,
        categoriesGroup?.type,
        navigationItems[0]?.metadata
      );
    }

    return () => {
      isMounted = false;
    };
  }, [
    categories,
    categoriesGroup,
    categoryTypes,
    handleContextAdd,
    navigationItems,
  ]);

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <div id="getWaitlistContainer" data-waitlist_id="10645" data-widget_type="WIDGET_1"></div>
      <link rel="stylesheet" type="text/css" href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css"/>
      <script async src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></script>

      <Description info={chooseBySlug(landing, 'marketing')} />
      <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
      <Categories
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
      <Selection info={categoriesGroup['groups']} type={categoryTypes} />
      <Intro info={chooseBySlug(landing, 'introduction')} />
      <Partners info={reviews} />
      <Discover
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const reviews = (await getAllDataByType('reviews')) || [];
  const landing = (await getAllDataByType('landings')) || [];
  const categoryTypes = (await getAllDataByType('categories')) || [];
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id);
    })
  );
  const navigationItems = (await getAllDataByType('navigation')) || [];

  // Ensure data is defined before constructing the categoriesGroup object
  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] || null };
  });

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title };
  }, {});

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType };

  return {
    props: {
      reviews,
      landing,
      categoriesGroup,
      categoryTypes,
      navigationItems,
    },
  };
}
