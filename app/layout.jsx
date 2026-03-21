export const metadata = {
  title: 'Portfolio',
  description: 'Next.js portfolio starter'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'Inter, Arial, sans-serif', background: '#0b1020', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
