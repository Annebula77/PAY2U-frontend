import { useEffect } from "react";
import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styled from "styled-components";
import Slider from "../slider/Slider";
import CatalogueShield from "../catalogueShield/CatalogShield";
import { fetchCategoryList } from "../../store/slices/categoriesSlice";
import { fetchSubscriptions } from "../../store/slices/allSubscriptionsSlice";


const StyledTabSection = styled.div`
 box-sizing: border-box;
 width: 100%;
 margin: 0;
 padding: 20px 0 99px;
 display: flex;
 flex-direction: column; 
 gap: 12px;
`;

const CatalogueTab = () => {
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector(state => state.categories);
  const { data: subscriptions } = useAppSelector(state => state.allSubscriptions);

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchSubscriptions({}));
  }, [dispatch]);

  return (
    <StyledTabSection>
      {categories.map((category) => (
        <Paper key={category.id} sx={{ maxWidth: '100%', padding: '20px 8px 20px', boxSizing: 'border-box' }}>
          <Slider
            slides={subscriptions.filter(sub => sub.category.id === category.id).map((subscription) => (
              <CatalogueShield
                key={subscription.id}
                img={subscription.image_preview}
                price={subscription.tariffs[0]?.amount || 0}
                cashback={`${subscription.cashback.amount}`}
                route={`/subscriptions/${subscription.id}`}
                name={subscription.name}
              />
            ))}
            title={category.name}
            slidePerView="2.5"
            showNextButton
            spaceBetween="90"
          />
        </Paper>
      ))}
    </StyledTabSection>

  );
};


export default CatalogueTab;