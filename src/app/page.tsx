import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Building2,
  Handshake,
  ShieldCheck,
  Wallet,
  ArrowRight,
  TrendingUp,
  Tractor,
  Section,
} from "lucide-react";

export const metadata = {
  title: "Investor Marketplace | Buy & Sell High-Value Assets",
  description: "The premier platform for investors to acquire businesses, real estate plots, manufacturing plants and agricultural assets.",
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4 bg-gray-50 w-16 h-16 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="relative p-6">
      <div className="text-5xl font-extrabold text-gray-100  absolute top-0 left-0 -z-10">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default async function HomePage() {

  const session = await auth();

  // user logs in
  if(session?.user) {
    if(session.user.role === "seller") {
      redirect("/seller");
    } else {
      redirect("/buyer");
    };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative bg-gray-900 text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Invest in Verified <span className="text-blue-500">Businesses & Assets</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10">
            A secure marketplace connecting serious invetors with profitable businesses, joint venture real estate, manufacturing plants and high-yield farms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
            href="/businesses"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
              Explore Assets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors flex items-center justify-center"
            >
              Join as a Seller
            </Link>
          </div>
        </div>
      </section>

      {/* Asset Categories */}
      <section id="businesses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What you can Invest In</h2>
            <p className="mt-4 text-gray-600">Diversify your portfolio across multiple high-yield sectors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Building2 className="h-8 w-8 text-blue-600" />}
              title="Businesses for Sale"
              description="Acquire established, cash-flowing businesses across various industries."
            />
            <FeatureCard
              icon={<Handshake className="h-8 w-8 text-green-600" />}
              title="Real Estate Joint Ventures"
              description="Partner with developers to construct apartments and share investment gains."
            />
            <FeatureCard
              icon={<Tractor className="h-8 w-8 text-yellow-600" />}
              title="Farm and Agriculture"
              description="Buy or lease agricultural land, complete with existing crops and livestock."
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-purple-600" />}
              title="Manufacturing"
              description="Take over operational industrial plants and manufacturing facilities."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">A secure way to Transact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
            number="01"
            title="Discovery & Verify"
            description="Browse detailed financial  metrics and asset description. If you don't want, post a custom request to our seller network." 
            />
            <StepCard
            number="02"
            title="Secure Connection Fee"
            description="To eliminate spam and ensure  serious inquiries , buyers pay a small, secure escrow fee  via Mobile Money to unlock seller contact details." 
            />
            <StepCard
            number="03"
            title="Negotiate & CTA"
            description="Communicate directly with the seller. Need help closing? Browse our directory of vetted legal and financial professionals to hire." 
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to expand your portfolio?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join a network of serious investors and business owner today.
          </p>
          <Link 
          href="/register"
          className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-block"
          >Create Your Free Account</Link>
        </div>
      </section>
    </div>
  );
};