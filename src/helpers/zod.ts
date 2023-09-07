import { z } from 'zod'

// SAMPLE MEAL PLAN DATA
//{"days":
//      [{"day":"Monday","meals":{"breakfast":{"meal":"Oatmeal with fruits","calories":300},"lunch":{"meal":"Grilled chicken with mixed vegetables","calories":500},"dinner":{"meal":"Salmon with quinoa and roasted asparagus","calories":400}}},
//      {"day":"Tuesday","meals":{"breakfast":{"meal":"Vegetable omelette","calories":400},"lunch":{"meal":"Turkey wrap with salad","calories":450},"dinner":{"meal":"Baked cod with sweet potato and steamed broccoli","calories":350}}},
//      {"day":"Wednesday","meals":{"breakfast":{"meal":"Greek yogurt with granola and berries","calories":350},"lunch":{"meal":"Quinoa salad with grilled shrimp","calories":400},"dinner":{"meal":"Beef stir-fry with brown rice","calories":450}}},
//      {"day":"Thursday","meals":{"breakfast":{"meal":"Scrambled eggs with whole wheat toast","calories":300},"lunch":{"meal":"Grilled tofu with stir-fried vegetables","calories":400},"dinner":{"meal":"Baked chicken breast with quinoa and roasted Brussels sprouts","calories":450}}},
//      {"day":"Friday","meals":{"breakfast":{"meal":"Protein smoothie with spinach and almond milk","calories":350},"lunch":{"meal":"Salad with grilled salmon","calories":450},"dinner":{"meal":"Vegetable stir-fry with tofu and brown rice","calories":400}}},
//      {"day":"Saturday","meals":{"breakfast":{"meal":"Whole wheat toast with avocado and eggs","calories":350},"lunch":{"meal":"Chicken and vegetable wrap","calories":400},"dinner":{"meal":"Grilled shrimp with quinoa and steamed asparagus","calories":450}}},
//      {"day":"Sunday","meals":{"breakfast":{"meal":"Fruit smoothie with yogurt and almond milk","calories":300},"lunch":{"meal":"Grilled chicken Caesar salad","calories":450},"dinner":{"meal":"Baked salmon with roasted vegetables","calories":400}}}]}

export const mealPlanScheme = z.object({
  days: z.array(
    z.object({
      dayOfTheWeek: z.string(),
      meals: z.object({
        breakfast: z.object({
          meal: z.string(),
          calories: z.number(),
        }),
        lunch: z.object({
          meal: z.string(),
          calories: z.number(),
        }),
        dinner: z.object({
          meal: z.string(),
          calories: z.number(),
        }),
      }),
    })
  ),
})

// SAMPLE WORKOUT PLAN DATA
// {"days":
//    [{"day":"Monday","exercises":[{"name":"Push-ups","reps":12,"sets":3},{"name":"Squats","reps":12,"sets":3},{"name":"Plank","reps":30,"sets":3}]},
//    {"day":"Tuesday","exercises":[{"name":"Lunges","reps":12,"sets":3},{"name":"Bicep Curls","reps":12,"sets":3},{"name":"Russian Twists","reps":20,"sets":3}]},
//    {"day":"Wednesday","exercises":[{"name":"Deadlifts","reps":10,"sets":3},{"name":"Shoulder Press","reps":10,"sets":3},{"name":"Mountain Climbers","reps":30,"sets":3}]},
//    {"day":"Thursday","exercises":[{"name":"Tricep Dips","reps":12,"sets":3},{"name":"Step-ups","reps":12,"sets":3},{"name":"Leg Raises","reps":15,"sets":3}]},
//    {"day":"Friday","exercises":[{"name":"Chest Press","reps":12,"sets":3},{"name":"Squat Jumps","reps":12,"sets":3},{"name":"V-Ups","reps":15,"sets":3}]},
//    {"day":"Saturday","exercises":[{"name":"Seated Row","reps":10,"sets":3},{"name":"Hamstring Curls","reps":12,"sets":3},{"name":"Lateral Raises","reps":12,"sets":3}]},
//    {"day":"Sunday","exercises":[{"name":"Bench Press","reps":10,"sets":3},{"name":"Walking Lunges","reps":12,"sets":3},{"name":"Russian Twists","reps":20,"sets":3}]}]}

export const workoutPlanScheme = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      exercises: z.array(
        z.object({
          name: z.string(),
          reps: z.number(),
          sets: z.number(),
        })
      ),
    })
  ),
})
