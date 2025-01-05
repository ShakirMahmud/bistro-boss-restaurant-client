import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keep your existing color
        'brand-gold': '#BB8506',
        
        // Dashboard color palette
        'sidebar-bg': '#1F2937',      // Dark blue-gray
        'sidebar-text': '#E5E7EB',    // Light gray
        'sidebar-hover': '#374151',   // Slightly lighter dark blue-gray
        
        // Additional accent colors
        'dashboard-bg': '#F3F4F6',    // Very light gray
        'card-bg': '#FFFFFF',         // Pure white
      },
      backgroundImage: {
        'bgImg': "url('./assets/others/authentication.png')",
      }
    },
  },
  plugins: [daisyui],
}