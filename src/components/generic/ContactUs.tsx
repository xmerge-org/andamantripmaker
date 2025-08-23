"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="relative w-full py-16 bg-gray-50" id="contact">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <Input type="text" placeholder="Your Name" className="w-full" />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Write your message..."
                  className="w-full"
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
                <SendHorizonal/> Send Message
              </Button>
            </form>
          </div>

          {/* Google Map */}
          <div className="h-[380px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31606.226764859606!2d92.716!3d11.623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f12!3m3!1m2!1s0x3088943a1b2b4a7d%3A0xd1e63d139c5a2dbb!2sAndaman%20Trip%20Maker!5e0!3m2!1sen!2sin!4v1755903500000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
