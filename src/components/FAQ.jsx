import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, BookOpen, Truck, CreditCard, RotateCcw, HelpCircle, Gift, Shield } from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // FAQ Categories
  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle size={18} /> },
    { id: 'ordering', name: 'Ordering', icon: <BookOpen size={18} /> },
    { id: 'shipping', name: 'Shipping & Delivery', icon: <Truck size={18} /> },
    { id: 'payment', name: 'Payment & Pricing', icon: <CreditCard size={18} /> },
    { id: 'returns', name: 'Returns & Refunds', icon: <RotateCcw size={18} /> },
    { id: 'gifting', name: 'Gifting', icon: <Gift size={18} /> },
    { id: 'account', name: 'Account & Privacy', icon: <Shield size={18} /> }
  ];

  // FAQ Questions and Answers
  const faqData = [
    {
      id: 1,
      category: 'ordering',
      question: 'How do I place an order on PageParadise?',
      answer: 'Placing an order on PageParadise is simple. Browse our catalog, click on the book you wish to purchase, and click "Add to Cart." You can continue shopping or proceed to checkout. At checkout, you\'ll need to provide your shipping details and payment information to complete your order.'
    },
    {
      id: 2,
      category: 'ordering',
      question: 'Can I order books that are not in stock?',
      answer: 'Yes, you can place pre-orders for books that are not yet in stock or are upcoming releases. These items will be clearly marked as "Pre-order" with an estimated arrival date. We\'ll ship your pre-ordered books as soon as they become available.'
    },
    {
      id: 3,
      category: 'ordering',
      question: 'Is there a limit to how many books I can order?',
      answer: 'There is no limit to the number of books you can order for personal use. However, for bulk orders (more than 20 copies of the same title), please contact our customer service for special pricing and shipping arrangements.'
    },
    {
      id: 4,
      category: 'ordering',
      question: 'How can I check the status of my order?',
      answer: 'You can check your order status by logging into your PageParadise account and visiting the "My Orders" section. You will also receive email updates when your order is processed, shipped, and delivered.'
    },
    {
      id: 5,
      category: 'shipping',
      question: 'What are the shipping costs?',
      answer: 'We offer free standard shipping on all orders above ₹499. For orders below ₹499, a flat shipping fee of ₹40 is applied. Express shipping is available at an additional cost, which varies based on your location and the weight of your package.'
    },
    {
      id: 6,
      category: 'shipping',
      question: 'How long will it take to receive my order?',
      answer: 'Standard shipping typically takes 3-5 business days within metro cities and 5-7 business days for other locations. Express shipping delivers within 1-2 business days in metro cities and 2-3 business days elsewhere. Please note that delivery times may vary during sale periods and holidays.'
    },
    {
      id: 7,
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to select international destinations. International shipping costs and delivery times vary based on the destination country. You can check if we ship to your country during checkout. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.'
    },
    {
      id: 8,
      category: 'shipping',
      question: 'Can I track my package?',
      answer: 'Yes, once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or directly through the courier\'s tracking portal.'
    },
    {
      id: 9,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards (Visa, Mastercard, RuPay), net banking, UPI, digital wallets (PayTM, PhonePe, Google Pay), and cash on delivery (for orders under ₹3000).'
    },
    {
      id: 10,
      category: 'payment',
      question: 'Is it safe to use my credit card on your website?',
      answer: 'Absolutely. PageParadise uses industry-standard SSL encryption to protect your personal and payment information. We are PCI DSS compliant, ensuring that your card details are handled according to the highest security standards.'
    },
    {
      id: 11,
      category: 'payment',
      question: 'When will my credit card be charged?',
      answer: 'Your credit card will be authorized when you place your order but will only be charged when your order ships. For pre-orders, your card will be charged when the book is ready to ship.'
    },
    {
      id: 12,
      category: 'payment',
      question: 'Do you offer any discounts or loyalty programs?',
      answer: 'Yes, we have several ways for you to save on our website. We offer seasonal discounts, a "Book of the Month" program with special pricing, and a loyalty program called "Paradise Points" where you earn points for every purchase that can be redeemed for discounts on future orders.'
    },
    {
      id: 13,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery for physical damage, printing defects, or if you received the wrong item. Books must be unused and in their original condition. Unfortunately, we cannot accept returns for digital books once they have been downloaded.'
    },
    {
      id: 14,
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'To initiate a return, log in to your account, go to "My Orders," select the order containing the item you wish to return, and click "Return Item." Follow the instructions to complete the return process. You will receive a return authorization and shipping instructions via email.'
    },
    {
      id: 15,
      category: 'returns',
      question: 'When will I receive my refund?',
      answer: 'Once we receive and inspect your return, we will process your refund within 2-3 business days. The refund will be issued to the original payment method used for the purchase. It may take an additional 5-7 business days for the refund to appear in your account, depending on your bank or payment provider.'
    },
    {
      id: 16,
      category: 'gifting',
      question: 'Can I send books as gifts?',
      answer: 'Yes, we offer a gifting service. During checkout, select the "This is a gift" option, and you can add a personalized message and gift wrapping for a small additional fee. We\'ll ship the book wrapped beautifully with your message included, and the receipt will not show the price.'
    },
    {
      id: 17,
      category: 'gifting',
      question: 'Do you offer gift cards?',
      answer: 'Yes, we offer digital gift cards in various denominations ranging from ₹500 to ₹5000. These can be sent via email to the recipient of your choice along with a personalized message. Gift cards are valid for one year from the date of issue.'
    },
    {
      id: 18,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner of our website. Enter your email address, create a password, and provide basic information. You can also sign up using your Google or Facebook account for quicker registration.'
    },
    {
      id: 19,
      category: 'account',
      question: 'How is my personal information protected?',
      answer: 'We take data protection very seriously. Your personal information is encrypted and stored securely. We do not sell or share your information with third parties except as necessary to fulfill your orders (such as sharing shipping details with our delivery partners). You can review our detailed Privacy Policy on our website.'
    },
    {
      id: 20,
      category: 'account',
      question: 'Can I update my account information?',
      answer: 'Yes, you can update your account information at any time by logging into your account and going to the "Account Settings" section. Here you can update your personal details, change your password, manage your address book, and update payment methods.'
    }
  ];

  // Toggle question expansion
  const toggleQuestion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter questions based on search and category
  const filteredQuestions = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about ordering, shipping, returns, and more. Can't find what you're looking for? Contact our support team.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>
        
        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ Questions */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                >
                  <span className="font-medium text-gray-800 text-lg">{item.question}</span>
                  {expandedQuestions[item.id] ? (
                    <ChevronUp className="text-orange-500 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                {expandedQuestions[item.id] && (
                  <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="mt-4 text-orange-500 font-medium hover:text-orange-600"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
        
        {/* Still Need Help */}
        <div className="mt-12 bg-orange-50 rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-orange-100 rounded-full p-4 flex-shrink-0">
              <HelpCircle size={32} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? Please chat with our friendly team.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                  Contact Support
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Email Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;