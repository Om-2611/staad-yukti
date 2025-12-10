import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Brain, ArrowLeft, Mail, Calendar, FileText } from 'lucide-react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface UserProfile {
  email: string;
  createdAt: string;
}

interface TestResult {
  id: string;
  testType: string;
  completedAt: string;
  scores: Record<string, number>;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Fetch user profile
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        }

        // Fetch test history
        const testsQuery = query(
          collection(db, 'testResults'),
          where('userId', '==', user.uid)
        );
        const testsSnapshot = await getDocs(testsQuery);
        const tests = testsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as TestResult[];
        
        setTestHistory(tests.sort((a, b) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        ));
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-foreground mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              <h1 className="text-2xl font-bold gradient-text">STAAD</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="glass-card p-6 md:p-8 mb-6 md:mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl md:text-4xl font-bold text-background flex-shrink-0">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 text-center sm:text-left min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2 break-words">
                  {user?.email?.split('@')[0]}
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-foreground/70 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{profile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Joined {new Date(profile?.createdAt || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Test History */}
          <Card className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Test History</h3>
            </div>

            {testHistory.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-foreground/70 text-base md:text-lg">No tests completed yet</p>
                <Button 
                  className="mt-4 glass-button"
                  onClick={() => navigate('/dashboard')}
                >
                  Take Your First Test
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {testHistory.map((test) => (
                  <div
                    key={test.id}
                    className="glass p-4 rounded-xl hover:bg-foreground/5 transition-colors cursor-pointer"
                    onClick={() => navigate(`/results?id=${test.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground capitalize truncate">
                          {test.testType} Test
                        </h4>
                        <p className="text-xs md:text-sm text-foreground/70">
                          Completed on {new Date(test.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" className="glass-button text-sm md:text-base self-start sm:self-auto">
                        View Results
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
