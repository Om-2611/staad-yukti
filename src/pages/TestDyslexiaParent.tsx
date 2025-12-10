import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Users, ArrowLeft, BookOpen, Brain } from 'lucide-react';

const TestDyslexiaParent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const subcategories = [
    {
      id: 'basic',
      title: 'Basic Dyslexia Screening',
      description: 'Quick screening test with essential questions for initial assessment',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'comprehensive',
      title: 'Comprehensive Dyslexia Screening',
      description: 'In-depth evaluation with detailed questions for thorough assessment',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  const handleStart = (subcategoryId: string) => {
    navigate(`/screening?category=dyslexia-parent-${subcategoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="glass-button flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 min-w-0">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-secondary flex-shrink-0" />
              <h1 className="text-lg md:text-2xl font-bold gradient-text truncate">Dyslexia Parent Test</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <Users className="w-16 h-16 md:w-20 md:h-20 text-secondary mx-auto mb-4 md:mb-6 animate-glow-pulse" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3 md:mb-4">
              Choose Assessment Type
            </h2>
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
              Select the type of dyslexia screening that best suits your needs. 
              Basic screening is quick, while comprehensive provides detailed insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {subcategories.map((sub, index) => {
              const Icon = sub.icon;
              return (
                <Card
                  key={sub.id}
                  className="glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleStart(sub.id)}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold gradient-text mb-2 md:mb-3">
                    {sub.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-foreground/70 mb-4 md:mb-6 leading-relaxed">
                    {sub.description}
                  </p>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${sub.color} ${sub.hoverColor} text-white font-semibold py-5 md:py-6 rounded-xl transition-all hover:scale-105 text-sm md:text-base`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStart(sub.id);
                    }}
                  >
                    Start Assessment
                  </Button>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 p-6 glass-card rounded-xl text-center">
            <p className="text-sm text-foreground/60">
              💡 <strong>Tip:</strong> If you're unsure, start with the Basic screening. 
              You can always take the Comprehensive assessment later for more detailed results.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestDyslexiaParent;
