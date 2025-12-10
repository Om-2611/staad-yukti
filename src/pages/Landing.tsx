import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Sparkles, Target } from 'lucide-react';
import LiquidEther from '@/components/LiquidEther';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* LiquidEther Background */}
      <div className="absolute inset-0 -z-10">
        <LiquidEther
          colors={['#22c55e', '#10b981', '#34d399']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-3">
          <Brain className="w-10 h-10 text-primary animate-glow-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">STAAD</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button
            onClick={() => navigate('/auth')}
            className="bg-secondary hover:bg-secondary/90 text-foreground font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-secondary/50 transition-all hover:scale-105"
          >
            {t.landing.loginButton}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-pop-in">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              {t.landing.title.split('—')[0]}
              <span className="gradient-text block mt-2">
                {t.landing.title.split('—')[1]}
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t.landing.subtitle}
            </p>
          </div>

          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="flex flex-col items-center gap-2 p-6 glass rounded-2xl hover:scale-105 transition-transform">
              <Target className="w-12 h-12 text-primary" />
              <p className="text-sm font-medium">Early Detection</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 glass rounded-2xl hover:scale-105 transition-transform">
              <Sparkles className="w-12 h-12 text-accent" />
              <p className="text-sm font-medium">Intelligent Analysis</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 glass rounded-2xl hover:scale-105 transition-transform">
              <Brain className="w-12 h-12 text-secondary" />
              <p className="text-sm font-medium">Accessible Platform</p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/auth')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105 animate-glow-pulse mt-8"
          >
            Get Started →
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-foreground/60">
        <p>© 2025 STAAD. Empowering learners through early awareness.</p>
      </footer>
    </div>
  );
};

export default Landing;
