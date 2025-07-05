// Nigerian Curriculum Data Structure
export const nigerianCurriculum = {
  nursery1: {
    name: "Nursery 1",
    age: "3-4 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "n1_eng_phonics",
            title: "Phonics - Letter Sounds",
            description: "Learn the sounds of letters A-Z",
            content: "Let's learn the sounds of letters! A says 'ah', B says 'buh', C says 'kuh'...",
            exercises: [
              "Practice saying letter sounds",
              "Match letters to sounds",
              "Identify beginning sounds"
            ],
            difficulty: "beginner"
          },
          {
            id: "n1_eng_vocabulary",
            title: "Basic Vocabulary",
            description: "Learn everyday words and objects",
            content: "Let's learn words for things around us: house, car, book, ball...",
            exercises: [
              "Name objects in pictures",
              "Learn family words",
              "Practice animal names"
            ],
            difficulty: "beginner"
          },
          {
            id: "n1_eng_colors",
            title: "Colors and Shapes",
            description: "Learn colors and basic shapes",
            content: "Red, blue, yellow, green! Circle, square, triangle, rectangle!",
            exercises: [
              "Identify colors",
              "Name shapes",
              "Color matching games"
            ],
            difficulty: "beginner"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "n1_math_counting",
            title: "Counting 1-10",
            description: "Learn to count from 1 to 10",
            content: "One, two, three, four, five! Let's count together!",
            exercises: [
              "Count objects",
              "Number recognition",
              "Counting songs"
            ],
            difficulty: "beginner"
          },
          {
            id: "n1_math_shapes",
            title: "Basic Shapes",
            description: "Learn circle, square, triangle",
            content: "A circle is round, a square has four sides, a triangle has three sides!",
            exercises: [
              "Shape identification",
              "Drawing shapes",
              "Shape sorting"
            ],
            difficulty: "beginner"
          }
        ]
      },
      social: {
        name: "Social Studies",
        topics: [
          {
            id: "n1_social_family",
            title: "My Family",
            description: "Learn about family members",
            content: "Mommy, daddy, brother, sister - we love our family!",
            exercises: [
              "Family member names",
              "Family roles",
              "Family activities"
            ],
            difficulty: "beginner"
          }
        ]
      }
    }
  },

  nursery2: {
    name: "Nursery 2",
    age: "4-5 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "n2_eng_reading",
            title: "Beginning Reading",
            description: "Learn to read simple words",
            content: "Let's read simple words: cat, dog, sun, moon, book...",
            exercises: [
              "Sight word recognition",
              "Simple word reading",
              "Picture-word matching"
            ],
            difficulty: "beginner"
          },
          {
            id: "n2_eng_sentences",
            title: "Simple Sentences",
            description: "Learn to make simple sentences",
            content: "I see a cat. The sun is bright. I like to play.",
            exercises: [
              "Complete sentences",
              "Sentence building",
              "Picture descriptions"
            ],
            difficulty: "beginner"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "n2_math_counting",
            title: "Counting 1-20",
            description: "Learn to count from 1 to 20",
            content: "Let's count higher: eleven, twelve, thirteen...",
            exercises: [
              "Count to 20",
              "Number writing",
              "Number patterns"
            ],
            difficulty: "beginner"
          },
          {
            id: "n2_math_addition",
            title: "Simple Addition",
            description: "Learn basic addition with objects",
            content: "2 apples + 3 apples = 5 apples!",
            exercises: [
              "Adding objects",
              "Number line addition",
              "Picture addition"
            ],
            difficulty: "beginner"
          }
        ]
      }
    }
  },

  primary1: {
    name: "Primary 1",
    age: "5-6 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "p1_eng_grammar",
            title: "Basic Grammar",
            description: "Learn nouns, verbs, and adjectives",
            content: "A noun is a person, place, or thing. A verb is an action word.",
            exercises: [
              "Identify nouns and verbs",
              "Use adjectives",
              "Sentence structure"
            ],
            difficulty: "beginner"
          },
          {
            id: "p1_eng_comprehension",
            title: "Reading Comprehension",
            description: "Read and understand short stories",
            content: "Read stories and answer questions about what happened.",
            exercises: [
              "Story reading",
              "Answer questions",
              "Retell stories"
            ],
            difficulty: "beginner"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "p1_math_operations",
            title: "Addition and Subtraction",
            description: "Learn basic addition and subtraction",
            content: "5 + 3 = 8, 10 - 4 = 6. Let's practice!",
            exercises: [
              "Mental math",
              "Word problems",
              "Number bonds"
            ],
            difficulty: "beginner"
          },
          {
            id: "p1_math_money",
            title: "Money and Coins",
            description: "Learn about Nigerian money",
            content: "Naira and kobo. Learn to count money!",
            exercises: [
              "Coin recognition",
              "Money counting",
              "Simple purchases"
            ],
            difficulty: "beginner"
          }
        ]
      },
      science: {
        name: "Basic Science",
        topics: [
          {
            id: "p1_sci_animals",
            title: "Animals and Plants",
            description: "Learn about living things",
            content: "Animals move, eat, and grow. Plants need water and sunlight!",
            exercises: [
              "Animal classification",
              "Plant parts",
              "Living vs non-living"
            ],
            difficulty: "beginner"
          }
        ]
      }
    }
  },

  primary2: {
    name: "Primary 2",
    age: "6-7 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "p2_eng_writing",
            title: "Creative Writing",
            description: "Write short stories and descriptions",
            content: "Write about your family, your school, or your favorite food!",
            exercises: [
              "Story writing",
              "Descriptive writing",
              "Letter writing"
            ],
            difficulty: "intermediate"
          },
          {
            id: "p2_eng_spelling",
            title: "Spelling and Vocabulary",
            description: "Learn to spell common words",
            content: "Practice spelling: house, school, friend, family, happy...",
            exercises: [
              "Spelling practice",
              "Word families",
              "Vocabulary building"
            ],
            difficulty: "intermediate"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "p2_math_multiplication",
            title: "Multiplication Tables",
            description: "Learn 2, 5, and 10 times tables",
            content: "2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6... Let's learn!",
            exercises: [
              "Times table practice",
              "Multiplication games",
              "Word problems"
            ],
            difficulty: "intermediate"
          },
          {
            id: "p2_math_measurement",
            title: "Length and Weight",
            description: "Learn to measure length and weight",
            content: "Use rulers to measure length. Use scales to measure weight!",
            exercises: [
              "Measuring objects",
              "Comparing lengths",
              "Weight estimation"
            ],
            difficulty: "intermediate"
          }
        ]
      }
    }
  },

  primary3: {
    name: "Primary 3",
    age: "7-8 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "p3_eng_grammar",
            title: "Advanced Grammar",
            description: "Learn tenses, pronouns, and conjunctions",
            content: "Present tense: I play. Past tense: I played. Future tense: I will play.",
            exercises: [
              "Tense practice",
              "Pronoun usage",
              "Conjunction sentences"
            ],
            difficulty: "intermediate"
          },
          {
            id: "p3_eng_composition",
            title: "Essay Writing",
            description: "Write short essays and compositions",
            content: "Write about your holiday, your best friend, or your favorite food!",
            exercises: [
              "Essay structure",
              "Descriptive writing",
              "Narrative writing"
            ],
            difficulty: "intermediate"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "p3_math_division",
            title: "Division",
            description: "Learn basic division",
            content: "12 ÷ 3 = 4. Division is sharing equally!",
            exercises: [
              "Division practice",
              "Word problems",
              "Division facts"
            ],
            difficulty: "intermediate"
          },
          {
            id: "p3_math_fractions",
            title: "Simple Fractions",
            description: "Learn about halves, quarters, and thirds",
            content: "Half of 8 is 4. A quarter of 12 is 3!",
            exercises: [
              "Fraction recognition",
              "Fraction addition",
              "Fraction word problems"
            ],
            difficulty: "intermediate"
          }
        ]
      },
      social: {
        name: "Social Studies",
        topics: [
          {
            id: "p3_social_nigeria",
            title: "Nigeria - Our Country",
            description: "Learn about Nigeria's states and culture",
            content: "Nigeria has 36 states. Lagos, Kano, and Rivers are major cities!",
            exercises: [
              "State identification",
              "Cultural practices",
              "National symbols"
            ],
            difficulty: "intermediate"
          }
        ]
      }
    }
  },

  primary4: {
    name: "Primary 4",
    age: "8-9 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "p4_eng_literature",
            title: "Literature and Poetry",
            description: "Read stories and write poems",
            content: "Read folktales and write simple poems about nature!",
            exercises: [
              "Story analysis",
              "Poetry writing",
              "Character study"
            ],
            difficulty: "intermediate"
          },
          {
            id: "p4_eng_communication",
            title: "Communication Skills",
            description: "Learn to speak and present clearly",
            content: "Practice speaking clearly, asking questions, and giving presentations!",
            exercises: [
              "Public speaking",
              "Question formation",
              "Presentation skills"
            ],
            difficulty: "intermediate"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "p4_math_decimals",
            title: "Decimals",
            description: "Learn about decimal numbers",
            content: "0.5 is half, 0.25 is a quarter, 0.75 is three quarters!",
            exercises: [
              "Decimal recognition",
              "Decimal addition",
              "Money calculations"
            ],
            difficulty: "intermediate"
          },
          {
            id: "p4_math_geometry",
            title: "Basic Geometry",
            description: "Learn about angles and shapes",
            content: "Right angles are 90 degrees. Triangles have three angles!",
            exercises: [
              "Angle measurement",
              "Shape properties",
              "Perimeter calculation"
            ],
            difficulty: "intermediate"
          }
        ]
      },
      science: {
        name: "Basic Science",
        topics: [
          {
            id: "p4_sci_matter",
            title: "States of Matter",
            description: "Learn about solid, liquid, and gas",
            content: "Ice is solid water. Water is liquid. Steam is gas!",
            exercises: [
              "Matter classification",
              "State changes",
              "Properties of matter"
            ],
            difficulty: "intermediate"
          }
        ]
      }
    }
  },

  primary5: {
    name: "Primary 5",
    age: "9-10 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "p5_eng_advanced",
            title: "Advanced Writing",
            description: "Write complex essays and reports",
            content: "Write detailed essays with introduction, body, and conclusion!",
            exercises: [
              "Essay planning",
              "Report writing",
              "Creative writing"
            ],
            difficulty: "advanced"
          },
          {
            id: "p5_eng_comprehension",
            title: "Advanced Comprehension",
            description: "Read and analyze complex texts",
            content: "Read passages and answer detailed questions about content and meaning!",
            exercises: [
              "Text analysis",
              "Inference skills",
              "Critical thinking"
            ],
            difficulty: "advanced"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "p5_math_percentage",
            title: "Percentages",
            description: "Learn to calculate percentages",
            content: "50% is half, 25% is a quarter, 75% is three quarters!",
            exercises: [
              "Percentage calculation",
              "Word problems",
              "Real-life applications"
            ],
            difficulty: "advanced"
          },
          {
            id: "p5_math_algebra",
            title: "Simple Algebra",
            description: "Learn basic algebraic expressions",
            content: "If x + 5 = 12, then x = 7. Let's solve equations!",
            exercises: [
              "Equation solving",
              "Variable substitution",
              "Pattern recognition"
            ],
            difficulty: "advanced"
          }
        ]
      }
    }
  },

  primary6: {
    name: "Primary 6",
    age: "10-11 years",
    subjects: {
      english: {
        name: "English Language",
        topics: [
          {
            id: "p6_eng_exam",
            title: "Exam Preparation",
            description: "Prepare for common entrance exams",
            content: "Practice exam-style questions in grammar, comprehension, and composition!",
            exercises: [
              "Exam practice",
              "Time management",
              "Question analysis"
            ],
            difficulty: "advanced"
          },
          {
            id: "p6_eng_creative",
            title: "Creative Writing",
            description: "Write stories, poems, and plays",
            content: "Create original stories with characters, plot, and setting!",
            exercises: [
              "Story creation",
              "Poetry writing",
              "Drama scripts"
            ],
            difficulty: "advanced"
          }
        ]
      },
      mathematics: {
        name: "Mathematics",
        topics: [
          {
            id: "p6_math_advanced",
            title: "Advanced Problem Solving",
            description: "Solve complex word problems",
            content: "Use multiple strategies to solve challenging math problems!",
            exercises: [
              "Problem analysis",
              "Multiple strategies",
              "Logical thinking"
            ],
            difficulty: "advanced"
          },
          {
            id: "p6_math_geometry",
            title: "Advanced Geometry",
            description: "Learn area, volume, and angles",
            content: "Calculate area of rectangles and triangles. Find volume of cubes!",
            exercises: [
              "Area calculation",
              "Volume problems",
              "Angle measurement"
            ],
            difficulty: "advanced"
          }
        ]
      },
      science: {
        name: "Basic Science",
        topics: [
          {
            id: "p6_sci_experiments",
            title: "Scientific Experiments",
            description: "Conduct simple experiments",
            content: "Learn the scientific method: observe, question, experiment, conclude!",
            exercises: [
              "Experiment design",
              "Data recording",
              "Conclusion writing"
            ],
            difficulty: "advanced"
          }
        ]
      }
    }
  }
};

// Helper functions
export const getClassLevel = (classId) => {
  return nigerianCurriculum[classId];
};

export const getSubjects = (classId) => {
  const classLevel = getClassLevel(classId);
  return classLevel ? Object.keys(classLevel.subjects) : [];
};

export const getTopics = (classId, subject) => {
  const classLevel = getClassLevel(classId);
  return classLevel?.subjects[subject]?.topics || [];
};

export const getTopic = (classId, subject, topicId) => {
  const topics = getTopics(classId, subject);
  return topics.find(topic => topic.id === topicId);
};

export const getAllClasses = () => {
  return Object.keys(nigerianCurriculum).map(classId => ({
    id: classId,
    name: nigerianCurriculum[classId].name,
    age: nigerianCurriculum[classId].age
  }));
};

export const getClassByAge = (age) => {
  const ageNum = parseInt(age);
  if (ageNum >= 3 && ageNum <= 4) return 'nursery1';
  if (ageNum >= 4 && ageNum <= 5) return 'nursery2';
  if (ageNum >= 5 && ageNum <= 6) return 'primary1';
  if (ageNum >= 6 && ageNum <= 7) return 'primary2';
  if (ageNum >= 7 && ageNum <= 8) return 'primary3';
  if (ageNum >= 8 && ageNum <= 9) return 'primary4';
  if (ageNum >= 9 && ageNum <= 10) return 'primary5';
  if (ageNum >= 10 && ageNum <= 11) return 'primary6';
  return 'primary3'; // default
}; 