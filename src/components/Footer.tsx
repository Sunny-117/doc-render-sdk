/**
 * 页脚组件
 */

import React from 'react';

const Footer = ({ config, theme }) => {
  const currentYear = new Date().getFullYear();

  const renderCopyright = () => {
    if (config.copyright === false) return null;

    const copyright = config.copyright || `© ${currentYear} ${config.title || 'Documentation'}`;
    
    return (
      <div className="doc-footer-copyright">
        {copyright}
      </div>
    );
  };

  const renderLinks = () => {
    if (!config.footerLinks || !Array.isArray(config.footerLinks)) return null;

    return (
      <div className="doc-footer-links">
        {config.footerLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target={link.external ? '_blank' : '_self'}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="doc-footer-link"
          >
            {link.text}
          </a>
        ))}
      </div>
    );
  };

  const renderPoweredBy = () => {
    if (config.hidePoweredBy) return null;

    return (
      <div className="doc-footer-powered">
        Powered by <a href="https://github.com/Sunny-117/doc-render-sdk" target="_blank" rel="noopener noreferrer">Doc SDK</a>
      </div>
    );
  };

  const renderCustomContent = () => {
    if (!config.footerContent) return null;

    if (typeof config.footerContent === 'function') {
      const CustomContent = config.footerContent;
      return <CustomContent config={config} theme={theme} />;
    }

    if (typeof config.footerContent === 'string') {
      return (
        <div 
          className="doc-footer-custom"
          dangerouslySetInnerHTML={{ __html: config.footerContent }}
        />
      );
    }

    return config.footerContent;
  };

  return (
    <footer className="doc-footer">
      <div className="doc-footer-content">
        {renderCopyright()}
        {renderLinks()}
        {renderCustomContent()}
        {renderPoweredBy()}
      </div>
    </footer>
  );
};

export default Footer;
