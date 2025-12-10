import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Baby, ArrowLeft, User, Users, School, GraduationCap } from 'lucide-react';

const TestDyslexiaChild = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const categories = [
    {
      id: 'age-4-6',
      title: 'Age 4-6',
      description: 'Early childhood dyslexia screening',
      icon: Baby,
      color: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30',
      iconColor: 'text-blue-500'
    },
    {
      id: 'age-6-10',
      title: 'Age 6-10',
      description: 'Elementary age dyslexia assessment',
      icon: User,
      color: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30',
      iconColor: 'text-green-500'
    },
    {
      id: 'age-10-16',
      title: 'Age 10-16',
      description: 'Middle to high school screening',
      icon: School,
      color: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30',
      iconColor: 'text-purple-500'
    },
    {
      id: 'age-16-plus',
      title: 'Age 16+',
      description: 'Young adult and adult assessment',
      icon: GraduationCap,
      color: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30',
      iconColor: 'text-orange-500'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/screening?category=dyslexia-child-${categoryId}`);
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
              <Baby className="w-6 h-6 md:w-8 md:h-8 text-accent flex-shrink-0" />
              <h1 className="text-lg md:text-2xl font-bold gradient-text truncate">Dyslexia Child Test</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-pop-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3 md:mb-4">
              Select Age Group
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Choose the appropriate age category for the most accurate assessment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-pop-in" style={{ animationDelay: '0.1s' }}>
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`glass-card cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${category.color}`}
                  onClick={() => handleCategorySelect(category.id)}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 rounded-xl flex-shrink-0 ${category.color}`}>
                        <Icon className={`w-6 h-6 md:w-8 md:h-8 ${category.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-lg md:text-xl">{category.title}</CardTitle>
                        <CardDescription className="mt-1 text-xs md:text-sm">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full glass-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(category.id);
                      }}
                    >
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestDyslexiaChild;
