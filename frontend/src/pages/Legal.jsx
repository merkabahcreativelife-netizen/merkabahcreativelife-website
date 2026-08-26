const PAGES = {
  privacy: {
    title: "Privacy Policy",
    body: [
      ["What We Collect", "When you submit a form on this website — a project enquiry, trial class request, application, order or newsletter signup — we collect the details you provide: name, email, phone number and the content of your message or application."],
      ["How We Use It", "Your information is used solely to respond to your enquiry, process your application or order, and — where you have subscribed — to send you Merkabah updates. We do not sell, rent or share your personal information with third parties for marketing purposes."],
      ["Storage & Security", "Form submissions are stored securely in our systems and are accessible only to the Merkabah team. Application details, resumes and personal information are never made publicly accessible."],
      ["Your Choices", "You may request correction or deletion of your personal data at any time by writing to us through the Contact page. Newsletter subscribers can unsubscribe at any time."],
      ["Contact", "For any privacy-related questions, reach us via the Contact page on this website."],
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      ["Use of This Website", "By using the Merkabah Creative Life website you agree to these terms. Content on this site is provided for general information about our divisions, services, courses, events and products."],
      ["Services & Enquiries", "Submitting an enquiry, registration or application does not create a binding engagement. All services, courses and events are confirmed individually in writing by the Merkabah team."],
      ["Intellectual Property", "All content, branding, text, imagery and audio on this website are the property of Merkabah Creative Life and may not be reproduced without written permission."],
      ["Orders", "Store orders are subject to availability and confirmation. Prices are listed in INR and may change without notice."],
      ["Liability", "Merkabah Creative Life is not liable for indirect or consequential losses arising from use of this website. Nothing in these terms excludes liability that cannot be excluded by law."],
    ],
  },
  refund: {
    title: "Refund Policy",
    body: [
      ["Courses & Workshops", "Registrations may be cancelled for a full refund up to 7 days before the course or workshop start date. Cancellations within 7 days of the start date are eligible for a 50% credit toward a future program."],
      ["Events", "Event tickets are refundable up to 72 hours before the event. Within 72 hours, tickets may be transferred to another attendee on request."],
      ["Store Products", "Physical products may be returned unused within 7 days of delivery for a refund or exchange. Digital products are non-refundable once delivered."],
      ["Processing", "Approved refunds are processed to the original payment method within 7–10 working days. To request a refund, contact us with your order or registration details."],
    ],
  },
  shipping: {
    title: "Shipping Policy",
    body: [
      ["Delivery Areas", "We currently ship physical products across India."],
      ["Timelines", "Orders are dispatched within 2–4 working days of confirmation. Delivery typically takes 3–7 working days depending on location."],
      ["Charges", "Shipping charges, if applicable, are confirmed at the time of order confirmation."],
      ["Digital Products & Tickets", "Digital products and event tickets are delivered electronically to the email address provided at checkout — no physical shipping applies."],
      ["Issues", "If your order arrives damaged or does not arrive within the expected window, contact us with your order number and we will resolve it promptly."],
    ],
  },
};

export default function Legal({ page: pageKey }) {
  const page = PAGES[pageKey] || PAGES.privacy;
  return (
    <section className="pt-24 pb-24 max-w-3xl mx-auto px-6 lg:px-8">
      <div className="overline">Legal</div>
      <h1 className="font-display font-light text-4xl sm:text-6xl leading-[0.95] tracking-tighter text-ink mt-3 mb-12">{page.title}</h1>
      <div className="space-y-10">
        {page.body.map(([t, d]) => (
          <div key={t} className="border border-silver-200 bg-white p-8" style={{ borderLeft: "3px solid #7c3aed" }}>
            <div className="font-display text-xl text-ink mb-2">{t}</div>
            <p className="text-ink-mute leading-relaxed text-sm">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-ink-mute">Last updated: August 2026 · Merkabah Creative Life</p>
    </section>
  );
}
