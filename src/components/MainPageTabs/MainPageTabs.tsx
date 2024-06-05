import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  TabContentOne,
  TabContentThree,
  TabContentTwo,
} from './tabContentWrappings';
import { setActiveTab } from '../../store/slices/activeTabSlice';

const MainPageTabs = () => {
  const dispatch = useAppDispatch();

  const activeTab = useAppSelector(state => state.tabs.activeTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    dispatch(setActiveTab(newValue));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={activeTab}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="main-page-tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab disableRipple label="Каталог" value="1" />
            <Tab disableRipple label="Мои подписки" value="2" />
            <Tab disableRipple label="Избранное" value="3" />
          </TabList>
        </Box>
        <TabPanel
          sx={{ margin: 0, padding: 0, boxSizing: 'border-box' }}
          value="1"
        >
          <TabContentOne />
        </TabPanel>
        <TabPanel value="2">
          <TabContentTwo />
        </TabPanel>
        <TabPanel value="3">
          <TabContentThree />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default MainPageTabs;
