import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly weight: number;
  readonly height: number;
  readonly gender: number;
  readonly goal: number;
  readonly age: number;
  readonly bmiValue: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly weight: number;
  readonly height: number;
  readonly gender: number;
  readonly goal: number;
  readonly age: number;
  readonly bmiValue: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProfile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfile : LazyUserProfile

export declare const UserProfile: (new (init: ModelInit<UserProfile>) => UserProfile) & {
  copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
}

type EagerSuggestedPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SuggestedPlan, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly weight?: number | null;
  readonly height?: number | null;
  readonly gender?: number | null;
  readonly goal?: number | null;
  readonly age?: number | null;
  readonly bmiValue: number;
  readonly mealPlan?: string | null;
  readonly workoutPlan?: string | null;
  readonly isDefaultPlan?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySuggestedPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SuggestedPlan, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly weight?: number | null;
  readonly height?: number | null;
  readonly gender?: number | null;
  readonly goal?: number | null;
  readonly age?: number | null;
  readonly bmiValue: number;
  readonly mealPlan?: string | null;
  readonly workoutPlan?: string | null;
  readonly isDefaultPlan?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SuggestedPlan = LazyLoading extends LazyLoadingDisabled ? EagerSuggestedPlan : LazySuggestedPlan

export declare const SuggestedPlan: (new (init: ModelInit<SuggestedPlan>) => SuggestedPlan) & {
  copyOf(source: SuggestedPlan, mutator: (draft: MutableModel<SuggestedPlan>) => MutableModel<SuggestedPlan> | void): SuggestedPlan;
}