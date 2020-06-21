//You can face an issue with checkout infos checkout this topic https://github.com/Sylius/ShopApiPlugin/issues/241
import axios from "axios";
const SYLIUS_URL = process.env.GATSBY_SYLIUS_URL;

export const submitCompleteCheckout = async (storeState, customerInfos) => {
  if (storeState.cartKey) {
    return await axios
      .put(`${SYLIUS_URL}/shop-api/checkout/${storeState.cartKey}/complete`, {
        email: customerInfos.email,
      })
      .catch((error) => {
        console.error("Error on cart creation ", error);
      });
  }
};
