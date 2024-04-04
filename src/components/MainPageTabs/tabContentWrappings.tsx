import CatalogueTab from '../CatalogueTab/CatalogueTab';
import FavoritesTab from '../FavoritesTab/FavoritesTab';
import ClientSubscriptionsTab from '../ClientSubscriptionsTab/ClientSubscriptionsTab';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

const TabWrapper = styled.div`
${resetBox()};
`;

const TabWrapperWithMargin = styled.div`
margin: 0 0 0 -10px;
padding: 0;
box-sizing: border-box;
`;

export const TabContentOne = () => (
  <TabWrapper>
    <CatalogueTab />
  </TabWrapper>
)

export const TabContentThree = () => (
  <TabWrapperWithMargin>
    <FavoritesTab />
  </TabWrapperWithMargin>
);

export const TabContentTwo = () => (
  <TabWrapperWithMargin>
    <ClientSubscriptionsTab />
  </TabWrapperWithMargin>
);