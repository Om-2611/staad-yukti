import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'en' as const, flag: '🇬🇧', label: 'English' },
  { code: 'hi' as const, flag: '🇮🇳', label: 'हिंदी' },
  { code: 'te' as const, flag: '🇹🇱', label: 'తెలుగు' },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className={`text-2xl transition-all hover:scale-110 ${
            language === lang.code ? 'animate-glow-pulse' : ''
          }`}
          title={lang.label}
        >
          {lang.flag}
        </Button>
      ))}
    </div>
  );
};
