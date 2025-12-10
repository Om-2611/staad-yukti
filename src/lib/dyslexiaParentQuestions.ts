// Dyslexia Parent Test Questions
// Structure similar to ADHD questions with options and scores

export interface DyslexiaOption {
  text: string;
  score: number;
}

export interface DyslexiaQuestion {
  id: string;
  text: string;
  options: DyslexiaOption[];
}

export interface DyslexiaCategory {
  questions: DyslexiaQuestion[];
}

// Language type
export type Language = 'en' | 'hi' | 'te';

// Cache for loaded translations
let hindiQuestions: Record<string, DyslexiaCategory> | null = null;
let teluguQuestions: Record<string, DyslexiaCategory> | null = null;

// Function to get Dyslexia Parent questions based on language
export const getDyslexiaParentQuestions = async (language: Language): Promise<Record<string, DyslexiaCategory>> => {
  if (language === 'hi') {
    if (!hindiQuestions) {
      // Dynamically import Hindi translations
      const hiModule = await import('@/locales/dyslexia_parent/hi.json');
      hindiQuestions = hiModule.default;
    }
    return hindiQuestions;
  } else if (language === 'te') {
    if (!teluguQuestions) {
      // Dynamically import Telugu translations
      const teModule = await import('@/locales/dyslexia_parent/te.json');
      teluguQuestions = teModule.default;
    }
    return teluguQuestions;
  }
  
  // Default to English
  return dyslexiaParentQuestions;
};

const dyslexiaParentQuestions: Record<string, DyslexiaCategory> = {
  basic: {
    questions: [
      {
        id: "BDS-1",
        text: "Does your child struggle to learn the alphabet or recognize letters?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-2",
        text: "Does your child have difficulty pronouncing words correctly (e.g., saying 'aminal' instead of 'animal')?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-3",
        text: "Does your child find it hard to remember nursery rhymes or simple songs?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-4",
        text: "Does your child have trouble learning and remembering new words?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-5",
        text: "Does your child struggle with reading aloud fluently?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-6",
        text: "Does your child frequently confuse letters such as 'b' and 'd' or 'p' and 'q'?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-7",
        text: "Does your child have difficulty spelling simple words?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-8",
        text: "Does your child take longer than peers to complete reading and writing tasks?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-9",
        text: "Does your child mix up letters or numbers when writing?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-10",
        text: "Does your child often write letters or numbers in reverse (e.g., 'E' instead of '3')?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-11",
        text: "Does your child have trouble remembering the sequence of the alphabet or days of the week?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-12",
        text: "Does your child struggle with distinguishing similar-sounding words?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-13",
        text: "Does your child avoid reading and writing whenever possible?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-14",
        text: "Does your child struggle with reading comprehension, especially long texts?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-15",
        text: "Does your child find it difficult to organize thoughts and write coherently?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-16",
        text: "Does your child experience difficulty learning new languages?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-17",
        text: "Does your child frequently misread words or skip lines when reading?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-18",
        text: "Does your child have trouble remembering phone numbers, addresses, or sequences of information?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "BDS-19",
        text: "Does your child struggle with left and right directions or reading maps?",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      }
    ]
  },
  comprehensive: {
    questions: [
      {
        id: "CDS-1",
        text: "Difficulty understanding when reading, particularly novels, magazines, newspapers, text-books, poetry.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-2",
        text: "Difficulty understanding when listening, particularly jokes, stories, discussions and lectures.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-3",
        text: "Difficulty interpreting and filling out forms.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-4",
        text: "Difficulty understanding abstract ideas.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-5",
        text: "Difficulty remembering information from listening, e.g. taking messages in a phone conversation.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-6",
        text: "Difficulty remembering information from reading, e.g. simple facts, names, dates, times, places, etc.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-7",
        text: "Difficulty remembering names of people, places, items, and times of events.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-8",
        text: "Meaning is sometimes vague when speaking.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-9",
        text: "Difficulty summarising or making a point, i.e. tends to go round the subject.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-10",
        text: "Struggles when describing and explaining things in detail, e.g. stories or events.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-11",
        text: "Poor writing skills, e.g. inappropriate word choice, poor sentence construction, grammar, spelling, and punctuation.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-12",
        text: "Lacks spontaneity to questions and requests.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-13",
        text: "Difficulty learning other languages.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-14",
        text: "Slow with mathematical calculations or difficulty understanding mathematical ideas.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-15",
        text: "Short concentration span on tasks.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-16",
        text: "Can concentrate only on one thing at a time.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-17",
        text: "Daydreams.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-18",
        text: "Poor natural awareness of surroundings.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-19",
        text: "Has poor general knowledge.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-20",
        text: "Consistently low academic grades in some subjects.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-21",
        text: "Overall, finds academic learning difficult.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-22",
        text: "Is disorganized and messy.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-23",
        text: "Difficulty planning, particularly when implementing an idea.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-24",
        text: "Difficulty ordering and sequencing.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-25",
        text: "Difficulty following instructions.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-26",
        text: "Is slow to complete routine tasks, e.g. dressing, showering, cleaning etc.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-27",
        text: "Struggles to be on time and is frequently late.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-28",
        text: "Is clumsy.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-29",
        text: "Often loses or misplaces items.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-30",
        text: "Exhibits laziness and slow at beginning tasks.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-31",
        text: "Periods of lacking confidence and low self-esteem.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-32",
        text: "Lacks initiative and relies on others for motivation.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-33",
        text: "Dislikes reading and/or rarely reads novels, magazines, or journals.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-34",
        text: "Possesses a particular interest in non-academic areas such as arts, crafts, music, photography.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-35",
        text: "Has occasional behavioural problems, e.g. loses temper, disruptive.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-36",
        text: "Is sensitive to background noise, e.g. holding a conversation against background sounds.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-37",
        text: "Has a poor sense of direction, i.e., finds it difficult to get around in a strange place.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      },
      {
        id: "CDS-38",
        text: "Is slow to learn sports or follow drill instructions, including dance steps.",
        options: [
          { text: "no", score: 0 },
          { text: "not often", score: 0 },
          { text: "sometimes", score: 1 },
          { text: "often", score: 1 },
          { text: "yes", score: 1 }
        ]
      }
    ]
  }
};

export default dyslexiaParentQuestions;
