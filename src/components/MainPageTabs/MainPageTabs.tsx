import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CatalogueTab from '../CatalogueTab/CatalogueTab';

// Ваши компоненты для каждого таба
const TabContentOne = () => (
  <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
    <CatalogueTab />
  </div>
);
const TabContentTwo = () => <div>Content for Tab Two</div>;
const TabContentThree = () => <div>Content for Tab Three</div>;

const MainPageTabs = () => {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="main-page-tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Каталог" value="1" />
            <Tab label="Мои подписки" value="2" />
            <Tab label="Избранное" value="3" />
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
