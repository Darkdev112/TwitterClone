import type { RootState, AppDispatch } from "./store";
import type { TypedUseSelectorHook } from "react-redux/es/types";
import { useSelector, useDispatch } from "react-redux";

export const newDispatch : () => AppDispatch  = useDispatch;
export const newSelector : TypedUseSelectorHook<RootState> = useSelector;