/*
 index.ts
 Project: exercise-1
 Author: Trishna Niraula
 Created on: Jan 20, 2023
*/

// function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
//   const mergedArray = [];
//   let i = 0;
//   let j = 0;

//   while (i < arr1.length && j < arr2.length) {
//     mergedArray.push(arr1[i]);
//     mergedArray.push(arr2[j]);
//     i += 1;
//     j += 1;
//   }

//   while (i < arr1.length) {
//     mergedArray.push(arr1[i]);
//     i += 1;
//   }

//   while (j < arr2.length) {
//     mergedArray.push(arr2[j]);
//     j += 1;
//   }
//
//   return mergedArray;
// }
// Part-1
// const firstArray = [4, 5, 23, 18, 9, -5];
// const secondArray = [18, 74, 88, 3, 7, 44];
// const mergedArray = merge(firstArray, secondArray);
// console.log(mergedArray);

// Part-2
// const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
// const array2: Array<number> = [18, 74, 88, 3];

// const mergedArray: Array<number> = merge(array1, array2);
// console.log(mergedArray);

// const array1: Array<number> = [18, 74, 88, 3];
// const array2: Array<number> = [4, 5, 23, 18, 9, -5, 31];

// const mergedArray: Array<number> = merge(array1, array2);
// console.log(mergedArray);

// function checkWord(attemptedWord: string, secretWord: string): string {
//   let result = '';
//   for (let i = 0; i < attemptedWord.length; i += 1) {
//     if (attemptedWord[i] === secretWord[i]) {
//       result += 'c';
//     } else if (secretWord.includes(attemptedWord[i])) {
//       result += 'p';
//     } else {
//       result += 'a';
//     }
//   }
//   return result;
// }

// const attempts = ['rains', 'shout', 'scope', 'spoke'];
// for (const word of attempts) {
//   const result = checkWord(word, 'spoke');
//   console.log(result);
// }

// Elections
// Part 1, structuring the data

type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

const candidates: Array<Candidate> = [
  {
    name: 'Edward Underwood',
    votes: [192, 147, 186, 114, 267],
    funding: 58182890,
  },
  {
    name: 'Rose Olson',
    votes: [48, 90, 12, 21, 13],
    funding: 78889263,
  },
  {
    name: 'Leonard Willis',
    votes: [206, 312, 121, 408, 382],
    funding: 36070689,
  },
  {
    name: 'Nathaniel Taylor',
    votes: [37, 21, 38, 39, 29],
    funding: 6317921937,
  },
];
let totalVotes = 0;
for (let i = 0; i < candidates.length; i += 1) {
  totalVotes += candidates[i].votes.reduce((a, b) => a + b);
}

for (let i = 0; i < candidates.length; i += 1) {
  const candidate = candidates[i];
  const totalCandidateVotes = candidate.votes.reduce((a, b) => a + b);
  const percentOfTotalVotes = ((totalCandidateVotes / totalVotes) * 100).toFixed(2);
  console.log(`${candidate.name} -- ${totalCandidateVotes} votes -- ${percentOfTotalVotes}%`);
}

for (let i = 0; i < candidates.length; i += 1) {
  const candidate = candidates[i];
  console.log(`${candidate.name} :`);
  for (let j = 0; j < candidate.votes.length; j += 1) {
    const precinctVotes = candidate.votes[j];
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const precinctTotalVotes = candidates.reduce((acc, candidate) => acc + candidate.votes[j], 0);
    const precinctPercentage = ((precinctVotes / precinctTotalVotes) * 100).toFixed(2);
    console.log(` Precinct ${j + 1} -- ${precinctPercentage}%`);
  }
}

for (const candidate of candidates) {
  const spentPerVote = candidate.funding / candidate.votes.reduce((a, b) => a + b);
  console.log(`${candidate.name} spent $${spentPerVote.toFixed(2)} per vote`);
}

// who won?
let winner: Candidate | undefined;
let runOffCandidate1: Candidate | undefined;
let runOffCandidate2: Candidate | undefined;
let maxVotes = 0;

for (let i = 0; i < candidates.length; i += 1) {
  const candidate = candidates[i];
  const totalCandidateVotes = candidate.votes.reduce((a, b) => a + b);
  const percentOfTotalVotes = (totalCandidateVotes / totalVotes) * 100;
  if (percentOfTotalVotes > 50) {
    winner = candidate;
    break;
  }
  if (totalCandidateVotes > maxVotes) {
    maxVotes = totalCandidateVotes;
    runOffCandidate1 = candidate;
  }
}

if (winner) {
  console.log(
    `${winner.name} won the election with ${winner.votes.reduce(
      (a, b) => a + b
    )} votes, which is ${((winner.votes.reduce((a, b) => a + b) / totalVotes) * 100).toFixed(
      2
    )}% of the total votes cast`
  );
} else {
  maxVotes = 0;
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    if (candidate !== runOffCandidate1 && candidate.votes.reduce((a, b) => a + b) > maxVotes) {
      maxVotes = candidate.votes.reduce((a, b) => a + b);
      runOffCandidate2 = candidate;
    }
  }
  console.log(
    `The election has resulted in a run-off between ${runOffCandidate1.name} and ${runOffCandidate2.name}`
  );
}
