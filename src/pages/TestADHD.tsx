import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Brain, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import adhdQuestions from '@/lib/adhdQuestions';
import { useEffect } from 'react';

const TestADHD = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  if (!selected) {
    return (
      <div className="min-h-screen bg-background">
        <header className="glass-card border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="glass-button"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold gradient-text">ADHD</h1>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="glass-card p-6 md:p-8 text-center">
              <Brain className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold gradient-text mb-4">
                {t.adhd.chooseSubcategory}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6">
                <Button onClick={() => setSelected('inattentive')} className="py-5 md:py-6 text-sm md:text-base">{t.adhd.subcategories.inattentive} — {adhdQuestions.inattentive.behavioralQuestions.length + adhdQuestions.inattentive.performanceQuestions.length} questions</Button>
                <Button onClick={() => setSelected('hyperactive')} className="py-5 md:py-6 text-sm md:text-base">{t.adhd.subcategories.hyperactive} — {adhdQuestions.hyperactive.behavioralQuestions.length + adhdQuestions.hyperactive.performanceQuestions.length} questions</Button>
                <Button onClick={() => setSelected('oppositional')} className="py-5 md:py-6 text-sm md:text-base">{t.adhd.subcategories.oppositional} — {adhdQuestions.oppositional.behavioralQuestions.length + adhdQuestions.oppositional.performanceQuestions.length} questions</Button>
                <Button onClick={() => setSelected('conduct')} className="py-5 md:py-6 text-sm md:text-base">{t.adhd.subcategories.conduct} — {adhdQuestions.conduct.behavioralQuestions.length + adhdQuestions.conduct.performanceQuestions.length} questions</Button>
                <Button onClick={() => setSelected('anxiety')} className="py-5 md:py-6 text-sm md:text-base sm:col-span-2">{t.adhd.subcategories.anxiety} — {adhdQuestions.anxiety.behavioralQuestions.length + adhdQuestions.anxiety.performanceQuestions.length} questions</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Placeholder for the actual subtest; we'll route to Screening with a category param
  // For now show a simple placeholder with a back button
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelected(null)}
              className="glass-button"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-text">{t.adhd.subcategories[selected as keyof typeof t.adhd.subcategories]}</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold gradient-text mb-4">{t.adhd.subcategories[selected as keyof typeof t.adhd.subcategories]}</h2>
            <p className="text-foreground/70 mb-8">Subtest for {t.adhd.subcategories[selected as keyof typeof t.adhd.subcategories]} will start here.</p>
            <Button onClick={() => navigate(`/screening?category=adhd-${selected}`)} className="mt-4">Start {t.adhd.subcategories[selected as keyof typeof t.adhd.subcategories]}</Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TestADHD;
