import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    bootcamps: [
      { name: 'Développement Web', href: '/bootcamps/web-development' },
      { name: 'Data Science', href: '/bootcamps/data-science' },
      { name: 'Mobile Development', href: '/bootcamps/mobile-development' },
      { name: 'DevOps', href: '/bootcamps/devops' },
    ],
    entreprise: [
      { name: 'À propos', href: '/about' },
      { name: 'Notre équipe', href: '/team' },
      { name: 'Carrières', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Centre d\'aide', href: '/help' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Conditions d\'utilisation', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/xarala' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/xarala' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/xarala' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/xarala' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Xarala</span>
            </div>
            <p className="text-gray-300 mb-6">
              Formez-vous aux métiers du numérique avec nos bootcamps intensifs. 
              Développez vos compétences et accédez à des carrières passionnantes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>contact@xarala.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+221 33 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          {/* Bootcamps */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Bootcamps</h3>
            <ul className="space-y-2">
              {footerLinks.bootcamps.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">Restez informé</h3>
            <p className="text-gray-300 mb-4">
              Recevez nos dernières actualités et offres spéciales.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l-lg border-0 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-orange focus:outline-none"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-primary-orange to-primary-pink text-white font-semibold rounded-r-lg hover:shadow-lg transition-all duration-200">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Xarala. Tous droits réservés.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-orange transition-colors duration-200"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 