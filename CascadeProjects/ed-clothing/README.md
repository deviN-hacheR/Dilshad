# ED Clothing - Premium Luxury E-Commerce Website

A premium, luxury e-commerce website built with Next.js, TypeScript, Tailwind CSS, Firebase, and Framer Motion.

## Features

- **Ultra-Premium Design**: Clean luxury aesthetic with white, black, silver, and gold color palette
- **Responsive Design**: Fully responsive on Mobile, Tablet, and Desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Premium Animations**: Smooth animations using Framer Motion
- **Complete E-Commerce**: Cart, Checkout, Order Tracking, Wishlist
- **Admin Panel**: Comprehensive dashboard for managing products, orders, and customers
- **Firebase Integration**: Authentication, Firestore, Storage ready
- **SEO Optimized**: Meta tags and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels

## Tech Stack

- **Framework**: Next.js 14.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (for backend integration)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ed-clothing
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Enable Storage
   - Copy your Firebase config

4. Configure Firebase:
   - Open `lib/firebase.ts`
   - Replace the placeholder values with your actual Firebase credentials:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ed-clothing/
├── app/
│   ├── about/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── orders/
│   │   └── products/
│   ├── cart/
│   ├── checkout/
│   ├── contact/
│   ├── faq/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── privacy-policy/
│   ├── products/
│   ├── terms/
│   ├── track-order/
│   └── wishlist/
├── components/
│   ├── Footer.tsx
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── firebase.ts
│   ├── types.ts
│   └── utils.ts
├── stores/
│   └── cart-store.ts
├── public/
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Pages

### Public Pages
- **Home**: Hero section, brand story, featured categories, newsletter, reviews
- **About**: Company story, values, mission, milestones
- **Products**: Coming soon countdown with subscription
- **Contact**: Contact form, WhatsApp integration, Google Maps placeholder
- **FAQ**: Accordion-style frequently asked questions
- **Privacy Policy**: Privacy policy page
- **Terms & Conditions**: Terms of service page
- **Order Tracking**: Track orders by ID
- **Cart**: Shopping cart with quantity management
- **Checkout**: Complete checkout flow with COD and Google Pay
- **Wishlist**: Save favorite items

### Admin Panel
- **Login**: Admin authentication (Demo: admin@edclothing.com / admin123)
- **Dashboard**: Overview with stats and recent orders
- **Products**: Product management (CRUD operations)
- **Orders**: Order management and status updates
- **Customers**: Customer management
- **Coupons**: Coupon code management
- **Settings**: Site configuration

## Firebase Setup

### Authentication
- Enable Email/Password authentication
- Create admin user manually or through Firebase Console

### Firestore
- Create collections:
  - `products` - Product inventory
  - `orders` - Customer orders
  - `users` - User accounts
  - `coupons` - Discount codes
  - `reviews` - Product reviews

### Storage
- Enable Firebase Storage for product images
- Set appropriate security rules

## Payment Integration

### Google Pay
- Replace the placeholder QR code with your actual GPay QR
- Update the UPI ID in the checkout page
- Current placeholder: `8714987369@upi`

### Cash on Delivery
- Already implemented
- No additional setup required

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables for Firebase config
4. Deploy

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  gold: { /* your gold shades */ },
  silver: { /* your silver shades */ },
}
```

### Fonts
The project uses Inter and Playfair Display fonts. To change fonts:
1. Update imports in `app/layout.tsx`
2. Update font variables in `tailwind.config.ts`

### Branding
Update brand name, contact details, and social links in:
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `app/contact/page.tsx`

## Performance Optimization

- Images are optimized using Next.js Image component
- Lazy loading implemented for better performance
- Code splitting automatic with Next.js
- CSS purged with Tailwind CSS

## Security

- Firebase security rules should be configured
- Admin routes protected with authentication
- Environment variables for sensitive data
- Input validation on all forms

## Support

For support or questions:
- Email: hello@edclothing.com
- Phone: +91 8714987369

## License

© 2024 ED Clothing. All rights reserved.
