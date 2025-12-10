export interface Option { text: string; score: number }

export interface SubSectionQuestion {
  id: string;
  text: string;
  options: Option[];
}

export interface ADHDSubcategory {
  behavioralQuestions: SubSectionQuestion[];
  performanceQuestions: SubSectionQuestion[];
}

// Language type
export type Language = 'en' | 'hi' | 'te';

// Cache for loaded translations
let teluguQuestions: Record<string, ADHDSubcategory> | null = null;
let hindiQuestions: Record<string, ADHDSubcategory> | null = null;

// Function to get ADHD questions based on language
export const getADHDQuestions = async (language: Language): Promise<Record<string, ADHDSubcategory>> => {
  if (language === 'te') {
    if (!teluguQuestions) {
      // Dynamically import Telugu translations
      const teModule = await import('@/locales/adhd/te.json');
      teluguQuestions = teModule.default;
    }
    return teluguQuestions;
  }
  
  if (language === 'hi') {
    if (!hindiQuestions) {
      // Dynamically import Hindi translations
      const hiModule = await import('@/locales/adhd/hi.json');
      hindiQuestions = hiModule.default;
    }
    return hindiQuestions;
  }
  
  // Default to English
  return adhdQuestions;
};

export const adhdQuestions: Record<string, ADHDSubcategory> = {
  inattentive: {
    behavioralQuestions: [
      { id: 'PI-1', text: "Does the child often fail to give close attention to details or makes careless mistakes in schoolwork?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-2', text: "Does the child have difficulty sustaining attention in tasks or play activities?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-3', text: "Does the child not seem to listen when spoken to directly?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-4', text: "Does the child not follow through on instructions and fails to finish schoolwork (not due to oppositional behavior or failure to understand)?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-5', text: "Does the child have difficulty organizing tasks and activities?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-6', text: "Does the child avoid, dislike, or is reluctant to engage in tasks that require sustained mental effort?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-7', text: "Does the child lose things necessary for tasks or activities (school assignments, pencils, or books)?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-8', text: "Is the child easily distracted by extraneous stimuli?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PI-9', text: "Is the child forgetful in daily activities?", options: [ { text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] }
    ],
    performanceQuestions: [
      { id: 'PI-Perf-1', text: 'Performance in Reading', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-2', text: 'Performance in Math', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-3', text: 'Performance in Written Expression', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-4', text: 'Relationship with Peers', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-5', text: 'Following Instructions/Rules', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-6', text: 'Disrupting Class', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-7', text: 'Completing Assignments', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PI-Perf-8', text: 'Organizational Skills', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] }
    ]
  },
  hyperactive: {
    behavioralQuestions: [
      { id: 'PH-1', text: 'Fidgets with hands or feet or squirms in seat', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-2', text: 'Leaves seat in situations when remaining seated is expected', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-3', text: 'Runs about or climbs excessively in situations when it is inappropriate', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-4', text: 'Has difficulty playing or engaging in leisure activities quietly', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-5', text: "Is often 'on the go' or acts as if 'driven by a motor'", options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-6', text: 'Talks excessively', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-7', text: 'Blurts out answers before questions have been completed', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-8', text: 'Has difficulty awaiting turn', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'PH-9', text: 'Interrupts or intrudes on others (e.g., butts into conversations or games)', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] }
    ],
    performanceQuestions: [
      { id: 'PH-Perf-1', text: 'Performance in Reading', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-2', text: 'Performance in Math', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-3', text: 'Performance in Written Expression', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-4', text: 'Relationship with Peers', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-5', text: 'Following Instructions/Rules', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-6', text: 'Disrupting Class', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-7', text: 'Completing Assignments', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'PH-Perf-8', text: 'Organizational Skills', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] }
    ]
  },
  oppositional: {
    behavioralQuestions: [
      { id: 'ODD-1', text: 'Argues with adults', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-2', text: 'Loses temper', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-3', text: "Actively defies or refuses to comply with adults' requests or rules", options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-4', text: 'Deliberately annoys people', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-5', text: 'Blames others for his or her mistakes or misbehavior', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-6', text: 'Is touchy or easily annoyed by others', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-7', text: 'Is angry and resentful', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'ODD-8', text: 'Is spiteful and vindictive', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] }
    ],
    performanceQuestions: [
      { id: 'ODD-Perf-1', text: 'Performance in Reading', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-2', text: 'Performance in Math', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-3', text: 'Performance in Written Expression', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-4', text: 'Relationship with Peers', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-5', text: 'Following Instructions/Rules', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-6', text: 'Disrupting Class', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-7', text: 'Completing Assignments', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'ODD-Perf-8', text: 'Organizational Skills', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] }
    ]
  },
  conduct: {
    behavioralQuestions: [
      { id: 'CD-1', text: 'Bullies, threatens, or intimidates others', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-2', text: 'Initiates physical fights', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-3', text: "Lies to obtain goods or favors or to avoid obligations (cons others)", options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-4', text: 'Is truant from school (skips school) without permission', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-5', text: 'Is physically cruel to people', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-6', text: 'Has stolen items of nontrivial value', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-7', text: "Deliberately destroys others' property", options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-8', text: 'Has used a weapon that can cause serious harm (bat, knife, brick, gun)', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-9', text: 'Is physically cruel to animals', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-10', text: 'Has deliberately set fire to cause damage', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-11', text: "Has broken into someone else's house, business, or car", options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-12', text: 'Stays out at night without permission', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-13', text: 'Has run away from home overnight', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'CD-14', text: 'Has forced someone into sexual activity', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] }
    ],
    performanceQuestions: [
      { id: 'CD-Perf-1', text: 'Performance in Reading', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-2', text: 'Performance in Math', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-3', text: 'Performance in Written Expression', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-4', text: 'Relationship with Peers', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-5', text: 'Following Instructions/Rules', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-6', text: 'Disrupting Class', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-7', text: 'Completing Assignments', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'CD-Perf-8', text: 'Organizational Skills', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] }
    ]
  },
  anxiety: {
    behavioralQuestions: [
      { id: 'AD-1', text: 'Is fearful, anxious, or worried', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'AD-2', text: 'Is afraid to try new things for fear of making mistakes', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'AD-3', text: 'Feels worthless or inferior', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'AD-4', text: 'Blames self for problems, feels guilty', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'AD-5', text: "Feels lonely, unwanted, or unloved; complains that 'no one loves him/her'", options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'AD-6', text: 'Is sad, unhappy, or depressed', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] },
      { id: 'AD-7', text: 'Is self-conscious or easily embarrassed', options: [ { text: 'Never', score: 0 }, { text: 'Sometimes', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 } ] }
    ],
    performanceQuestions: [
      { id: 'AD-Perf-1', text: 'Performance in Reading', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-2', text: 'Performance in Math', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-3', text: 'Performance in Written Expression', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-4', text: 'Relationship with Peers', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-5', text: 'Following Instructions/Rules', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-6', text: 'Disrupting Class', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-7', text: 'Completing Assignments', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] },
      { id: 'AD-Perf-8', text: 'Organizational Skills', options: [ { text: '1- Very Problematic', score: 1 }, { text: '2- Problematic', score: 1 }, { text: '3- Below Average', score: 0 }, { text: '4- Average', score: 0 }, { text: '5- Good', score: 0 } ] }
    ]
  }
};

export default adhdQuestions;
