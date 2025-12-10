import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { questions } from '@/lib/questions';
import { Brain, Download, RotateCcw, Home } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import adhdQuestions from '@/lib/adhdQuestions';
import dyslexiaParentQuestions from '@/lib/dyslexiaParentQuestions';
import dyslexiaChildQuestions from '@/lib/dyslexiaChildQuestions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type Answer = 'never' | 'sometimes' | 'often' | 'always';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, Answer> | null>(null);
  const [loading, setLoading] = useState(true);

  // answers may be either the simple answers map (non-ADHD) or a full payload (ADHD)
  const stateAnswers = location.state?.answers as any | undefined;
  const stateResultId = location.state?.resultId as string | undefined;
  
  // Also check for 'id' query parameter (from Profile page navigation)
  const searchParams = new URLSearchParams(location.search);
  const queryResultId = searchParams.get('id');
  
  const resultId = stateResultId || queryResultId;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadResults = async () => {
      if (resultId && !stateAnswers) {
        try {
          const docRef = doc(db, 'testResults', resultId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // data may be either full payload or { answers: map }
            setAnswers(data.answers ?? data);
          } else {
            toast.error('Test results not found');
            navigate('/profile');
          }
        } catch (error) {
          console.error('Error loading results:', error);
          toast.error('Failed to load test results');
        }
      } else if (stateAnswers) {
        // stateAnswers might be either the simple answers map or full payload
        if (stateAnswers.behavioralAnswers || stateAnswers.performanceAnswers) {
          // store the full payload in local state by keeping it in answers as-is
          setAnswers(stateAnswers as any);
        } else {
          setAnswers(stateAnswers as Record<number, Answer>);
        }
      }
      setLoading(false);
    };

    loadResults();
  }, [user, navigate, resultId, stateAnswers]);

  if (loading || !answers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-primary animate-glow-pulse mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  // Calculate scores by category
  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter((q) => q.category === category);
    const scoreMap = { never: 0, sometimes: 1, often: 2, always: 3 };
    
    let totalScore = 0;
    categoryQuestions.forEach((q) => {
      const answer = answers[q.id];
      if (answer) {
        totalScore += scoreMap[answer];
      }
    });

    const maxScore = categoryQuestions.length * 3;
    return Math.round((totalScore / maxScore) * 100);
  };

  const chartData = [
    {
      category: t.results.categories.focus,
      value: calculateCategoryScore('focus'),
    },
    {
      category: t.results.categories.reading,
      value: calculateCategoryScore('reading'),
    },
    {
      category: t.results.categories.writing,
      value: calculateCategoryScore('writing'),
    },
    {
      category: t.results.categories.processing,
      value: calculateCategoryScore('processing'),
    },
  ];

  // Detect ADHD payload and extract positive/negative flags
  const payload = answers as any;
  const isAdhdPayload = !!(payload && typeof payload === 'object' && payload.category && String(payload.category).startsWith('adhd-'));
  const isDyslexiaParentPayload = !!(payload && typeof payload === 'object' && payload.category && String(payload.category).startsWith('dyslexia-parent-'));
  const isDyslexiaChildPayload = !!(payload && typeof payload === 'object' && payload.category && String(payload.category).startsWith('dyslexia-child-'));
  
  const adhdSubcategory = isAdhdPayload ? String(payload.category).split('adhd-')[1] : null;
  const dyslexiaParentSubcategory = isDyslexiaParentPayload ? String(payload.category).split('dyslexia-parent-')[1] : null;
  const dyslexiaChildSubcategory = isDyslexiaChildPayload ? String(payload.category).split('dyslexia-child-')[1] : null;
  
  const behavioralPositive = isAdhdPayload ? Boolean(payload.behavioralPositive) : null;
  const performancePositive = isAdhdPayload ? Boolean(payload.performancePositive) : null;
  const overallPositive = isAdhdPayload 
    ? Boolean(payload.overallPositive) 
    : (isDyslexiaParentPayload || isDyslexiaChildPayload) 
    ? Boolean(payload.positive) 
    : null;

  const handleDownload = () => {
    // Create a professional PDF with detailed answers
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 50;
      const contentWidth = pageWidth - (margin * 2);
      let y = margin;
      const lineHeight = 18;

      // Helper function to add new page with consistent header
      const addPageWithHeader = () => {
        doc.addPage();
        y = margin;
        // Add subtle header on new pages
        doc.setFillColor(79, 70, 229); // Primary color
        doc.rect(0, 0, pageWidth, 8, 'F');
      };

      // Check if we need a new page
      const checkNewPage = (spaceNeeded: number) => {
        if (y + spaceNeeded > pageHeight - margin) {
          addPageWithHeader();
        }
      };

      // Professional Header with colored banner
      doc.setFillColor(79, 70, 229); // Primary color
      doc.rect(0, 0, pageWidth, 80, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(32);
      doc.setFont('helvetica', 'bold');
      doc.text('STAAD', margin, 45);
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Screening Tool for ADHD and Dyslexia', margin, 65);
      
      y = 100;

      // Document Info Section
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(margin, y, contentWidth, 60, 5, 5, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text('Assessment Report', margin + 15, y + 20);
      doc.text('Generated:', margin + 15, y + 40);
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      const dateStr = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.text(dateStr, margin + 90, y + 40);
      
      y += 80;

      // If ADHD payload
      const payload: any = answers;
      if (payload && (payload.behavioralAnswers || payload.performanceAnswers)) {
        checkNewPage(100);
        
        // Category Title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(79, 70, 229);
        const categoryName = (payload.category || 'ADHD').replace('adhd-', '').replace(/-/g, ' ').toUpperCase();
        doc.text(`ADHD Assessment: ${categoryName}`, margin, y);
        y += 30;

        // Results Summary Box
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(margin, y, contentWidth, 90, 5, 5, 'F');
        doc.setDrawColor(191, 219, 254);
        doc.setLineWidth(1);
        doc.roundedRect(margin, y, contentWidth, 90, 5, 5, 'S');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Assessment Summary', margin + 15, y + 25);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(`Behavioral Score: ${payload.behavioralTotal || 0}`, margin + 15, y + 45);
        doc.text(`Performance Score: ${payload.performanceTotal || 0}`, margin + 15, y + 65);
        
        const isPositive = payload.overallPositive;
        doc.setFont('helvetica', 'bold');
        if (isPositive) {
          doc.setTextColor(220, 38, 38);
        } else {
          doc.setTextColor(34, 197, 94);
        }
        doc.text(`Result: ${isPositive ? 'POSITIVE' : 'NEGATIVE'}`, margin + contentWidth - 150, y + 55);
        
        y += 110;

        // Behavioral Questions Section
        checkNewPage(80);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Behavioral Questions', margin, y);
        y += 25;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const beh = (payload.behavioralAnswers || {}) as Record<string, { text: string; score: number }>;
        let qNum = 1;
        for (const id in beh) {
          const a = beh[id] as { text: string; score: number };
          const qText = (() => {
            const sub = payload.category?.split('adhd-')[1] ?? '';
            const qobj = adhdQuestions[sub]?.behavioralQuestions.find((q) => q.id === id);
            return qobj?.text ?? id;
          })();
          
          checkNewPage(lineHeight * 5);
          
          // Question box
          doc.setFillColor(250, 250, 250);
          const boxHeight = 45;
          doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'F');
          
          doc.setFont('helvetica', 'bold');
          doc.text(`Q${qNum}.`, margin + 10, y + 15);
          doc.setFont('helvetica', 'normal');
          const qSplitted = doc.splitTextToSize(qText, contentWidth - 50);
          doc.text(qSplitted, margin + 35, y + 15);
          
          doc.setTextColor(79, 70, 229);
          doc.setFont('helvetica', 'bold');
          doc.text(`Answer: ${a.text}`, margin + 10, y + 32);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(`(Score: ${a.score})`, margin + contentWidth - 80, y + 32);
          doc.setTextColor(0, 0, 0);
          
          y += boxHeight + 8;
          qNum++;
        }

        // Performance Questions Section
        y += 15;
        checkNewPage(80);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Performance Questions', margin, y);
        y += 25;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const perf = (payload.performanceAnswers || {}) as Record<string, { text: string; score: number }>;
        qNum = 1;
        for (const id in perf) {
          const a = perf[id] as { text: string; score: number };
          const qText = (() => {
            const sub = payload.category?.split('adhd-')[1] ?? '';
            const qobj = adhdQuestions[sub]?.performanceQuestions.find((q) => q.id === id);
            return qobj?.text ?? id;
          })();
          
          checkNewPage(lineHeight * 5);
          
          // Question box
          doc.setFillColor(250, 250, 250);
          const boxHeight = 45;
          doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'F');
          
          doc.setFont('helvetica', 'bold');
          doc.text(`Q${qNum}.`, margin + 10, y + 15);
          doc.setFont('helvetica', 'normal');
          const qSplitted = doc.splitTextToSize(qText, contentWidth - 50);
          doc.text(qSplitted, margin + 35, y + 15);
          
          doc.setTextColor(79, 70, 229);
          doc.setFont('helvetica', 'bold');
          doc.text(`Answer: ${a.text}`, margin + 10, y + 32);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(`(Score: ${a.score})`, margin + contentWidth - 80, y + 32);
          doc.setTextColor(0, 0, 0);
          
          y += boxHeight + 8;
          qNum++;
        }
      } else if (payload && payload.category && String(payload.category).startsWith('dyslexia-parent-')) {
        // Dyslexia Parent payload
        checkNewPage(100);
        
        const sub = String(payload.category).split('dyslexia-parent-')[1];
        
        // Category Title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(79, 70, 229);
        doc.text(`Dyslexia Parent Assessment: ${sub.toUpperCase()}`, margin, y);
        y += 30;

        // Results Summary Box
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(margin, y, contentWidth, 70, 5, 5, 'F');
        doc.setDrawColor(191, 219, 254);
        doc.setLineWidth(1);
        doc.roundedRect(margin, y, contentWidth, 70, 5, 5, 'S');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Assessment Summary', margin + 15, y + 25);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(`Total Score: ${payload.total || 0}`, margin + 15, y + 45);
        
        const isPositive = payload.positive;
        doc.setFont('helvetica', 'bold');
        if (isPositive) {
          doc.setTextColor(220, 38, 38);
        } else {
          doc.setTextColor(34, 197, 94);
        }
        doc.text(`Result: ${isPositive ? 'POSITIVE' : 'NEGATIVE'}`, margin + contentWidth - 150, y + 45);
        
        y += 90;

        // Questions Section
        checkNewPage(80);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Question Responses', margin, y);
        y += 25;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const dyslexiaAnswers = (payload.answers || {}) as Record<string, { text: string; score: number }>;
        const questionsData = sub === 'basic' 
          ? dyslexiaParentQuestions.basic.questions 
          : dyslexiaParentQuestions.comprehensive.questions;
        
        let qNum = 1;
        for (const q of questionsData) {
          const ans = dyslexiaAnswers[q.id];
          if (ans) {
            checkNewPage(lineHeight * 5);
            
            // Question box
            doc.setFillColor(250, 250, 250);
            const boxHeight = 45;
            doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'F');
            
            doc.setFont('helvetica', 'bold');
            doc.text(`Q${qNum}.`, margin + 10, y + 15);
            doc.setFont('helvetica', 'normal');
            const qSplitted = doc.splitTextToSize(q.text, contentWidth - 50);
            doc.text(qSplitted, margin + 35, y + 15);
            
            doc.setTextColor(79, 70, 229);
            doc.setFont('helvetica', 'bold');
            doc.text(`Answer: ${ans.text}`, margin + 10, y + 32);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 116, 139);
            doc.text(`(Score: ${ans.score})`, margin + contentWidth - 80, y + 32);
            doc.setTextColor(0, 0, 0);
            
            y += boxHeight + 8;
            qNum++;
          }
        }
      } else if (payload && payload.category && String(payload.category).startsWith('dyslexia-child-')) {
        // Dyslexia Child payload with Time Metrics
        checkNewPage(100);
        
        const sub = String(payload.category).split('dyslexia-child-')[1];
        
        // Category Title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(79, 70, 229);
        doc.text(`Dyslexia Child Assessment: ${sub.replace(/-/g, ' ').toUpperCase()}`, margin, y);
        y += 30;

        // Results Summary Box with Time Metrics
        doc.setFillColor(254, 243, 199); // Warm yellow background
        doc.roundedRect(margin, y, contentWidth, 145, 5, 5, 'F');
        doc.setDrawColor(251, 191, 36);
        doc.setLineWidth(2);
        doc.roundedRect(margin, y, contentWidth, 145, 5, 5, 'S');
        
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Assessment Summary (Time-Based Analysis)', margin + 15, y + 25);
        
        // Create a grid layout for metrics
        const col1X = margin + 15;
        const col2X = margin + (contentWidth / 2) + 10;
        let metricsY = y + 50;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        
        // Left column
        doc.text('Correct Answers:', col1X, metricsY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(34, 197, 94);
        doc.text(`${payload.totalCorrect || 0} / 20`, col1X + 110, metricsY);
        
        metricsY += 20;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Incorrect Answers:', col1X, metricsY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(220, 38, 38);
        doc.text(`${payload.totalIncorrect || 0}`, col1X + 110, metricsY);
        
        // Right column
        metricsY = y + 50;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Slow Responses:', col2X, metricsY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(234, 88, 12);
        doc.text(`${payload.slowResponseCount || 0}`, col2X + 100, metricsY);
        
        metricsY += 20;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Average Time:', col2X, metricsY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(59, 130, 246);
        doc.text(`${payload.avgTimePerQuestion ? payload.avgTimePerQuestion.toFixed(1) : 'N/A'}s`, col2X + 100, metricsY);
        
        // Overall result at the bottom
        metricsY = y + 110;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        const isPositive = payload.positive;
        if (isPositive) {
          doc.setTextColor(220, 38, 38);
        } else {
          doc.setTextColor(34, 197, 94);
        }
        const resultText = `Overall Result: ${isPositive ? 'POSITIVE' : 'NEGATIVE'}`;
        const resultWidth = doc.getTextWidth(resultText);
        doc.text(resultText, margin + (contentWidth - resultWidth) / 2, metricsY);
        
        y += 165;
        
        // Description Section
        if (payload.description) {
          checkNewPage(80);
          doc.setFillColor(243, 244, 246);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text('Assessment Analysis', margin, y);
          y += 20;
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(51, 65, 85);
          const descSplitted = doc.splitTextToSize(payload.description, contentWidth - 30);
          doc.setFillColor(243, 244, 246);
          const descHeight = (descSplitted.length * lineHeight) + 25;
          doc.roundedRect(margin, y, contentWidth, descHeight, 3, 3, 'F');
          doc.text(descSplitted, margin + 15, y + 18);
          y += descHeight + 15;
        }
        
        // Questions Section with Time Information
        checkNewPage(80);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Detailed Question Responses', margin, y);
        y += 10;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 116, 139);
        doc.text('(✓ = Correct, ✗ = Incorrect | Response time shown)', margin, y);
        y += 20;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const dyslexiaAnswers = (payload.answers || {}) as Record<string, { text: string; score: number; timeTaken?: number }>;
        const questionsData = dyslexiaChildQuestions[sub]?.questions || [];
        
        let qNum = 1;
        for (const q of questionsData) {
          const ans = dyslexiaAnswers[q.id];
          if (ans) {
            checkNewPage(60);
            
            // Question box with time indicator
            const isCorrect = ans.score === 1;
            if (isCorrect) {
              doc.setFillColor(240, 253, 244);
              doc.setDrawColor(134, 239, 172);
            } else {
              doc.setFillColor(254, 242, 242);
              doc.setDrawColor(252, 165, 165);
            }
            
            const boxHeight = 52;
            doc.setLineWidth(1);
            doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'FD');
            
            // Correct/Incorrect indicator
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            if (isCorrect) {
              doc.setTextColor(34, 197, 94);
              doc.text('✓', margin + 8, y + 15);
            } else {
              doc.setTextColor(220, 38, 38);
              doc.text('✗', margin + 8, y + 15);
            }
            
            // Question number and text
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.text(`Q${qNum}.`, margin + 22, y + 15);
            doc.setFont('helvetica', 'normal');
            const qSplitted = doc.splitTextToSize(q.text, contentWidth - 180);
            doc.text(qSplitted, margin + 42, y + 15);
            
            // Time indicator
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(59, 130, 246);
            const timeStr = ans.timeTaken ? `${ans.timeTaken.toFixed(1)}s` : 'N/A';
            doc.text(timeStr, margin + contentWidth - 50, y + 15);
            
            // Answer
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(79, 70, 229);
            doc.text('Answer:', margin + 22, y + 32);
            doc.setFont('helvetica', 'bold');
            const ansSplitted = doc.splitTextToSize(ans.text, contentWidth - 100);
            doc.text(ansSplitted, margin + 65, y + 32);
            
            y += boxHeight + 6;
            qNum++;
          }
        }
      } else {
        // Generic screening test
        checkNewPage(100);
        
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(79, 70, 229);
        doc.text('General Screening Assessment', margin, y);
        y += 30;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Question Responses', margin, y);
        y += 25;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        let qNum = 1;
        for (const q of questions) {
          const ans = (answers as Record<number, Answer>)[q.id];
          const qText = q[ (navigator.language?.startsWith('hi') ? 'hi' : 'en') as 'en' | 'hi' | 'te' ] || q.en;
          
          checkNewPage(lineHeight * 5);
          
          // Question box
          doc.setFillColor(250, 250, 250);
          const boxHeight = 45;
          doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'F');
          
          doc.setFont('helvetica', 'bold');
          doc.text(`Q${qNum}.`, margin + 10, y + 15);
          doc.setFont('helvetica', 'normal');
          const qSplitted = doc.splitTextToSize(qText, contentWidth - 50);
          doc.text(qSplitted, margin + 35, y + 15);
          
          doc.setTextColor(79, 70, 229);
          doc.setFont('helvetica', 'bold');
          doc.text(`Answer: ${ans ?? 'N/A'}`, margin + 10, y + 32);
          doc.setTextColor(0, 0, 0);
          
          y += boxHeight + 8;
          qNum++;
        }
      }

      // Add professional footer on last page
      checkNewPage(80);
      y = pageHeight - 80;
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(1);
      doc.line(margin, y, pageWidth - margin, y);
      y += 15;
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text('This report is generated by STAAD - Screening Tool for ADHD and Dyslexia', margin, y);
      y += 15;
      doc.text('For professional diagnosis and consultation, please consult a healthcare provider.', margin, y);
      y += 15;
      doc.setFont('helvetica', 'normal');
      doc.text(`Report generated on: ${new Date().toLocaleString()}`, margin, y);

      doc.save('STAAD-Assessment-Report.pdf');
      } catch (err) {
      console.error('PDF generation failed', err);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

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
        <LanguageSwitcher />
      </header>

      {/* Results */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8 animate-pop-in">
          {/* Title */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t.results.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.results.feedback}
            </p>
          </div>

          {/* ADHD Subcategory Result Summary */}
          {isAdhdPayload && (
            <div className="space-y-6">
              {/* Overall Result - Large prominent card with glossy dark finish */}
              <Card className="border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl overflow-hidden relative">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-white">
                    Overall Result
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-slate-300">
                    ADHD Screening: <span className="font-semibold capitalize text-white">{adhdSubcategory}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center pb-8 relative z-10">
                  <div className={`
                    flex items-center gap-4 px-8 py-6 rounded-2xl text-2xl md:text-3xl font-bold
                    backdrop-blur-sm shadow-lg
                    ${overallPositive 
                      ? 'bg-gradient-to-br from-red-500/90 to-red-600/90 text-white border border-red-400/30' 
                      : 'bg-gradient-to-br from-green-500/90 to-green-600/90 text-white border border-green-400/30'
                    }
                  `}>
                    {overallPositive ? (
                      <>
                        <AlertCircle className="w-10 h-10" />
                        <span>POSITIVE</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-10 h-10" />
                        <span>NEGATIVE</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 mt-6 max-w-xl text-center leading-relaxed">
                    {overallPositive 
                      ? 'The screening indicates potential concerns. Please consult with a healthcare professional for comprehensive assessment.'
                      : 'The screening does not indicate significant concerns at this time. Continue monitoring and consult a professional if needed.'
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Detailed Breakdown</CardTitle>
                  <CardDescription>Component scores for this assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Behavioral Score */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      {behavioralPositive ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      )}
                      <div>
                        <div className="font-semibold">Behavioral Assessment</div>
                        <div className="text-sm text-muted-foreground">
                          Score: {payload.behavioralTotal || 0}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={behavioralPositive ? "destructive" : "default"}
                      className="text-sm px-3 py-1"
                    >
                      {behavioralPositive ? 'Positive' : 'Negative'}
                    </Badge>
                  </div>

                  {/* Performance Score */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      {performancePositive ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      )}
                      <div>
                        <div className="font-semibold">Performance Assessment</div>
                        <div className="text-sm text-muted-foreground">
                          Score: {payload.performanceTotal || 0}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={performancePositive ? "destructive" : "default"}
                      className="text-sm px-3 py-1"
                    >
                      {performancePositive ? 'Positive' : 'Negative'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Dyslexia Parent Result Summary */}
          {isDyslexiaParentPayload && (
            <div className="space-y-6">
              {/* Overall Result - Large prominent card with glossy dark finish */}
              <Card className="border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl overflow-hidden relative">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-white">
                    Overall Result
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-slate-300">
                    Dyslexia Parent Screening: <span className="font-semibold capitalize text-white">{dyslexiaParentSubcategory}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center pb-8 relative z-10">
                  <div className={`
                    flex items-center gap-4 px-8 py-6 rounded-2xl text-2xl md:text-3xl font-bold
                    backdrop-blur-sm shadow-lg
                    ${overallPositive 
                      ? 'bg-gradient-to-br from-red-500/90 to-red-600/90 text-white border border-red-400/30' 
                      : 'bg-gradient-to-br from-green-500/90 to-green-600/90 text-white border border-green-400/30'
                    }
                  `}>
                    {overallPositive ? (
                      <>
                        <AlertCircle className="w-10 h-10" />
                        <span>POSITIVE</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-10 h-10" />
                        <span>NEGATIVE</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 mt-6 max-w-xl text-center leading-relaxed">
                    {overallPositive 
                      ? 'The screening indicates potential concerns. Please consult with a healthcare professional for comprehensive assessment.'
                      : 'The screening does not indicate significant concerns at this time. Continue monitoring and consult a professional if needed.'
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Score Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Score Details</CardTitle>
                  <CardDescription>Assessment summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      {overallPositive ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      )}
                      <div>
                        <div className="font-semibold">Total Score</div>
                        <div className="text-sm text-muted-foreground">
                          Score: {payload.total || 0}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={overallPositive ? "destructive" : "default"}
                      className="text-sm px-3 py-1"
                    >
                      {overallPositive ? 'Positive' : 'Negative'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Dyslexia Child Result Summary */}
          {isDyslexiaChildPayload && (
            <div className="space-y-6">
              {/* Overall Result - Large prominent card with glossy dark finish */}
              <Card className="border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl overflow-hidden relative">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-white">
                    Overall Result
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-slate-300">
                    Dyslexia Child Screening: <span className="font-semibold capitalize text-white">{dyslexiaChildSubcategory?.replace(/-/g, ' ')}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center pb-8 relative z-10">
                  <div className={`
                    flex items-center gap-4 px-8 py-6 rounded-2xl text-2xl md:text-3xl font-bold
                    backdrop-blur-sm shadow-lg
                    ${overallPositive 
                      ? 'bg-gradient-to-br from-red-500/90 to-red-600/90 text-white border border-red-400/30' 
                      : 'bg-gradient-to-br from-green-500/90 to-green-600/90 text-white border border-green-400/30'
                    }
                  `}>
                    {overallPositive ? (
                      <>
                        <AlertCircle className="w-10 h-10" />
                        <span>POSITIVE</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-10 h-10" />
                        <span>NEGATIVE</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 mt-6 max-w-xl text-center leading-relaxed">
                    {payload.description || (overallPositive 
                      ? 'The screening indicates potential concerns. Please consult with a healthcare professional for comprehensive assessment.'
                      : 'The screening does not indicate significant concerns at this time. Continue monitoring and consult a professional if needed.'
                    )}
                  </p>
                </CardContent>
              </Card>

              {/* Score Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Score Details</CardTitle>
                  <CardDescription>Assessment summary with timing analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Correct Answers */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <div>
                        <div className="font-semibold">Correct Answers</div>
                        <div className="text-sm text-muted-foreground">
                          {payload.totalCorrect || 0} out of 20
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Incorrect Answers */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-6 h-6 text-red-500" />
                      <div>
                        <div className="font-semibold">Incorrect Answers</div>
                        <div className="text-sm text-muted-foreground">
                          {payload.totalIncorrect || 0} questions
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slow Responses */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                      <div>
                        <div className="font-semibold">Slow Responses</div>
                        <div className="text-sm text-muted-foreground">
                          {payload.slowResponseCount || 0} questions took longer than expected
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Average Time */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        ⏱️
                      </div>
                      <div>
                        <div className="font-semibold">Average Response Time</div>
                        <div className="text-sm text-muted-foreground">
                          {payload.avgTimePerQuestion ? `${payload.avgTimePerQuestion.toFixed(1)}s per question` : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overall Result Badge */}
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      {overallPositive ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      )}
                      <div>
                        <div className="font-semibold">Overall Assessment</div>
                        <div className="text-sm text-muted-foreground">
                          Based on accuracy and response time
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={overallPositive ? "destructive" : "default"}
                      className="text-sm px-3 py-1"
                    >
                      {overallPositive ? 'Positive' : 'Negative'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Non-ADHD Results - Keep chart for backward compatibility */}
          {!isAdhdPayload && !isDyslexiaParentPayload && !isDyslexiaChildPayload && (
            <Card className="p-8 md:p-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Assessment Results</h3>
                <p className="text-muted-foreground mt-2">
                  Your screening results across different categories
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {chartData.map((item) => (
                  <div key={item.category} className="text-center p-4 rounded-lg border bg-card">
                    <div className="text-3xl font-bold text-primary">{item.value}%</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.category}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              <Download className="w-5 h-5 mr-2" />
              {t.results.download}
            </Button>
            
            <Button
              onClick={() => navigate('/screening')}
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-6 rounded-full transition-all hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t.results.retake}
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-6 rounded-full transition-all hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              {t.results.home}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
