# Xilikha - Traditional Assamese Wellness E-commerce

A premium e-commerce website for Xilikha (Haritaki) products from Assam, India. Built with React, Tailwind CSS, and Framer Motion for a stunning, modern shopping experience.

## 🌿 About Xilikha

Xilikha is the Assamese name for Haritaki (Terminalia chebula), a powerful Ayurvedic fruit known for its wellness benefits. This project brings traditional Assamese heritage products to customers worldwide through a beautiful, user-friendly online store.

## ✨ Features

- **Stunning UI/UX**: Modern, premium design with smooth animations
- **Responsive Design**: Perfect experience on all devices
- **Product Showcase**: Three premium products (Dried Xilikha, Tea Blend, Salted Xilikha)
- **Shopping Cart**: Full cart functionality with local storage persistence
- **Checkout System**: Complete checkout flow (demo mode, ready for payment integration)
- **Educational Content**: Detailed product information, benefits, and usage instructions
- **Brand Storytelling**: Rich content about Assamese heritage and wellness

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing

### Design

- Custom color palette (Forest Green, Earth Tones, Golden Accent)
- Google Fonts (Inter, Outfit)
- Responsive mobile-first design
- Premium animations and micro-interactions

## 📁 Project Structure

```
Xilikha/
├── frontend/
│   ├── public/
│   │   └── assets/          # Images, logo, product photos
│   ├── src/
│   │   ├── components/      # Reusable components (Navbar, Footer, ProductCard)
│   │   ├── pages/           # Page components (Home, Shop, Cart, etc.)
│   │   ├── data/            # Product data
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/                 # (Future: Node.js + Express + MongoDB)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📄 Pages

- **Home** (`/`) - Hero section, featured products, benefits
- **Shop** (`/shop`) - All products with filtering
- **Product Detail** (`/product/:id`) - Detailed product information
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order form and summary
- **About** (`/about`) - Brand story and values
- **How to Use** (`/how-to-use`) - Usage instructions for each product
- **Contact** (`/contact`) - Contact form and information

## 🎨 Branding

### Colors

- **Primary (Forest Green)**: Heritage, nature, wellness
- **Earth Tones**: Traditional Assamese warmth
- **Accent (Golden Yellow)**: Premium, warmth

### Typography

- **Display Font**: Outfit (headings)
- **Body Font**: Inter (content)

## 🔮 Future Enhancements

### Backend Integration

- [ ] Node.js + Express server
- [ ] MongoDB database for orders and products
- [ ] Razorpay payment gateway integration
- [ ] Email notifications
- [ ] Admin dashboard for order management

### Features

- [ ] User authentication and accounts
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Newsletter subscription
- [ ] Blog section for recipes and wellness tips

## 📦 Deployment

### Recommended Platforms

- **Vercel** (Frontend) - Free, fast, easy deployment
- **Render/Railway** (Backend when ready) - Free tier available
- **MongoDB Atlas** (Database when ready) - Free tier available

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

Or use Vercel CLI:

```bash
npm install -g vercel
vercel
```

## 📝 License

This project is created for Xilikha brand. All rights reserved.

## 🙏 Acknowledgments

- Traditional Assamese heritage and wisdom
- The farmers and communities of Assam
- Modern web technologies that make this possible

---

**Built with ❤️ for Assamese Heritage Wellness**
