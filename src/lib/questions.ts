export interface Question {
  id: number;
  en: string;
  hi: string;
  te: string;
  category: 'focus' | 'reading' | 'writing' | 'processing' | 'inattentive' | 'hyperactive' | 'oppositional' | 'conduct' | 'anxiety';
}

export const questions: Question[] = [
  {
    id: 1,
    en: "Do you find it difficult to focus on one task for long periods?",
    hi: "क्या आपको लंबे समय तक एक कार्य पर ध्यान केंद्रित करना मुश्किल लगता है?",
    te: "మీరు చాలా కాలం పాటు ఒక పనిపై దృష్టి పెట్టడం కష్టంగా ఉందా?",
    category: 'focus'
  },
  {
    id: 2,
    en: "Do you frequently lose track of time when doing activities you enjoy?",
    hi: "क्या आप अपनी पसंद की गतिविधियाँ करते समय अक्सर समय का ट्रैक खो देते हैं?",
    te: "మీరు ఆనందించే కార్యకలాపాలు చేస్తున్నప్పుడు తరచుగా సమయాన్ని కోల్పోతారా?",
    category: 'focus'
  },
  {
    id: 3,
    en: "Do you often make careless mistakes in schoolwork or other activities?",
    hi: "क्या आप अक्सर स्कूल के काम या अन्य गतिविधियों में लापरवाह गलतियाँ करते हैं?",
    te: "మీరు తరచుగా పాఠశాల పనిలో లేదా ఇతర కార్యకలాపాలలో అజాగ్రత్త తప్పులు చేస్తారా?",
    category: 'focus'
  },
  {
    id: 4,
    en: "Do you struggle to read long passages without losing focus?",
    hi: "क्या आपको ध्यान खोए बिना लंबे अंश पढ़ने में कठिनाई होती है?",
    te: "దృష్టి కోల్పోకుండా పొడవైన భాగాలను చదవడంలో మీరు కష్టపడుతున్నారా?",
    category: 'reading'
  },
  {
    id: 5,
    en: "Do you frequently confuse similar-looking letters like 'b' and 'd'?",
    hi: "क्या आप 'b' और 'd' जैसे समान दिखने वाले अक्षरों को अक्सर भ्रमित करते हैं?",
    te: "'b' మరియు 'd' వంటి సారూప్యంగా కనిపించే అక్షరాలను మీరు తరచుగా గందరగోళం చేస్తారా?",
    category: 'reading'
  },
  {
    id: 6,
    en: "Do you have difficulty sounding out unfamiliar words?",
    hi: "क्या आपको अपरिचित शब्दों को उच्चारित करने में कठिनाई होती है?",
    te: "తెలియని పదాలను ఉచ్చరించడంలో మీకు కష్టంగా ఉందా?",
    category: 'reading'
  },
  {
    id: 7,
    en: "Do you avoid reading tasks when possible?",
    hi: "क्या आप संभव होने पर पढ़ने के कार्यों से बचते हैं?",
    te: "సాధ్యమైనప్పుడు మీరు చదవడం పనులను తప్పించుకుంటారా?",
    category: 'reading'
  },
  {
    id: 8,
    en: "Do you find it hard to organize your thoughts when writing?",
    hi: "क्या आपको लिखते समय अपने विचारों को व्यवस्थित करना कठिन लगता है?",
    te: "రాసేటప్పుడు మీ ఆలోచనలను నిర్వహించడం మీకు కష్టంగా ఉందా?",
    category: 'writing'
  },
  {
    id: 9,
    en: "Do you make frequent spelling errors, even with common words?",
    hi: "क्या आप सामान्य शब्दों के साथ भी बार-बार वर्तनी की गलतियाँ करते हैं?",
    te: "సాధారణ పదాలతో కూడా మీరు తరచుగా స్పెల్లింగ్ తప్పులు చేస్తారా?",
    category: 'writing'
  },
  {
    id: 10,
    en: "Do you struggle with handwriting or keeping your writing neat?",
    hi: "क्या आपको हस्तलेखन या अपने लेखन को साफ रखने में कठिनाई होती है?",
    te: "చేతివ్రాతతో లేదా మీ రాతను చక్కగా ఉంచడంలో మీరు కష్టపడుతున్నారా?",
    category: 'writing'
  },
  {
    id: 11,
    en: "Do you take longer than others to complete written assignments?",
    hi: "क्या आप लिखित असाइनमेंट पूरा करने में दूसरों से अधिक समय लेते हैं?",
    te: "వ్రాతపూర్వక అసైన్‌మెంట్‌లను పూర్తి చేయడానికి మీరు ఇతరుల కంటే ఎక్కువ సమయం తీసుకుంటారా?",
    category: 'processing'
  },
  {
    id: 12,
    en: "Do you have trouble following multi-step instructions?",
    hi: "क्या आपको बहु-चरणीय निर्देशों का पालन करने में परेशानी होती है?",
    te: "బహుళ-దశల సూచనలను అనుసరించడంలో మీకు ఇబ్బంది ఉందా?",
    category: 'processing'
  },
  {
    id: 13,
    en: "Do you often need information repeated to understand it?",
    hi: "क्या आपको इसे समझने के लिए अक्सर जानकारी दोहराने की आवश्यकता होती है?",
    te: "దానిని అర్థం చేసుకోవడానికి మీకు తరచుగా సమాచారం పునరావృతమయ్యే అవసరం ఉందా?",
    category: 'processing'
  },
  {
    id: 14,
    en: "Do you find it challenging to process information quickly during tests?",
    hi: "क्या आपको परीक्षणों के दौरान जानकारी को जल्दी से संसाधित करना चुनौतीपूर्ण लगता है?",
    te: "పరీక్షల సమయంలో సమాచారాన్ని త్వరగా ప్రాసెస్ చేయడం మీకు సవాలుగా ఉందా?",
    category: 'processing'
  },
  {
    id: 15,
    en: "Do you have difficulty remembering what you just read or heard?",
    hi: "क्या आपको याद रखने में कठिनाई होती है कि आपने अभी क्या पढ़ा या सुना?",
    te: "మీరు ఇప్పుడే చదివిన లేదా విన్నది గుర్తుంచుకోవడంలో మీకు కష్టంగా ఉందా?",
    category: 'processing'
  }
  ,
  // ADHD-related subcategory questions (inattentive, hyperactive, oppositional, conduct, anxiety)
  {
    id: 16,
    en: "Do you often forget to complete tasks or chores even when reminded?",
    hi: "क्या आप बार-बार काम या छोटे-छोटे कामों को पूरा करना भूल जाते हैं, भले ही आपको याद दिलाया गया हो?",
    te: "మీకు గుర్తుచేసినా కూడా మీరు తరచుగా పనులు లేదా పనుల‌ను పూర్తి చేయడానికి మర్చిపోతున్నారా?",
    category: 'inattentive'
  },
  {
    id: 17,
    en: "Do you have trouble sustaining attention during conversations or meetings?",
    hi: "क्या आपको बातचीत या बैठकों के दौरान ध्यान बनाए रखने में समस्या होती है?",
    te: "మాట్లాడుతునప్పుడు లేదా సమావేశాల్లో మీరు దృష్టిని నిలబడించడంలో ఇబ్బంది పడతారా?",
    category: 'inattentive'
  },
  {
    id: 18,
    en: "Do you frequently daydream or get lost in your thoughts when doing tasks?",
    hi: "क्या आप अक्सर काम के दौरान खोए हुए विचारों में या सपनों में खो जाते हैं?",
    te: "పనులు చేస్తున్నప్పుడు మీరు తరచుగా మెలుకువగా గోచరిస్తారు లేదా ఆలోచనల్లో పోతారా?",
    category: 'inattentive'
  },
  {
    id: 19,
    en: "Do you feel restless, fidgety, or unable to sit still for long?",
    hi: "क्या आप बेचैन, चंचल महसूस करते हैं, या लंबे समय तक स्थिर नहीं बैठ पाते?",
    te: "మీకు చికాకు, కదలిక లేదా పొడవుగా నిలబడలేని అనుభూతి ఉంటుందా?",
    category: 'hyperactive'
  },
  {
    id: 20,
    en: "Do you find yourself interrupting others or speaking out of turn often?",
    hi: "क्या आप अक्सर दूसरों का रुकावट डालते हैं या बिना समय के बोलते हैं?",
    te: "మీరు తరచుగా ఇతరులను అంతరాయం చేయడానికో లేదా సరైన సమయంలో మాట్లాడకుండా ఉంటారా?",
    category: 'hyperactive'
  },
  {
    id: 21,
    en: "Do you act impulsively without thinking about consequences?",
    hi: "क्या आप अक्सर बिना परिणामों के बारे में सोचे अचानक निर्णय लेते हैं?",
    te: "ఫలితాల గురించి ఆలోచించకుండానే మీరు వెంటనే చర్యలు చేస్తారా?",
    category: 'hyperactive'
  },
  {
    id: 22,
    en: "Do you often argue with authority figures or refuse to follow rules?",
    hi: "क्या आप अक्सर प्राधिकरण के साथ बहस करते हैं या नियमों का पालन करने से इनकार करते हैं?",
    te: "మీరు తరచుగా అధికారి వ్యక్తులతో వాదిస్తారా లేదా నిబంధనలను అనుసరించకుండా తిరస్కరిస్తారా?",
    category: 'oppositional'
  },
  {
    id: 23,
    en: "Do you deliberately annoy people or blame others for your mistakes?",
    hi: "क्या आप जानबूझकर लोगों को परेशान करते हैं या अपनी गलतियों के लिए दूसरों को दोष देते हैं?",
    te: "మీరు ఉద్దేశపూర్వకంగా ప్రజలను ఇబ్బంది పెట్టుతారా లేదా మీ తప్పులకి ఇతరులను దోషారోపణ చేస్తారా?",
    category: 'oppositional'
  },
  {
    id: 24,
    en: "Do you often act aggressively, e.g., hitting or threatening others?",
    hi: "क्या आप अक्सर आक्रामक व्यवहार करते हैं, जैसे किसी को मारना या धमकाना?",
    te: "మీరు తరచుగా ఆగ్రహపూర్వకంగా ప్రవర్తిస్తారా, ఉదాహరణకు కొట్టడం లేదా ఇతరులను బెదిరించడం?",
    category: 'conduct'
  },
  {
    id: 25,
    en: "Do you destroy property or engage in behavior that harms others?",
    hi: "क्या आप संपत्ति को नुकसान पहुँचाते हैं या दूसरों को हानि पहुँचाने वाले व्यवहार में संलग्न होते हैं?",
    te: "మీరు ఆస్తిని నష్టపరిచెలా లేదా ఇతరులకు హాని చేసే ప్రవర్తనలో పాల్గొంటారా?",
    category: 'conduct'
  },
  {
    id: 26,
    en: "Do you experience excessive worry that interferes with daily activities?",
    hi: "क्या आपको अत्यधिक चिंता होती है जो दैनिक गतिविधियों में हस्तक्षेप करती है?",
    te: "రోజువారీ కార్యాకలాపాలలో అంపకంగా మనస్తాపం మీకు ఎక్కువగా తలెత్తుతుందని భావిస్తారా?",
    category: 'anxiety'
  },
  {
    id: 27,
    en: "Do you avoid social situations because of fear or nervousness?",
    hi: "क्या आप भय या घबराहट के कारण सामाजिक स्थितियों से बचते हैं?",
    te: "భయం లేదా కోపంతో మీరు సామాజిక పరిస్థితులను నివారిస్తారా?",
    category: 'anxiety'
  },
  {
    id: 28,
    en: "Do physical symptoms (like stomachaches or headaches) appear when anxious?",
    hi: "क्या चिंता होने पर शारीरिक लक्षण (जैसे पेट में दर्द या सिरदर्द) प्रकट होते हैं?",
    te: "ఆందోళనగా ఉన్నప్పుడు శారీరక లక్షణాలు (ఉదాహరణకు మలబద్ధకం లేదా తలనొప్పి) కనిపించకపోవచ్చా?",
    category: 'anxiety'
  }
];
