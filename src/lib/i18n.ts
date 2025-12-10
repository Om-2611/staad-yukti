export type Language = 'en' | 'hi' | 'te';

export interface Translation {
  landing: {
    title: string;
    subtitle: string;
    loginButton: string;
  };
  auth: {
    login: string;
    signup: string;
    email: string;
    password: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
  };
  screening: {
    progress: string;
    question: string;
    never: string;
    sometimes: string;
    often: string;
    always: string;
    motivation: string[];
    logout: string;
  };
  adhd: {
    chooseSubcategory: string;
    subcategories: {
      inattentive: string;
      hyperactive: string;
      oppositional: string;
      conduct: string;
      anxiety: string;
    };
  };
  results: {
    title: string;
    categories: {
      focus: string;
      reading: string;
      writing: string;
      processing: string;
    };
    download: string;
    retake: string;
    home: string;
    feedback: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    landing: {
      title: "STAAD — Screening Tool for ADHD and Dyslexia",
      subtitle: "An intelligent, accessible platform designed to identify ADHD and Dyslexia indicators early. Empower learners and parents through awareness and understanding.",
      loginButton: "Login / Sign Up"
    },
    auth: {
      login: "Log In",
      signup: "Sign Up",
      email: "Email Address",
      password: "Password",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?"
    },
    screening: {
      progress: "Progress",
      question: "Question",
      never: "Never",
      sometimes: "Sometimes",
      often: "Often",
      always: "Always",
      motivation: [
        "You're doing great! 🌟 Keep going.",
        "Fantastic progress! 💪 You're halfway there.",
        "Almost there! 🎯 Just a few more questions."
      ],
      logout: "Logout"
    },
    adhd: {
      chooseSubcategory: "Choose ADHD Subcategory",
      subcategories: {
        inattentive: "Inattentive ADHD",
        hyperactive: "Hyperactive ADHD",
        oppositional: "Oppositional Defiant",
        conduct: "Conduct",
        anxiety: "Anxiety"
      }
    },
    results: {
      title: "Your Screening Results",
      categories: {
        focus: "Focus & Attention",
        reading: "Reading Skills",
        writing: "Writing Skills",
        processing: "Processing Speed"
      },
      download: "Download Report",
      retake: "Retake Test",
      home: "Back to Home",
      feedback: "Your results indicate areas that may benefit from further evaluation. Remember, this is a screening tool and not a diagnosis. Consider consulting with a healthcare professional for comprehensive assessment."
    }
  },
  hi: {
    landing: {
      title: "STAAD — ADHD और डिस्लेक्सिया के लिए स्क्रीनिंग टूल",
      subtitle: "एक बुद्धिमान, सुलभ मंच जो ADHD और डिस्लेक्सिया संकेतकों की जल्दी पहचान करने के लिए डिज़ाइन किया गया है। जागरूकता और समझ के माध्यम से शिक्षार्थियों और माता-पिता को सशक्त बनाएं।",
      loginButton: "लॉगिन / साइन अप"
    },
    auth: {
      login: "लॉग इन करें",
      signup: "साइन अप करें",
      email: "ईमेल पता",
      password: "पासवर्ड",
      forgotPassword: "पासवर्ड भूल गए?",
      noAccount: "खाता नहीं है?",
      hasAccount: "पहले से खाता है?"
    },
    screening: {
      progress: "प्रगति",
      question: "प्रश्न",
      never: "कभी नहीं",
      sometimes: "कभी-कभी",
      often: "अक्सर",
      always: "हमेशा",
      motivation: [
        "आप बहुत अच्छा कर रहे हैं! 🌟 जारी रखें।",
        "शानदार प्रगति! 💪 आप आधे रास्ते पर हैं।",
        "लगभग पूरा हो गया! 🎯 बस कुछ और प्रश्न।"
      ],
      logout: "लॉगआउट"
    },
    adhd: {
      chooseSubcategory: "ADHD उप-श्रेणी चुनें",
      subcategories: {
        inattentive: "ध्यान की कमी (Inattentive)",
        hyperactive: "अत्यधिक सक्रिय (Hyperactive)",
        oppositional: "विरोधी अनुकूल (Oppositional Defiant)",
        conduct: "आचरण (Conduct)",
        anxiety: "चिंता (Anxiety)"
      }
    },
    results: {
      title: "आपके स्क्रीनिंग परिणाम",
      categories: {
        focus: "ध्यान केंद्रित करना",
        reading: "पढ़ने का कौशल",
        writing: "लेखन कौशल",
        processing: "प्रोसेसिंग स्पीड"
      },
      download: "रिपोर्ट डाउनलोड करें",
      retake: "फिर से टेस्ट लें",
      home: "होम पर वापस जाएं",
      feedback: "आपके परिणाम उन क्षेत्रों का संकेत देते हैं जिन्हें आगे के मूल्यांकन से लाभ हो सकता है। याद रखें, यह एक स्क्रीनिंग टूल है, निदान नहीं।"
    }
  },
  te: {
    landing: {
      title: "STAAD — ADHD మరియు డిస్లెక్సియా కోసం స్క్రీనింగ్ సాధనం",
      subtitle: "ADHD మరియు డిస్లెక్సియా సూచికలను ముందుగానే గుర్తించడానికి రూపొందించబడిన తెలివైన, అందుబాటులో ఉండే వేదిక. అవగాహన మరియు అర్థం చేసుకోవడం ద్వారా అభ్యాసకులు మరియు తల్లిదండ్రులకు శక్తినివ్వండి.",
      loginButton: "లాగిన్ / సైన్ అప్"
    },
    auth: {
      login: "లాగ్ ఇన్",
      signup: "సైన్ అప్",
      email: "ఇమెయిల్ చిరునామా",
      password: "పాస్‌వర్డ్",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      noAccount: "ఖాతా లేదా?",
      hasAccount: "ఇప్పటికే ఖాతా ఉందా?"
    },
    screening: {
      progress: "పురోగతి",
      question: "ప్రశ్న",
      never: "ఎప్పుడూ లేదు",
      sometimes: "కొన్నిసార్లు",
      often: "తరచుగా",
      always: "ఎల్లప్పుడూ",
      motivation: [
        "మీరు గొప్పగా చేస్తున్నారు! 🌟 కొనసాగించండి।",
        "అద్భుతమైన పురోగతి! 💪 మీరు సగం దూరంలో ఉన్నారు।",
        "దాదాపు పూర్తయింది! 🎯 మరికొన్ని ప్రశ్నలు మాత్రమే।"
      ],
      logout: "లాగౌట్"
    },
    adhd: {
      chooseSubcategory: "ADHD ఉపకేటగిరీ ఎంచుకోండి",
      subcategories: {
        inattentive: "అసావధాన (Inattentive)",
        hyperactive: "అత్యధిక శక్తివంతమైన (Hyperactive)",
        oppositional: "విపరీత వ్యతిరేక (Oppositional Defiant)",
        conduct: "నడత (Conduct)",
        anxiety: "ఆందోళన (Anxiety)"
      }
    },
    results: {
      title: "మీ స్క్రీనింగ్ ఫలితాలు",
      categories: {
        focus: "దృష్టి & శ్రద్ధ",
        reading: "చదవడం నైపుణ్యాలు",
        writing: "రాయడం నైపుణ్యాలు",
        processing: "ప్రాసెసింగ్ వేగం"
      },
      download: "రిపోర్ట్ డౌన్‌లోడ్ చేయండి",
      retake: "మళ్లీ పరీక్ష తీసుకోండి",
      home: "హోమ్‌కు తిరిగి వెళ్ళండి",
      feedback: "మీ ఫలితాలు మరింత మూల్యాంకనం నుండి ప్రయోజనం పొందే ప్రాంతాలను సూచిస్తాయి। ఇది స్క్రీనింగ్ సాధనం, రోగనిర్ధారణ కాదు గుర్తుంచుకోండి।"
    }
  }
};
