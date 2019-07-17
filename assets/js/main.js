(global => {
  window.derek = window.derek || {};

  window.derek.fonts = [
    {
      "family": "Noto Serif",
      "weight": 400,
      "style": "normal"
    },
    {
      "family": "Nunito",
      "weight": 600,
      "style": "normal"
    }
  ];

  window.derek.fonts.forEach((themeFont) => {
    let fontHandle = `${themeFont.family.toLowerCase().replace(/ /g,'-')}-${themeFont.weight}-${themeFont.style}`;

    if (sessionStorage[fontHandle + '-loaded']) {
      document.documentElement.classList.add(themeFont.family.toLowerCase().replace(/ /g,'-') + '-loaded');
      document.documentElement.classList.add(fontHandle);
    } else {
      let font = new FontFaceObserver(themeFont.family, {
        weight: themeFont.weight || 'normal',
        style: themeFont.style || 'normal'
      });

      font.load().then(() => {
        themeFont.font = font;
        document.documentElement.classList.add(themeFont.family.toLowerCase().replace(/ /g,'-') + '-loaded');
        document.documentElement.classList.add(fontHandle);
        sessionStorage[fontHandle + '-loaded'] = true;
      });
    }
  });
})(window);