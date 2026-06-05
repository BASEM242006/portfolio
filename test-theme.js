// test-theme.js
// Simple test to verify that the dark theme is applied.
// It checks the computed background color of the <body> element.

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const computedStyle = getComputedStyle(body);
  const bgColor = computedStyle.backgroundColor;
  // Expected dark color: #0a0a0a (rgb(10,10,10))
  const expected = 'rgb(10, 10, 10)';
  const passed = bgColor === expected;
  console.log('%cTheme Test Result:', `color: ${passed ? 'green' : 'red'}; font-weight: bold;`);
  console.log('Expected:', expected, '| Actual:', bgColor);
  if (!passed) {
    console.warn('The dark theme background color does not match the expected value.');
  } else {
    console.info('Dark theme is correctly applied.');
  }
});
