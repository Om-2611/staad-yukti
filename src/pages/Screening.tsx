import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { questions } from '@/lib/questions';
import { getADHDQuestions, type ADHDSubcategory } from '@/lib/adhdQuestions';
import { getDyslexiaParentQuestions, type DyslexiaCategory } from '@/lib/dyslexiaParentQuestions';
import staticDyslexiaParentQuestions from '@/lib/dyslexiaParentQuestions';
import { getDyslexiaChildQuestions, type DyslexiaChildCategory } from '@/lib/dyslexiaChildQuestions';
import staticDyslexiaChildQuestions from '@/lib/dyslexiaChildQuestions';
import { useLocation } from 'react-router-dom';
import { Brain, LogOut, Info, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Answer = 'never' | 'sometimes' | 'often' | 'always';

const Screening = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  // ADHD mode states
  const [isAdhdMode, setIsAdhdMode] = useState(false);
  const [adhdSub, setAdhdSub] = useState<string | null>(null);
  const [phase, setPhase] = useState<'behavioral' | 'performance'>('behavioral');
  // Loaded ADHD questions based on language
  const [adhdQuestions, setAdhdQuestions] = useState<Record<string, ADHDSubcategory>>({});
  // Dyslexia parent mode states
  const [isDyslexiaParentMode, setIsDyslexiaParentMode] = useState(false);
  const [dyslexiaSub, setDyslexiaSub] = useState<string | null>(null);
  const [dyslexiaAnswers, setDyslexiaAnswers] = useState<Record<string, { text: string; score: number }>>({});
  // Loaded dyslexia parent questions based on language
  const [dyslexiaParentQuestions, setDyslexiaParentQuestions] = useState<Record<string, DyslexiaCategory>>(staticDyslexiaParentQuestions);
  // Dyslexia child mode states
  const [isDyslexiaChildMode, setIsDyslexiaChildMode] = useState(false);
  const [dyslexiaChildSub, setDyslexiaChildSub] = useState<string | null>(null);
  const [dyslexiaChildAnswers, setDyslexiaChildAnswers] = useState<Record<string, { text: string; score: number; timeTaken: number }>>({});
  // Loaded dyslexia child questions based on language
  const [dyslexiaChildQuestions, setDyslexiaChildQuestions] = useState<Record<string, DyslexiaChildCategory>>(staticDyslexiaChildQuestions);
  // Time tracking for dyslexia child
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [slowResponseCount, setSlowResponseCount] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0); // Elapsed time in seconds for current question
  // keep ADHD answers as { text, score } for reliable scoring and highlighting
  const [adhdBehavioralAnswers, setAdhdBehavioralAnswers] = useState<Record<string, { text: string; score: number }>>({});
  const [adhdPerformanceAnswers, setAdhdPerformanceAnswers] = useState<Record<string, { text: string; score: number }>>({});
  // selected option for non-ADHD flow (values: 'never'|'sometimes'|'often'|'always')
  const [selectedOption, setSelectedOption] = useState<Answer | null>(null);
  // selected option text for ADHD flow (stores the exact option.text from adhdQuestions)
  const [adhdSelectedOption, setAdhdSelectedOption] = useState<string | null>(null);
  const [showMotivation, setShowMotivation] = useState(false);

  // Load ADHD questions when language changes
  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await getADHDQuestions(language as 'en' | 'hi' | 'te');
      setAdhdQuestions(questions);
    };
    loadQuestions();
  }, [language]);

  // Load Dyslexia Parent questions when language changes
  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await getDyslexiaParentQuestions(language as 'en' | 'hi' | 'te');
      setDyslexiaParentQuestions(questions);
    };
    loadQuestions();
  }, [language]);

  // Load Dyslexia Child questions when language changes
  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await getDyslexiaChildQuestions(language as 'en' | 'hi' | 'te');
      setDyslexiaChildQuestions(questions);
    };
    loadQuestions();
  }, [language]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const progress = isAdhdMode
    ? (() => {
        const sub = adhdSub || '';
        const cat = adhdQuestions[sub];
        if (!cat) return 0;
        const total = cat.behavioralQuestions.length + cat.performanceQuestions.length;
        const doneSoFar = (phase === 'behavioral' ? currentQuestion : cat.behavioralQuestions.length + currentQuestion) + 1;
        return Math.round((doneSoFar / total) * 100);
      })()
    : isDyslexiaParentMode
    ? (() => {
        const sub = dyslexiaSub || '';
        const cat = dyslexiaParentQuestions[sub];
        if (!cat) return 0;
        return Math.round(((currentQuestion + 1) / cat.questions.length) * 100);
      })()
    : isDyslexiaChildMode
    ? (() => {
        const sub = dyslexiaChildSub || '';
        const cat = dyslexiaChildQuestions[sub];
        if (!cat) return 0;
        return Math.round(((currentQuestion + 1) / cat.questions.length) * 100);
      })()
    : ((currentQuestion + 1) / questions.length) * 100;

  // Allow filtering by category passed in query param, e.g. ?category=adhd-inattentive
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get('category');
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    if (categoryParam && categoryParam.startsWith('adhd-')) {
      const sub = categoryParam.split('adhd-')[1];
      setIsAdhdMode(true);
      setAdhdSub(sub);
      setPhase('behavioral');
      setAdhdBehavioralAnswers({});
      setAdhdPerformanceAnswers({});
      setIsDyslexiaParentMode(false);
      setDyslexiaSub(null);
      setIsDyslexiaChildMode(false);
      setDyslexiaChildSub(null);
    } else if (categoryParam && categoryParam.startsWith('dyslexia-parent-')) {
      const sub = categoryParam.split('dyslexia-parent-')[1];
      setIsDyslexiaParentMode(true);
      setDyslexiaSub(sub);
      setDyslexiaAnswers({});
      setIsAdhdMode(false);
      setAdhdSub(null);
      setIsDyslexiaChildMode(false);
      setDyslexiaChildSub(null);
    } else if (categoryParam && categoryParam.startsWith('dyslexia-child-')) {
      const sub = categoryParam.split('dyslexia-child-')[1];
      setIsDyslexiaChildMode(true);
      setDyslexiaChildSub(sub);
      setDyslexiaChildAnswers({});
      setIsAdhdMode(false);
      setAdhdSub(null);
      setIsDyslexiaParentMode(false);
      setDyslexiaSub(null);
    } else {
      setIsAdhdMode(false);
      setAdhdSub(null);
      setIsDyslexiaParentMode(false);
      setDyslexiaSub(null);
      setIsDyslexiaChildMode(false);
      setDyslexiaChildSub(null);
      // Map non-ADHD params to existing categories if desired; keep existing behavior
      if (categoryParam) {
        const mapped = categoryParam;
        setFilteredQuestions(questions.filter((q) => q.category === (mapped as any)));
      } else {
        setFilteredQuestions(questions);
      }
    }
    // Reset progress to start
    setCurrentQuestion(0);
    setSelectedOption(null);
  }, [categoryParam]);

  // initialize selectedOption/adhdSelectedOption based on existing answers when question changes
  useEffect(() => {
    if (isAdhdMode && adhdSub) {
      const subData = adhdQuestions[adhdSub];
      if (!subData) {
        setAdhdSelectedOption(null);
        return;
      }
      const currentSet = phase === 'behavioral' ? subData.behavioralQuestions : subData.performanceQuestions;
      const q = currentSet[currentQuestion];
      const existing = phase === 'behavioral' ? adhdBehavioralAnswers[q?.id] : adhdPerformanceAnswers[q?.id];
      setAdhdSelectedOption(existing?.text ?? null);
    } else if (isDyslexiaParentMode && dyslexiaSub) {
      const subData = dyslexiaParentQuestions[dyslexiaSub];
      if (!subData) {
        setAdhdSelectedOption(null);
        return;
      }
      const q = subData.questions[currentQuestion];
      const existing = dyslexiaAnswers[q?.id];
      setAdhdSelectedOption(existing?.text ?? null);
    } else if (isDyslexiaChildMode && dyslexiaChildSub) {
      const subData = dyslexiaChildQuestions[dyslexiaChildSub];
      if (!subData) {
        setAdhdSelectedOption(null);
        return;
      }
      const q = subData.questions[currentQuestion];
      const existing = dyslexiaChildAnswers[q?.id];
      setAdhdSelectedOption(existing?.text ?? null);
    } else {
      const q = filteredQuestions[currentQuestion];
      const existing = q ? answers[q.id] : null;
      setSelectedOption((existing as Answer) ?? null);
    }
  }, [currentQuestion, isAdhdMode, adhdSub, phase, adhdBehavioralAnswers, adhdPerformanceAnswers, isDyslexiaParentMode, dyslexiaSub, dyslexiaAnswers, isDyslexiaChildMode, dyslexiaChildSub, dyslexiaChildAnswers, answers, filteredQuestions]);

  // Reset timer when question changes for dyslexia child mode
  useEffect(() => {
    if (isDyslexiaChildMode) {
      setQuestionStartTime(Date.now());
      setCurrentTime(0);
    }
  }, [currentQuestion, isDyslexiaChildMode]);

  // Update clock every 100ms for dyslexia child mode
  useEffect(() => {
    if (!isDyslexiaChildMode) return;
    
    const interval = setInterval(() => {
      const elapsed = (Date.now() - questionStartTime) / 1000;
      setCurrentTime(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [isDyslexiaChildMode, questionStartTime]);

  useEffect(() => {
    // Show motivation every 5 questions (based on combined count when in ADHD mode)
    const totalCount = isAdhdMode && adhdSub 
      ? (adhdQuestions[adhdSub]?.behavioralQuestions?.length || 0) + (adhdQuestions[adhdSub]?.performanceQuestions?.length || 0)
      : isDyslexiaParentMode && dyslexiaSub
      ? dyslexiaParentQuestions[dyslexiaSub]?.questions?.length || 0
      : isDyslexiaChildMode && dyslexiaChildSub
      ? dyslexiaChildQuestions[dyslexiaChildSub]?.questions?.length || 0
      : questions.length;
    const absoluteIndex = isAdhdMode && adhdSub
      ? (phase === 'behavioral' ? currentQuestion : (adhdQuestions[adhdSub]?.behavioralQuestions?.length || 0) + currentQuestion)
      : currentQuestion;

    if (absoluteIndex > 0 && (absoluteIndex + 1) % 5 === 0 && (absoluteIndex + 1) < totalCount) {
      setShowMotivation(true);
      const motivationIndex = Math.floor((absoluteIndex + 1) / 5) - 1;
      toast(t.screening.motivation[motivationIndex] || t.screening.motivation[0], {
        duration: 3000,
      });
      setTimeout(() => setShowMotivation(false), 3000);
    }
  }, [currentQuestion, t.screening.motivation, isAdhdMode, adhdSub, isDyslexiaParentMode, dyslexiaSub, phase]);

  // Save a non-ADHD answer locally
  const saveNonAdhdAnswer = (answer: Answer) => {
    const q = filteredQuestions[currentQuestion];
    if (!q) return;
    setAnswers({ ...answers, [q.id]: answer });
  };

  // Save an ADHD answer (uses adhdSelectedOption)
  const saveAdhdAnswer = () => {
    if (!adhdSub) return;
    const subData = adhdQuestions[adhdSub];
    if (!subData) return;

    if (phase === 'behavioral') {
      const q = subData.behavioralQuestions[currentQuestion];
      const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
      const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
      setAdhdBehavioralAnswers((prev) => ({ ...prev, [q.id]: { text: opt.text, score: opt.score } }));
    } else {
      const q = subData.performanceQuestions[currentQuestion];
      const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
      const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
      setAdhdPerformanceAnswers((prev) => ({ ...prev, [q.id]: { text: opt.text, score: opt.score } }));
    }
  };

  // Save a dyslexia parent answer
  const saveDyslexiaAnswer = () => {
    if (!dyslexiaSub) return;
    const subData = dyslexiaParentQuestions[dyslexiaSub];
    if (!subData) return;

    const q = subData.questions[currentQuestion];
    const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
    const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
    setDyslexiaAnswers((prev) => ({ ...prev, [q.id]: { text: opt.text, score: opt.score } }));
  };

  // Save a dyslexia child answer
  const saveDyslexiaChildAnswer = () => {
    if (!dyslexiaChildSub) return;
    const subData = dyslexiaChildQuestions[dyslexiaChildSub];
    if (!subData) return;

    const q = subData.questions[currentQuestion];
    const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
    const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
    
    // Calculate time taken for this question
    const timeTaken = (Date.now() - questionStartTime) / 1000; // Convert to seconds
    
    setDyslexiaChildAnswers((prev) => ({ 
      ...prev, 
      [q.id]: { text: opt.text, score: opt.score, timeTaken } 
    }));
    
    // Check if response was slow
    if (timeTaken > subData.expectedTimePerQuestion) {
      setSlowResponseCount((prev) => prev + 1);
    }
  };

  // Helper: compute the numeric score for the currently selected ADHD option (without relying on state)
  const getCurrentAdhdSelectionScore = () => {
    if (!adhdSub) return { id: null as string | null, score: 0 };
    const subData = adhdQuestions[adhdSub];
    const q = phase === 'behavioral' ? subData.behavioralQuestions[currentQuestion] : subData.performanceQuestions[currentQuestion];
    if (!q) return { id: null, score: 0 };
    const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
    const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
    return { id: q.id, score: opt.score };
  };

  const onNext = async () => {
    // validation: require selection depending on mode
    if (isAdhdMode || isDyslexiaParentMode || isDyslexiaChildMode) {
      if (!adhdSelectedOption) return;
    } else {
      if (!selectedOption) return;
    }

    if (isAdhdMode && adhdSub) {
      // persist current ADHD selection into local maps
      saveAdhdAnswer();
      const subData = adhdQuestions[adhdSub];
      if (phase === 'behavioral') {
        if (currentQuestion < subData.behavioralQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAdhdSelectedOption(null);
          return;
        }
        // move to performance
        setPhase('performance');
        setCurrentQuestion(0);
        setAdhdSelectedOption(null);
        return;
      } else {
        // performance phase
        if (currentQuestion < subData.performanceQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAdhdSelectedOption(null);
          return;
        }

        // finished both sections — compute totals and save to Firestore
        try {
          // compute maps including the last selection (since setState may be async, include current selection explicitly)
          const behavioralMap = { ...adhdBehavioralAnswers };
          const performanceMap = { ...adhdPerformanceAnswers };

          const last = getCurrentAdhdSelectionScore();
          if (last.id) {
            // last refers to a performance question here
            performanceMap[last.id] = performanceMap[last.id] ?? { text: adhdSelectedOption ?? '', score: last.score };
          }

          const behavioralTotal = Object.values(behavioralMap).reduce((sum, v) => sum + (v?.score ?? 0), 0);
          const performanceTotal = Object.values(performanceMap).reduce((sum, v) => sum + (v?.score ?? 0), 0);

          const thresholds: Record<string, number> = {
            inattentive: 6,
            hyperactive: 6,
            oppositional: 4,
            conduct: 3,
            anxiety: 3,
          };

          const behavioralPositive = behavioralTotal > (thresholds[adhdSub] ?? Infinity);
          const performancePositive = performanceTotal >= 2;
          const overallPositive = behavioralPositive || performancePositive;

          const payload = {
            userId: user?.uid,
            category: `adhd-${adhdSub}`,
            behavioralAnswers: behavioralMap,
            performanceAnswers: performanceMap,
            behavioralTotal,
            performanceTotal,
            behavioralPositive,
            performancePositive,
            overallPositive,
            completedAt: new Date().toISOString(),
            language,
          };
          const testResult = await addDoc(collection(db, 'testResults'), payload);
          setTimeout(() => {
            navigate('/results', { state: { resultId: testResult.id, answers: payload } });
          }, 400);
        } catch (error) {
          console.error('Error saving ADHD results:', error);
          toast.error('Failed to save test results');
        }
        return;
      }
    }

    // Dyslexia parent flow: persist current selection then advance or finish
    if (isDyslexiaParentMode && dyslexiaSub) {
      saveDyslexiaAnswer();
      const subData = dyslexiaParentQuestions[dyslexiaSub];
      
      if (!subData) return;
      
      if (currentQuestion < subData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAdhdSelectedOption(null);
        return;
      }

      // finished all questions — compute total and save to Firestore
      try {
        const answerMap = { ...dyslexiaAnswers };
        
        // Include last selection
        const q = subData.questions[currentQuestion];
        const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
        const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
        answerMap[q.id] = { text: opt.text, score: opt.score };

        const total = Object.values(answerMap).reduce((sum, v) => sum + (v?.score ?? 0), 0);
        
        // You mentioned you'll provide the logic later - for now saving total
        const positive = total >= 10; // Placeholder threshold

        const payload = {
          userId: user?.uid,
          category: `dyslexia-parent-${dyslexiaSub}`,
          answers: answerMap,
          total,
          positive,
          completedAt: new Date().toISOString(),
          language,
        };
        const testResult = await addDoc(collection(db, 'testResults'), payload);
        setTimeout(() => {
          navigate('/results', { state: { resultId: testResult.id, answers: payload } });
        }, 400);
      } catch (error) {
        console.error('Error saving dyslexia results:', error);
        toast.error('Failed to save test results');
      }
      return;
    }

    // Dyslexia child flow: persist current selection then advance or finish
    if (isDyslexiaChildMode && dyslexiaChildSub) {
      saveDyslexiaChildAnswer();
      const subData = dyslexiaChildQuestions[dyslexiaChildSub];
      
      if (!subData) return;
      
      if (currentQuestion < subData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAdhdSelectedOption(null);
        return;
      }

      // finished all questions — compute total and save to Firestore
      try {
        const answerMap = { ...dyslexiaChildAnswers };
        
        // Include last selection with time
        const q = subData.questions[currentQuestion];
        const selectedText = adhdSelectedOption ?? q.options[0]?.text ?? '';
        const opt = q.options.find((o) => o.text === selectedText) ?? q.options[0];
        const lastTimeTaken = (Date.now() - questionStartTime) / 1000;
        answerMap[q.id] = { text: opt.text, score: opt.score, timeTaken: lastTimeTaken };
        
        // Update slow response count for last question
        let finalSlowCount = slowResponseCount;
        if (lastTimeTaken > subData.expectedTimePerQuestion) {
          finalSlowCount += 1;
        }

        // Calculate total correct answers (score = 1 means correct)
        const totalCorrect = Object.values(answerMap).reduce((sum, v) => sum + (v?.score ?? 0), 0);
        const totalIncorrect = subData.questions.length - totalCorrect;
        
        // Apply dyslexia logic based on thresholds
        // Positive if: (incorrect > threshold) OR (slow responses > threshold)
        const positive = totalIncorrect > subData.thresholdIncorrect || finalSlowCount > subData.thresholdSlowResponses;
        
        // Calculate average time per question
        const avgTimePerQuestion = Object.values(answerMap).reduce((sum, v) => sum + (v?.timeTaken ?? 0), 0) / subData.questions.length;

        const payload = {
          userId: user?.uid,
          category: `dyslexia-child-${dyslexiaChildSub}`,
          answers: answerMap,
          totalCorrect,
          totalIncorrect,
          slowResponseCount: finalSlowCount,
          avgTimePerQuestion,
          positive,
          description: positive 
            ? (totalIncorrect > subData.thresholdIncorrect && finalSlowCount > subData.thresholdSlowResponses
                ? 'Early signs of visual/auditory confusion with slow responses'
                : totalIncorrect > subData.thresholdIncorrect
                ? dyslexiaChildSub === 'age-4-6' ? 'Early signs of visual/auditory confusion' 
                  : dyslexiaChildSub === 'age-6-10' ? 'Letter/number order and phoneme difficulty'
                  : dyslexiaChildSub === 'age-10-16' ? 'Complex pattern and spelling issues'
                  : 'Memory/phonetic processing difficulty'
                : 'Slow response times indicating processing difficulty')
            : 'No significant concerns detected',
          completedAt: new Date().toISOString(),
          language,
        };
        const testResult = await addDoc(collection(db, 'testResults'), payload);
        setTimeout(() => {
          navigate('/results', { state: { resultId: testResult.id, answers: payload } });
        }, 400);
      } catch (error) {
        console.error('Error saving dyslexia child results:', error);
        toast.error('Failed to save test results');
      }
      return;
    }

    // non-ADHD flow: persist current selection then advance or finish
    saveNonAdhdAnswer(selectedOption as Answer);
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      return;
    }

    // final save for non-ADHD
    try {
      const testResult = await addDoc(collection(db, 'testResults'), {
        userId: user?.uid,
        answers: answers,
        completedAt: new Date().toISOString(),
        language,
      });

      setTimeout(() => {
        navigate('/results', { state: { resultId: testResult.id, answers } });
      }, 500);
    } catch (error) {
      console.error('Error saving results:', error);
      toast.error('Failed to save test results');
    }
  };

  const onPrevious = () => {
    if (isAdhdMode && adhdSub) {
      if (phase === 'performance' && currentQuestion === 0) {
        // move back to behavioral last question
        const prevBehavioralCount = adhdQuestions[adhdSub].behavioralQuestions.length;
        setPhase('behavioral');
        setCurrentQuestion(prevBehavioralCount - 1);
        return;
      }

      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        return;
      }
      return;
    }

    if (isDyslexiaParentMode && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      return;
    }

    if (isDyslexiaChildMode && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      return;
    }

    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const answerOptions: { value: Answer; label: keyof typeof t.screening }[] = [
    { value: 'never', label: 'never' },
    { value: 'sometimes', label: 'sometimes' },
    { value: 'often', label: 'often' },
    { value: 'always', label: 'always' },
  ];

  // compute current question text depending on mode
  let questionText = '';
  if (isAdhdMode && adhdSub) {
    const sub = adhdQuestions[adhdSub];
    const qset = phase === 'behavioral' ? sub.behavioralQuestions : sub.performanceQuestions;
    const q = qset[currentQuestion];
    questionText = q?.text || '';
  } else if (isDyslexiaParentMode && dyslexiaSub) {
    const sub = dyslexiaParentQuestions[dyslexiaSub];
    const q = sub?.questions?.[currentQuestion];
    questionText = q?.text || '';
  } else if (isDyslexiaChildMode && dyslexiaChildSub) {
    const sub = dyslexiaChildQuestions[dyslexiaChildSub];
    const q = sub.questions[currentQuestion];
    questionText = q?.text || '';
  } else {
    const currentQ = filteredQuestions[currentQuestion];
    questionText = currentQ ? currentQ[language] : '';
  }

  // Fix textual progress counter for ADHD mode
  const displayTotal = isAdhdMode && adhdSub 
    ? (adhdQuestions[adhdSub]?.behavioralQuestions?.length || 0) + (adhdQuestions[adhdSub]?.performanceQuestions?.length || 0)
    : isDyslexiaParentMode && dyslexiaSub
    ? dyslexiaParentQuestions[dyslexiaSub]?.questions?.length || 0
    : isDyslexiaChildMode && dyslexiaChildSub
    ? dyslexiaChildQuestions[dyslexiaChildSub]?.questions?.length || 0
    : filteredQuestions.length;
  const displayCurrent = isAdhdMode && adhdSub 
    ? ((phase === 'behavioral' ? currentQuestion : (adhdQuestions[adhdSub]?.behavioralQuestions?.length || 0) + currentQuestion) + 1) 
    : (currentQuestion + 1);
  const isLast = displayCurrent === displayTotal;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-8 border-b border-border/50 glass">
        <div className="flex items-center gap-3">
          <Brain className="w-10 h-10 text-primary animate-glow-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">STAAD</h1>
        </div>

        <div className="flex items-center gap-4">
          {isDyslexiaChildMode && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <Clock className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-lg font-mono font-semibold text-primary">
                {Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            className="text-foreground/70 hover:text-foreground"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 pt-6">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{t.screening.progress}</span>
            <span>{displayCurrent} / {displayTotal}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-6 py-12">
        <div className="w-full max-w-3xl">
          <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl animate-slide-in-right">
            <div className="space-y-8">
              {/* Question */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    <span className="text-primary">Q{displayCurrent}:</span>{' '}
                    {questionText}
                  </h2>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    <Info className="w-5 h-5 text-accent" />
                  </Button>
                </div>
              </div>

              {/* Answer Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isAdhdMode && adhdSub ? (
                  (() => {
                    const sub = adhdQuestions[adhdSub];
                    const qset = phase === 'behavioral' ? sub.behavioralQuestions : sub.performanceQuestions;
                    const q = qset[currentQuestion];
                    if (!q) return null;
                    return q.options.map((opt, idx) => {
                      const isSelected = adhdSelectedOption === opt.text;
                      // Check if the option text is an emoji
                      const isEmoji = opt.text.length <= 4 && /[\u{1F300}-\u{1F9FF}]/u.test(opt.text);
                      return (
                        <Button
                          key={opt.text}
                          onClick={() => setAdhdSelectedOption(opt.text)}
                          className={`
                            h-20 font-semibold rounded-2xl transition-all
                            hover:scale-105 hover:shadow-lg animate-pop-in
                            ${isEmoji ? 'text-5xl' : 'text-lg'}
                            ${idx === 0 ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/50' : ''}
                            ${idx === 1 ? 'bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-accent/50' : ''}
                            ${idx === 2 ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:shadow-secondary/50' : ''}
                            ${idx === 3 ? 'bg-muted hover:bg-muted/80 text-muted-foreground' : ''}
                            ${idx === 4 ? 'bg-muted-foreground/20 hover:bg-muted-foreground/30 text-foreground' : ''}
                            ${isSelected ? 'ring-4 ring-offset-2 ring-primary/30 scale-105' : ''}
                          `}
                        >
                          {opt.text}
                        </Button>
                      );
                    });
                  })()
                ) : isDyslexiaParentMode && dyslexiaSub ? (
                  (() => {
                    const sub = dyslexiaParentQuestions[dyslexiaSub];
                    const q = sub.questions[currentQuestion];
                    if (!q) return null;
                    return q.options.map((opt, idx) => {
                      const isSelected = adhdSelectedOption === opt.text;
                      // Check if the option text is an emoji
                      const isEmoji = opt.text.length <= 4 && /[\u{1F300}-\u{1F9FF}]/u.test(opt.text);
                      return (
                        <Button
                          key={opt.text}
                          onClick={() => setAdhdSelectedOption(opt.text)}
                          className={`
                            h-20 font-semibold rounded-2xl transition-all
                            hover:scale-105 hover:shadow-lg animate-pop-in
                            ${isEmoji ? 'text-5xl' : 'text-lg'}
                            ${idx === 0 ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/50' : ''}
                            ${idx === 1 ? 'bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-accent/50' : ''}
                            ${idx === 2 ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:shadow-secondary/50' : ''}
                            ${idx === 3 ? 'bg-muted hover:bg-muted/80 text-muted-foreground' : ''}
                            ${idx === 4 ? 'bg-muted-foreground/20 hover:bg-muted-foreground/30 text-foreground' : ''}
                            ${isSelected ? 'ring-4 ring-offset-2 ring-primary/30 scale-105' : ''}
                          `}
                        >
                          {opt.text}
                        </Button>
                      );
                    });
                  })()
                ) : isDyslexiaChildMode && dyslexiaChildSub ? (
                  (() => {
                    const sub = dyslexiaChildQuestions[dyslexiaChildSub];
                    const q = sub.questions[currentQuestion];
                    if (!q) return null;
                    return q.options.map((opt, idx) => {
                      const isSelected = adhdSelectedOption === opt.text;
                      // Check if the option text is an emoji (single character that's not alphanumeric)
                      const isEmoji = opt.text.length <= 4 && /[\u{1F300}-\u{1F9FF}]/u.test(opt.text);
                      return (
                        <Button
                          key={`${q.id}-opt-${idx}`}
                          onClick={() => setAdhdSelectedOption(opt.text)}
                          className={`
                            h-20 font-semibold rounded-2xl transition-all
                            hover:scale-105 hover:shadow-lg animate-pop-in
                            ${isEmoji ? 'text-5xl' : 'text-lg'}
                            ${idx === 0 ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/50' : ''}
                            ${idx === 1 ? 'bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-accent/50' : ''}
                            ${idx === 2 ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:shadow-secondary/50' : ''}
                            ${idx === 3 ? 'bg-muted hover:bg-muted/80 text-muted-foreground' : ''}
                            ${idx === 4 ? 'bg-muted-foreground/20 hover:bg-muted-foreground/30 text-foreground' : ''}
                            ${isSelected ? 'ring-4 ring-offset-2 ring-primary/30 scale-105' : ''}
                          `}
                        >
                          {opt.text}
                        </Button>
                      );
                    });
                  })()
                ) : (
                  answerOptions.map((option, index) => {
                    const isSelected = selectedOption === option.value;
                    return (
                      <Button
                        key={option.value}
                        onClick={() => {
                          // select but do not advance
                          setSelectedOption(option.value);
                          // optimistic local save so selection persists if user navigates away
                          // (but do not auto-advance)
                          // don't call saveNonAdhdAnswer here to allow user to change before Next
                        }}
                        className={`
                          h-20 text-lg font-semibold rounded-2xl transition-all
                          hover:scale-105 hover:shadow-lg animate-pop-in
                          ${index === 0 ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/50' : ''}
                          ${index === 1 ? 'bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-accent/50' : ''}
                          ${index === 2 ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:shadow-secondary/50' : ''}
                          ${index === 3 ? 'bg-muted hover:bg-muted/80 text-muted-foreground' : ''}
                          ${isSelected ? 'ring-4 ring-offset-2 ring-primary/30 scale-105' : ''}
                        `}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {t.screening[option.label]}
                      </Button>
                    );
                  })
                )}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between mt-6">
                <Button variant="ghost" onClick={onPrevious} disabled={displayCurrent === 1}>
                  {(t.screening as any).previous || 'Previous'}
                </Button>

                <Button onClick={onNext} disabled={(isAdhdMode || isDyslexiaParentMode || isDyslexiaChildMode) ? !adhdSelectedOption : !selectedOption}>
                  {isLast ? ((t.screening as any).submit || 'Submit') : ((t.screening as any).next || 'Next')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Screening;
