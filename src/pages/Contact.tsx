import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Tag, Comment, Send, CheckCircle, Loader } from 'lucide-react';
import { ContactFormData } from '../types';

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (formData.message.length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send to backend
      const response = await fetch('http://localhost:3000/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="pt-19 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-poppins font-bold mb-6">
            Contact <span className="gradient-text">Me</span>
          </h1>
          
          <p className="text-text-muted text-lg mb-12">
            Send me a message. I'll verify your email and respond within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 neon-shadow"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-semibold mb-2">
              <User size={18} />
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              minLength={2}
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-light/12 outline-none focus:border-neon-cyan"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-semibold mb-2">
              <Mail size={18} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-light/12 outline-none focus:border-neon-cyan"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone (Optional) */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-semibold mb-2">
              <Phone size={18} />
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+95 9 XXXX XXX XX"
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-light/12 outline-none focus:border-neon-cyan"
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-semibold mb-2">
              <Tag size={18} />
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project inquiry, collaboration, etc."
              minLength={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-light/12 outline-none focus:border-neon-cyan"
            />
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="flex items-center gap-2 font-semibold mb-2">
              <Comment size={18} />
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline, and requirements..."
              minLength={20}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-light/12 outline-none focus:border-neon-cyan resize-none"
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-bg-dark bg-gradient-to-r from-neon-cyan to-neon-pink disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin" />
                Verifying Email...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>

          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-neon-green/12 border border-neon-green/30 flex items-center gap-3"
            >
              <CheckCircle size={24} className="text-neon-green" />
              <div>
                <p className="font-bold text-neon-green">Verification email sent!</p>
                <p className="text-sm text-text-muted">
                  Check your inbox to confirm your email address.
                </p>
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
