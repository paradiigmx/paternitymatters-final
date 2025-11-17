import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission (e.g., send to an API)
        console.log('Form submitted:', formState);
        setSubmitted(true);
    };

    return (
        <div className="py-16 md:py-24 bg-light-bg">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-dark-blue font-serif">Get In Touch</h1>
                    <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Have questions or need a case evaluation? Reach out to us. We're here to help.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                    {/* Contact Form */}
                    <div className="lg:w-2/3">
                        <h2 className="text-2xl font-bold text-dark-blue mb-6">Send Us a Message</h2>
                        {submitted ? (
                            <div className="bg-green-100 border-l-4 border-primary-green text-green-800 p-4 rounded-xl" role="alert">
                                <p className="font-bold">Thank You!</p>
                                <p>Your message has been sent. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder="Your Name" value={formState.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                                    <input type="email" name="email" placeholder="Your Email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                                </div>
                                <div>
                                    <input type="text" name="subject" placeholder="Subject" value={formState.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                                </div>
                                <div>
                                    <textarea name="message" placeholder="Your Message" rows={6} value={formState.message} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"></textarea>
                                </div>
                                <button type="submit" className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]">Send Message</button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-bold text-dark-blue mb-6">Contact Information</h2>
                        <div className="space-y-4 text-gray-700">
                            <p><strong>Email:</strong> <a href="mailto:info@publicbar.org" className="text-primary-blue hover:underline">info@publicbar.org</a></p>
                        </div>
                    </div>
                </div>

                 {/* Newsletter Signup */}
                <section className="mt-20 bg-gradient-to-br from-dark-blue to-navy text-white p-8 md:p-12 rounded-2xl text-center">
                    <h2 className="text-3xl font-bold font-serif mb-4">Stay Informed</h2>
                    <p className="max-w-xl mx-auto mb-6">Sign up for our newsletter to receive legal alerts, success stories, and updates on fathers' rights.</p>
                    <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-orange" />
                        <button type="submit" className="bg-primary-orange text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 hover:opacity-95">Subscribe</button>
                    </form>
                </section>

            </div>
        </div>
    );
};

export default ContactPage;