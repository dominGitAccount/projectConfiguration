import {
  useSelector as useReduxSelector,
  useDispatch,
  createSelectorHook,
} from "react-redux";
import { RootState, AppDispatch } from "../index";

// @ts-ignore
export const useAppSelector = createSelectorHook<RootState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();