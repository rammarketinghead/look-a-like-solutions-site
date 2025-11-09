import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component to handle automatic scroll management
export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Check if the URL has a hash
    if (location.hash) {
      // URL with hash: Wait 100ms and then call scrollIntoView() to the target element
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // URL without hash: Always scroll to the top of the page with smooth behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [location]);

  return null;
}
