import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Brain, Users, Baby, User, Mail, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const testSections = [
    {
      icon: Brain,
      title: 'ADHD Screening Test',
      description: 'Comprehensive ADHD assessment for adults and teens',
      route: '/test/adhd',
      color: 'from-primary to-accent',
    },
    {
      icon: Users,
      title: 'Dyslexia Parent Test',
      description: 'Dyslexia screening for parents to assess their children',
      route: '/test/dyslexia-parent',
      color: 'from-secondary to-accent',
    },
    {
      icon: Baby,
      title: 'Dyslexia Children Test',
      description: 'Interactive dyslexia assessment designed for children',
      route: '/test/dyslexia-child',
      color: 'from-accent to-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-text">STAAD</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/profile')}
              className="glass-button"
            >
              <User className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="glass-button"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 md:mb-12 animate-pop-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 gradient-text break-words px-2">
            Welcome, {user?.email?.split('@')[0]}!
          </h2>
          <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto animate-slide-in-left px-2">
            Choose a screening test below to begin your assessment journey
          </p>
        </div>

        {/* Test Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {testSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="glass-card p-6 md:p-8 hover:scale-105 hover:animate-float transition-all duration-500 cursor-pointer group animate-slide-in-right overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
                onClick={() => navigate(section.route)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${section.color} p-3 md:p-4 mb-3 md:mb-4 group-hover:shadow-lg transition-all duration-300 relative z-10`}>
                  <Icon className="w-full h-full text-background" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground relative z-10">
                  {section.title}
                </h3>
                <p className="text-sm md:text-base text-foreground/70 mb-3 md:mb-4 relative z-10">
                  {section.description}
                </p>
                <Button className="w-full glass-button hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 relative z-10 text-sm md:text-base py-5 md:py-6">
                  Start Test
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Additional Actions */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto animate-pop-in" style={{ animationDelay: '450ms' }}>
          <Card
            className="glass-card p-4 md:p-6 hover:scale-105 hover:animate-float transition-all duration-300 cursor-pointer group overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
            onClick={() => navigate('/profile')}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center gap-3 md:gap-4 relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:shadow-lg flex-shrink-0">
                <User className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground">View Profile</h3>
                <p className="text-foreground/70 text-xs md:text-sm">Manage your account and test history</p>
              </div>
            </div>
          </Card>

          <Card
            className="glass-card p-4 md:p-6 hover:scale-105 hover:animate-float transition-all duration-300 cursor-pointer group overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
            onClick={() => navigate('/contact')}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center gap-3 md:gap-4 relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-all duration-300 group-hover:shadow-lg flex-shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground">Contact Us</h3>
                <p className="text-foreground/70 text-xs md:text-sm">Get support and assistance</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
