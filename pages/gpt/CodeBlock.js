import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

const CodeBlock = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const htmlCode = Prism.highlight(code, Prism.languages[language], language);

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <CopyToClipboard text={code}>
          <button className="copy-button" onClick={handleCopyClick}>
            {isCopied ? 'کپی شد!' : 'کپی کد'}
          </button>
        </CopyToClipboard>
      </div>
      <pre className={`language-${language}`}>
        <code dangerouslySetInnerHTML={{ __html: htmlCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
