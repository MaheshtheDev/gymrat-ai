// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserProfile, SuggestedPlan } = initSchema(schema);

export {
  UserProfile,
  SuggestedPlan
};