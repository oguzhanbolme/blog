/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-[#66d9ef]',
    'text-[#101827]',
    'flex',
    'flex-col',
    'flex-row',
    'md:flex-col',
    'md:flex-row',
    'overflow-x-auto',
    'relative',
    'rounded',
    'w-full',
    { pattern: /(bg|m|mx|my|mt|mb|p|px|py|pt|pb|gap)-./ },
    { pattern: /(text)-./, variants: ['md'] },
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
};
