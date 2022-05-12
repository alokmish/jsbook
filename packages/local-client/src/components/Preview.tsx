import './Preview.css';
import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
        <style>html {background-color: white;}</style>
      </head>
      <body>
        <div id='root'></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector("#root");
            root.innerHTML = '<div>' + err + '</div>';
            console.error(err);
          }
          window.addEventListener("error", (event) => {
            event.preventDefault();
            handleError(event.error);
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} title="preview-frame" sandbox="allow-scripts" srcDoc={html} />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
