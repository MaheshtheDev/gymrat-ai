import {InputValueResult, ValidationResult} from './interface';

export type ValidationRule = (value: string) => ValidationResult;

export type RunValidations = () => InputValueResult;

export type GetCheckBoxState = () => boolean;

export type SetString = (value: string) => void;

export type OnClick = () => void;

export type SetValue = (index: number) => void;

export type OnStateChange = (state: boolean) => void;
