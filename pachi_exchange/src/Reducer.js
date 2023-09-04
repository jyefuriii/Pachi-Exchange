export const initialState = {
  cashAmount: JSON.parse(localStorage.getItem("cashout_data")) || "",
  product: JSON.parse(localStorage.getItem("product_items")) || [],
  redeemItem: JSON.parse(localStorage.getItem("redeem_items")) || [],
  user: null,
};

//Selector
//export const getProductTotal = (product) =>
//product?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_PRODUCT":
      const productItem = [...state.product, action.item];
      // write to localStorage <-- key part
      if (typeof window !== "undefined") {
        localStorage.setItem("product_items", JSON.stringify(productItem));
      }
      return {
        ...state,
        product: [...state.product, action.item],
      };
    case "REDEEM_PRODUCT":
      const redeemItem = [...state.redeemItem, action.item];
      // write to localStorage <-- key part
      if (typeof window !== "undefined") {
        localStorage.setItem("redeem_items", JSON.stringify(redeemItem));
      }
      return {
        ...state,
        redeemItem: [...state.redeemItem, action.item],
      };

    case "EMPTY_PRODUCT":
      return {
        ...state,
        product: [],
      };

    case "SET USER":
      return {
        ...state,
        user: action.user,
      };
    case "CASHOUT":
      const cashoutItem = [...state.cashAmount, action.cashout];
      // write to localStorage <-- key part
      if (typeof window !== "undefined") {
        localStorage.setItem("cashout_data", JSON.stringify(cashoutItem));
      }
      return {
        ...state,
        cashAmount: [...state.cashAmount, action.cashout],
      };

    default:
      return state;
  }
};

export default reducer;
