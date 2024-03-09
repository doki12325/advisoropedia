import Navbar from "@components/Navbar";
import "@styles/globals.css";

export const metadata = {
  title: "Advisoropedia",
  description:
    "Advisoropedia is a platform for financial advisors to share their knowledge and expertise with the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
