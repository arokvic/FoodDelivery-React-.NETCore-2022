import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import reducer from "./reducer";
const AuthContext = createContext();

const initialState = {
  cart: [],
  total: 0,
  amount: 0,
};
const AuthProvider = ({ children }) => {
  const [chosenProducts, setChosenProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const addToCart = (id, price, name, ingredients) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, price, name, ingredients },
    });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        setChosenProducts,
        chosenProducts,
        //  cart,
        //  setCart,
        ...state,

        clearCart,
        addToCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
