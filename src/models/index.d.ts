import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SuggestedPlan = LazyLoading extends LazyLoadingDisabled ? EagerSuggestedPlan : LazySuggestedPlan

export declare const SuggestedPlan: (new (init: ModelInit<SuggestedPlan>) => SuggestedPlan) & {
  copyOf(source: SuggestedPlan, mutator: (draft: MutableModel<SuggestedPlan>) => MutableModel<SuggestedPlan> | void): SuggestedPlan;
}