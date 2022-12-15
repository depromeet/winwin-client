import useGetCategory from '@/hooks/useGetCategory';

import TabList from '../common/TabList';

const TalentRegisterCategoryTabList = () => {
  const { isLoading, data } = useGetCategory({ sort: 'main' });

  return <>{!isLoading && <TabList categoryKey="mainCategory" list={data.data} />}</>;
};

export default TalentRegisterCategoryTabList;
