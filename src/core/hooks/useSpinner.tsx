import React from 'react'
import { spinnerActions } from '../redux/slice/spinnerSlice';
import { useAppDispatch } from './redux/useRedux'

const useSpinnerLoading = (isLoading: boolean) => {
  const dispatch = useAppDispatch();
  if(isLoading) {
    dispatch(spinnerActions.setLoadingOn());
  } else {
    dispatch(spinnerActions.setLoadingOff());
  }
}

export default useSpinnerLoading;