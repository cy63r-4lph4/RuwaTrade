import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export  function RegisterSeller() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Start Selling on RuwaTrade 🚀
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Join hundreds of successful sellers and reach customers across Ghana & beyond. 
          Simple setup, powerful tools, and full control over your store.
        </p>
        <Button size="lg" variant="secondary" className="mt-6 rounded-2xl px-8 py-6 text-lg font-semibold">
          Register Now
        </Button>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center">Why Sell on RuwaTrade?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          {[
            { title: "Zero Setup Fees", desc: "No hidden costs. Start selling for free and pay only a small commission on sales." },
            { title: "Reach Thousands", desc: "Get access to a growing customer base actively looking for physical & digital products." },
            { title: "Smart Dashboard", desc: "Track sales, manage inventory, and grow your business with analytics at your fingertips." }
          ].map((benefit, i) => (
            <Card key={i} className="shadow-xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <h3 className="font-semibold text-xl">{benefit.title}</h3>
                <p className="mt-2 text-gray-600">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Register as a Seller</h2>
        <Card className="max-w-3xl mx-auto shadow-2xl rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <Input placeholder="John Doe" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Business / Store Name</label>
                <Input placeholder="Doe Collections" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <Input type="email" placeholder="seller@example.com" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <Input placeholder="+233 24 123 4567" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Business Address</label>
                <Textarea placeholder="Street, City, Region, Digital Address..." />
              </div>
              <div>
                <label className="block mb-2 font-medium">About Your Business</label>
                <Textarea placeholder="Tell us about what you sell..." />
              </div>
              <Button size="lg" className="w-full rounded-2xl py-6 text-lg font-semibold">
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Steps Section */}
      <section className="bg-indigo-50 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { step: "1", title: "Register", desc: "Fill out the seller registration form." },
            { step: "2", title: "Upload Products", desc: "Add your physical or digital products." },
            { step: "3", title: "Start Selling", desc: "Go live and start earning instantly." }
          ].map((s, i) => (
            <Card key={i} className="shadow-lg rounded-2xl text-center">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-indigo-600 text-white flex items-center justify-center rounded-full mx-auto text-xl font-bold">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-xl">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { q: "How much does it cost to sell on RuwaTrade?", a: "It’s completely free to register. We only charge a small commission per sale." },
            { q: "What can I sell?", a: "You can sell both physical products (clothes, shoes, etc.) and digital products (templates, ebooks, etc.)." },
            { q: "When do I get paid?", a: "Payments are processed securely and disbursed weekly to your provided account." }
          ].map((faq, i) => (
            <Card key={i} className="rounded-xl shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <h2 className="text-4xl font-bold">Your Customers are Waiting</h2>
        <p className="mt-4 text-lg">Don’t wait – grow your business with RuwaTrade today.</p>
        <Button size="lg" variant="secondary" className="mt-6 rounded-2xl px-10 py-6 text-lg font-semibold">
          Register Now
        </Button>
      </section>
    </div>
  );
}
