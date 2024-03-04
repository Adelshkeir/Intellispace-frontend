// TawkTo.js

import React, { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/65e57bce8d261e1b5f68393c/1ho46n88h";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkTo;
