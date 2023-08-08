import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "../store";
import { TCompany, TUpdateCompany } from "../../types";
import { addCompanyApi, getCompaniesApi, updateCompanyApi } from "../../utils/api";

interface companyState {
  companies: Array<TCompany>;
  isError: boolean;
  isLoadingCompany: boolean;
}

const initialState: companyState = {
  companies: [],
  isError: false,
  isLoadingCompany: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<Array<TCompany>>) {
      state.companies = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingCompany = action.payload;
    },
  },
});

export const { setCompanies, setError, setLoading } = companySlice.actions;

export const getCompanies: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getCompaniesApi()
    .then((res) => {
      dispatch(setError(false));
      dispatch(setCompanies(res));
    })
    .catch((err) => {
      dispatch(setError(true));
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const addCompany: AppThunk =
  (
    nameCompany: string,
    name: string,
    numberPhone: string,
    INN: string,
    email?: string
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    addCompanyApi(nameCompany, name, numberPhone, INN, email)
      .then((res) => {
        dispatch(setError(false));
        dispatch(getCompanies());
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };


  export const updateCompany: AppThunk =
  (
    company: TUpdateCompany
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    updateCompanyApi(company.id, company.nameCompany, company.name, company.numberPhone, company.INN, company.email)
      .then((res) => {
        dispatch(setError(false));
        dispatch(getCompanies());
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
