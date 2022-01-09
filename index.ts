const fs = require('fs');
import { z } from 'zod';

const ResultSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      job: z.string(),
    })
  ),
});

// extract the inferred type
type Result = z.infer<typeof ResultSchema>;

const printJobs = (results: Result) => {
  if (ResultSchema.safeParse(results).success) {
    results?.results?.forEach(({ job }) => {
      console.log(job);
    });
  } else {
    console.log('Bad data');
  }
};

// printJobs({
//   results: [
//     {
//       id: 1,
//       name: 'John',
//       job: 'developer',
//     },
//   ],
// });

const data: Result = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
printJobs(data);
