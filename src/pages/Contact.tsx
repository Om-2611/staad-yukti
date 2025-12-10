import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Brain, ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
              to_email: 'guptaom2622611@gmail.com'
            },
            publicKey
          );
          toast.success('Message sent successfully! We\'ll get back to you soon.');
          setFormData({ name: '', email: user?.email || '', subject: '', message: '' });
        } catch (emailError: any) {
          console.error('EmailJS error:', emailError);
          // If EmailJS fails, fall back to mailto
          throw new Error('EmailJS failed');
        }
      } else {
        // No EmailJS config, use mailto
        throw new Error('No EmailJS config');
      }
    } catch (error) {
      // Fallback to mailto link
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from STAAD Contact Form
      `.trim();

      const mailtoLink = `mailto:guptaom2622611@gmail.com?subject=${encodeURIComponent(`STAAD Contact: ${formData.subject}`)}&body=${encodeURIComponent(emailBody)}`;
      
      try {
        window.location.href = mailtoLink;
        toast.success('Opening your email client...', {
          description: 'If your email client doesn\'t open, please email us directly at guptaom2622611@gmail.com'
        });
        setFormData({ name: '', email: user?.email || '', subject: '', message: '' });
      } catch (mailtoError) {
        toast.error('Unable to send email automatically', {
          description: 'Please email us directly at guptaom2622611@gmail.com'
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

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
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <p className="text-foreground/80 text-lg">
              Have questions? We're here to help and support you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="glass-button mt-2"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="glass-button mt-2"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="glass-button mt-2"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="glass-button mt-2 min-h-32"
                    placeholder="Your message..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={submitting}
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a 
                      href="mailto:guptaom2622611@gmail.com" 
                      className="text-foreground/70 hover:text-primary transition-colors underline"
                    >
                      guptaom2622611@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <a 
                      href="tel:+918789418998" 
                      className="text-foreground/70 hover:text-secondary transition-colors block"
                    >
                      +91 8789418998 | Om Kumar Gupta
                    </a>
                    <a 
                      href="tel:+918889978781" 
                      className="text-foreground/70 hover:text-secondary transition-colors block"
                    >
                      +91 8889978781 | Ananya Dixit
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Office</h4>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Hyderabad+Institute+of+Technology+and+Management+Gandimaisamma+Medchal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-accent transition-colors"
                    >
                      <p className="text-foreground/70">Hyderabad Institute of Technology and Management</p>
                      <p className="text-foreground/70">Gandimaisamma Medchal Checkpost Road</p>
                      <p className="text-foreground/70">Basuragadi Village, Hyderabad</p>
                      <p className="text-foreground/70">Telangana 501401</p>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                <h4 className="font-semibold text-foreground mb-2">Quick Response</h4>
                <p className="text-foreground/70 text-sm">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call our support line.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
