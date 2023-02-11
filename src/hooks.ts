import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import store from "./store";

export type TypedDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TypedDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
