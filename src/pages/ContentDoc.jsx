import React, { useRef } from 'react';
import { Printer } from 'lucide-react';

const Section = ({ id, children }) => (
  <div id={id} className="mb-12 page-break-inside-avoid">{children}</div>
);

const PageTitle = ({ page, sub }) => (
  <div className="mb-6 pb-3 border-b-2 border-gray-800">
    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{sub}</p>
    <h2 className="text-2xl font-bold text-gray-900">{page}</h2>
  </div>
);

const SectionTitle = ({ label, title, description }) => (
  <div className="mb-4">
    {label && <p className="text-xs uppercase tracking-widest text-amber-600 mb-1">{label}</p>}
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
  </div>
);

const Body = ({ children }) => (
  <p className="text-sm text-gray-700 leading-relaxed mb-3">{children}</p>
);

const BulletList = ({ items }) => (
  <ul className="list-disc ml-5 space-y-1 mb-4">
    {items.map((item, i) => (
      <li key={i} className="text-sm text-gray-700">{item}</li>
    ))}
  </ul>
);

const SubCard = ({ title, body }) => (
  <div className="mb-4">
    <h4 className="text-sm font-semibold text-gray-800 mb-1">{title}</h4>
    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
  </div>
);

const Stats = ({ items }) => (
  <div className="grid grid-cols-4 gap-4 my-4">
    {items.map(({ value, label }) => (
      <div key={label} className="border border-gray-200 p-3 text-center rounded">
        <div className="text-xl font-bold text-amber-600">{value}</div>
        <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{label}</div>
      </div>
    ))}
  </div>
);

const Divider = () => <hr className="border-gray-200 my-8" />;

export default function ContentDoc() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
        }
        @page { margin: 1.5cm 2cm; }
      `}</style>

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-xs tracking-widest uppercase text-gray-300">RTM Imports — Site Content Document</span>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2 bg-amber-400 text-gray-900 text-xs font-bold uppercase tracking-widest rounded hover:bg-amber-300 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Download / Print PDF
        </button>
      </div>

      {/* Document */}
      <div className="print-page max-w-4xl mx-auto px-10 py-12 bg-white min-h-screen font-sans">

        {/* Cover */}
        <div className="mb-16 text-center border-b-2 border-gray-800 pb-12">
          <p className="text-xs uppercase tracking-widest text-amber-600 mb-3">Prepared for Client Review</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">RTM Imports</h1>
          <h2 className="text-xl text-gray-600 mb-6">Website Content Document</h2>
          <p className="text-sm text-gray-500">rtm-imports.com · All copy organized by page and section</p>
          <p className="text-xs text-gray-400 mt-2">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* ─── HOME ─────────────────────────────────────────── */}
        <Section id="home">
          <PageTitle page="Home" sub="Page 1 of 6" />

          <SectionTitle label="Hero Section" title="America's dedicated Asian beverage specialist." />
          <Body>Eyebrow label: "Route to Market Imports"</Body>
          <Body>Headline: America's dedicated <em>Asian beverage specialist.</em></Body>
          <Body>Subheading: More than 30 years of category depth. A national wholesale network. And a singular focus on the brands and markets that are driving the next chapter of beverage alcohol in the U.S.</Body>
          <BulletList items={['CTA Button: "Our Services"', 'Secondary Button: "Get in Touch"']} />

          <SectionTitle label="Stats Bar" title="Key Numbers" />
          <Stats items={[
            { value: '30+', label: 'Years in Category' },
            { value: '25+', label: 'Wholesale Partners' },
            { value: '5', label: 'Sourcing Countries' },
            { value: '1', label: 'Singular Focus' },
          ]} />

          <SectionTitle label="Areas of Expertise" title="What we do best" description="Three core disciplines. One singular focus: getting your product to market." />
          <SubCard title="01 — Asian Beverage" body="Three decades of dedicated sourcing across South Korea, Japan, China, Thailand, and Taiwan. Soju, sake, shochu, Korean beer, Japanese whisky, and Asian RTDs — the highest-growth segments in the U.S. market, covered by a specialist who was there before the mainstream arrived." />
          <SubCard title="02 — Custom Labels" body="Curated relationships with quality producers across Europe and Asia, available to retailers and operators building proprietary brands. From liquid development to label approval to wholesaler onboarding — end-to-end, no catalog required." />
          <SubCard title="03 — Compliance & Licensing" body="An active importer and wholesaler license network covering all 50 states, built over 30+ years of operating in the U.S. market. We make this infrastructure available to select producers and retailers — so you don't have to build it from scratch." />

          <SectionTitle label="Quote Section" title="Featured Quote" />
          <Body>"For at the end of the day, what matters is never the wine, it's always the moment; it's always the people." — Olivier Magny</Body>

          <SectionTitle label="News Section" title="Latest from the category" />
          <Body>Displays the 3 most recent published news posts with a link to the full News page. (Content managed dynamically — see News page.)</Body>

          <SectionTitle label="CTA Section" title="A specialist partner for serious brands." />
          <Body>Eyebrow: "Let's Work Together"</Body>
          <Body>RTM operates exclusively in the B2B wholesale channel, working with the largest national beverage wholesalers across on- and off-premise. If you are a producer seeking U.S. market entry, or a wholesaler evaluating your Asian beverage portfolio, we'd like to hear from you.</Body>
          <BulletList items={['CTA Button: "Contact Us"']} />
        </Section>

        <Divider />

        {/* ─── ABOUT ────────────────────────────────────────── */}
        <Section id="about">
          <PageTitle page="About" sub="Page 2 of 6" />

          <SectionTitle label="Hero" title="Thirty years in the category. Now standing alone." />

          <SectionTitle label="Our Story" title="What RTM stands for" />
          <Body>RTM Imports is a San Antonio-based importer of Asian beverage alcohol with more than 30 years of operational history in the category. Originally established in the early 1990s alongside one of the largest wholesale networks in the country, RTM was formally structured as an independent LLC and has been led by Benjamin Roberts since 2016.</Body>
          <Body>We operate exclusively in the B2B wholesale channel — working with the largest national beverage wholesalers and their chain teams across both on-premise and off-premise. We do not sell to consumers. We do not chase broad portfolios. We exist to serve our wholesale partners.</Body>
          <Body>Our specialization spans South Korea, Japan, China, Thailand, and Taiwan — covering the most significant growth segments in the U.S. market: soju, sake, shochu, Korean beer, Japanese whisky, and Asian RTDs. We were building relationships in these markets long before the mainstream conversation arrived.</Body>
          <Body>We stick to what we know we do well. No filler, no noise — just results.</Body>

          <SectionTitle label="Pull Quote" title="" />
          <Body>"We only exist to serve the needs of our customers, not to promote our own agenda, products or market positions."</Body>

          <Stats items={[
            { value: '30+', label: 'Years in Category' },
            { value: '25+', label: 'Wholesale Partners' },
          ]} />

          <SectionTitle label="Our Approach" title="Why RTM" description="While our competitors build massive portfolios and chase scale, we build focused partnerships and chase results." />
          <SubCard title="Fearless Creativity" body="We pursue categories and producers that others overlook. Asian beverage alcohol was a niche before it was a trend — we were already there." />
          <SubCard title="Aggressive Adaptability" body="The U.S. wholesale landscape is consolidating rapidly. Our independence and lean operating model mean we move faster than any generalist importer." />
          <SubCard title="Relationship-First Execution" body="Long-term partnerships — with Asian producers and national wholesalers alike — are the foundation of everything we do. Trust is built over decades, not campaigns." />

          <SectionTitle label="CTA" title="Let's find your route." />
          <Body>Whether you're an Asian producer evaluating U.S. market entry, or a wholesaler looking to strengthen your portfolio in the fastest-growing beverage category, we'd like to hear from you.</Body>
          <BulletList items={['CTA Button: "Start the Conversation"']} />
        </Section>

        <Divider />

        {/* ─── SERVICES ─────────────────────────────────────── */}
        <Section id="services">
          <PageTitle page="Services" sub="Page 3 of 6" />

          <SectionTitle label="Hero" title="Three disciplines. One focus." />
          <Body>RTM Imports is a B2B-only specialist. We do not sell to consumers. Our three service areas reflect 30+ years of operating experience in the U.S. wholesale channel — each one a discipline we have built deliberately, and each one available to the right partner.</Body>

          <SectionTitle label="Service 1" title="Asian Beverages — Leading the fastest-growing category in America" />
          <Body>Asian beverage is one of the few categories showing significant, sustained growth — specifically within the Gen Z demographic. RTM has become a national leader in this trend with brands that span sake, soju, shochu, Japanese whisky, and wine-based RTD.</Body>

          <SectionTitle label="Service 2" title="Custom Labels — Your brand. Our expertise. Their shelf." />
          <Body>As competition intensifies, the brands that win own the relationship with the consumer. Our private label program leverages curated producer relationships across Europe and Asia to build proprietary brands from concept to shelf — fully compliant, fully differentiated.</Body>

          <SectionTitle label="Service 3" title="Compliance & Licensing — The infrastructure that makes national distribution possible" />
          <Body>The U.S. three-tier system is complex. Our active license network across 50+ states, wholesaler relationships, and TTB expertise give your brand a compliant path to market — without spending years building the infrastructure yourself.</Body>

          <SectionTitle label="CTA" title="Have a project in mind?" />
          <Body>We'd love to learn about your brand and explore how our services can serve your goals.</Body>
          <BulletList items={['CTA Button: "Get in Touch"']} />
        </Section>

        <Divider />

        {/* ─── ASIAN BEVERAGE (sub-page) ─────────────────────── */}
        <Section id="asian-beverage">
          <PageTitle page="Services / Asian Beverages" sub="Page 3a of 6" />

          <SectionTitle label="Hero" title="Leading the fastest-growing category in America." />

          <SectionTitle label="The Opportunity" title="Why Asian beverages, why now" />
          <Body>Soju has more than doubled in the U.S. over the past five years, reaching approximately $935 million in 2024. Growth is driven by Gen Z demand, the global reach of K-culture, and accessible pricing — validated by major mainstream players now entering the space. Spirit of Gallo's 2024 partnership with Lotte Chilsung reportedly delivered a 700% surge in volume for Lotte's brands in the year ending March 2025.</Body>
          <Body>Parallel momentum is visible across the broader portfolio. Sake is seeing consistent double-digit growth as it moves beyond sushi restaurants into fine dining and general retail. Japanese whisky continues to lead at the premium end. Korean beer and Asian RTDs are gaining significant traction across on- and off-premise accounts.</Body>
          <Body>RTM has operated in these markets for more than 30 years — sourcing from South Korea, Japan, China, Thailand, and Taiwan. We built producer relationships and wholesaler advocacy long before the current mainstream conversation began.</Body>

          <Stats items={[
            { value: '$935M', label: 'U.S. soju market 2024' },
            { value: 'Gen Z', label: 'Primary growth demographic' },
            { value: '30+', label: 'Years RTM in category' },
          ]} />

          <SectionTitle label="Portfolio" title="Our Asian beverage portfolio" description="We curate across the full spectrum of Asian beverages, focused on quality producers and authentic stories that resonate with today's consumer." />
          <SubCard title="Sake" body="Japan's national beverage has evolved far beyond tradition. From junmai daiginjo to sparkling sake, we source premium expressions that appeal to both connoisseurs and new consumers discovering the category for the first time." />
          <SubCard title="Soju" body="The world's best-selling spirit by volume. Soju's clean, approachable profile and versatility make it a natural fit for the American on-premise market. We bring authentic Korean-produced soju brands designed for the U.S. palate." />
          <SubCard title="Shochu" body="Japan's under-the-radar spirit is having a cultural moment. Lower in alcohol and incredibly versatile, shochu pairs naturally with food and fits the growing wellness-conscious consumer trend without sacrificing flavor." />
          <SubCard title="Japanese Whisky" body="Demand continues to outpace supply globally. We work with select producers to bring authentic Japanese whisky expressions with transparent provenance — a key differentiator in a category facing credibility scrutiny." />
          <SubCard title="Wine-Based RTD" body="Ready-to-drink beverages built on Asian flavor profiles are among the fastest-growing SKUs at retail. Our wine-based RTD portfolio captures the Gen Z and millennial consumer who wants premium, convenient, and culturally distinct." />
          <SubCard title="Craft & Specialty Beer" body="Asian craft beer is a rising category in specialty retail and on-premise. We identify craft breweries with compelling stories and distinctive styles that resonate with an increasingly adventurous American beer drinker." />

          <SectionTitle label="Our Process" title="How we bring your brand to the U.S." />
          <SubCard title="01 — Producer Sourcing" body="We travel to origin regions, visit facilities, and vet producers on quality, authenticity, and capacity to meet U.S. import standards." />
          <SubCard title="02 — Market Positioning" body="We define the right consumer, the right channel, and the right price architecture for each brand before a single bottle enters the country." />
          <SubCard title="03 — Wholesaler Activation" body="Our national wholesaler network means your brand has advocacy at the distributor level — critical for market penetration and sustainable velocity." />
        </Section>

        <Divider />

        {/* ─── CUSTOM LABELS (sub-page) ─────────────────────── */}
        <Section id="custom-labels">
          <PageTitle page="Services / Custom Labels" sub="Page 3b of 6" />

          <SectionTitle label="Hero" title="Your brand. Our expertise. Their shelf." />

          <SectionTitle label="Private Label Programs" title="Built on relationships, not catalogs" />
          <Body>As competition intensifies across every beverage category, the brands that win are the ones that own the relationship with the consumer. A private label is not a shortcut — it's a strategic asset.</Body>
          <Body>RTM's custom label program is built on years of curated producer relationships across Europe and Asia. We don't work from a catalog. We match producers to programs based on liquid quality, production reliability, and the authentic story that will resonate in the American market.</Body>
          <Body>From a single SKU to a full multi-tier portfolio, we manage every element of the process — so you can focus on selling, not sourcing.</Body>

          <SectionTitle title="What's included in every program" />
          <BulletList items={[
            'Producer identification and vetting',
            'Liquid development and sensory review',
            'Label design and packaging development',
            'TTB label approval and import compliance',
            'State-by-state market registration support',
            'Wholesaler onboarding and brand materials',
            'Ongoing supply chain and quality management',
          ]} />

          <SectionTitle label="The Case for Private Label" title="Why leading retailers choose custom" />
          <SubCard title="Differentiation at Shelf" body="In a crowded retail environment, a proprietary brand cuts through the noise. Customers who buy your label are buying your story — not a commodity." />
          <SubCard title="Margin Control" body="Custom labels eliminate the margin compression of branded resale. You set the price architecture and retain the value you create." />
          <SubCard title="Portfolio Flexibility" body="A private label program gives you agility — seasonal expressions, limited releases, and category extensions without the long lead times of branded products." />
          <SubCard title="Quality Without Volume" body="Our producer relationships are built on quality first, not minimum order volumes. We find the right fit for your program, not the most convenient one." />

          <SectionTitle label="Our Process" title="From concept to shelf" description="A structured, end-to-end process that eliminates guesswork and accelerates time to market." />
          <SubCard title="01 — Strategic Brief" body="We begin with a deep discovery session — understanding your customer, your competitive set, your price point, and the story you want to tell. A clear brief is the foundation of a compelling brand." />
          <SubCard title="02 — Producer Matching" body="Using our curated network of European and Asian producers, we identify the right production partner based on quality benchmarks, capacity, certifications, and stylistic fit with your vision." />
          <SubCard title="03 — Product Development" body="We manage the full development cycle: liquid selection, sample review, sensory benchmarking, and iterative refinement until the product meets your specifications and our quality standards." />
          <SubCard title="04 — Brand & Design" body="Label design, bottle selection, closure, and packaging are developed with retail shelf impact in mind. Every visual element is built to communicate quality and drive purchase intent." />
          <SubCard title="05 — Compliance Clearance" body="Label approval, import permits, and state-specific compliance are handled end-to-end. Your brand arrives market-ready with no regulatory surprises." />
          <SubCard title="06 — Launch & Activation" body="We coordinate the commercial launch with our wholesaler network, providing brand materials, sell sheets, and in-market support to accelerate velocity from day one." />
        </Section>

        <Divider />

        {/* ─── COMPLIANCE (sub-page) ────────────────────────── */}
        <Section id="compliance">
          <PageTitle page="Services / Compliance & Licensing" sub="Page 3c of 6" />

          <SectionTitle label="Hero" title="The infrastructure that makes national distribution possible." />

          <SectionTitle label="The Regulatory Reality" title="Why compliance is a strategic asset" />
          <Body>The U.S. beverage alcohol market is governed by a three-tier system with federal oversight from the TTB and individual regulatory frameworks in all 50 states. For a foreign producer or a new domestic brand, navigating this landscape is one of the single greatest barriers to market entry.</Body>
          <Body>Most brands don't fail because their liquid isn't good enough. They fail because they underestimate the complexity of getting that liquid legally from a production facility to a consumer's glass. Compliance is not a formality — it's the foundation.</Body>
          <Body>RTM has built this foundation deliberately over years of operating in the market. Our license network, our wholesaler relationships, and our working knowledge of state-by-state regulatory nuance represent infrastructure that cannot be replicated quickly — and we make it available to our partners.</Body>

          <Stats items={[
            { value: '50+', label: 'Active state licenses' },
            { value: '100+', label: 'Wholesaler relationships' },
            { value: 'Federal', label: 'TTB importer registration' },
            { value: 'Years', label: 'Regulatory experience' },
          ]} />

          <SectionTitle label="Compliance Services" title="Compliance services in full" description="A comprehensive set of regulatory and licensing capabilities, built to eliminate the barriers between your brand and the American market." />
          <SubCard title="State License Network" body="RTM maintains an active importer and wholesaler license network across all 50 states and the District of Columbia. This infrastructure — built over years of careful cultivation — means your brand can go national without waiting months for regulatory setup." />
          <SubCard title="Wholesaler Relationship Management" body="Having a license isn't enough — you need advocacy. Our wholesaler relationships are built on trust, track record, and mutual benefit. We don't cold-call distributors; we leverage long-standing partnerships to get your brand in front of the right buyer." />
          <SubCard title="TTB Registration & Label Approval" body="The Alcohol and Tobacco Tax and Trade Bureau (TTB) requires meticulous documentation. We manage label submissions, formula approvals, and import certificates to ensure your product clears every federal hurdle before it reaches state borders." />
          <SubCard title="State Registration & COLAs" body="Each state has its own registration requirements, pricing rules, and approval processes. We navigate this patchwork efficiently, using our experience to anticipate delays and resolve issues before they affect your launch timeline." />
          <SubCard title="Ongoing Compliance Monitoring" body="Regulatory requirements evolve. We provide proactive monitoring of licensing renewals, reporting obligations, and regulatory changes that could affect your brand — so you stay compliant without dedicating internal resources to it." />
          <SubCard title="Market Entry Consulting" body="For foreign producers evaluating the U.S. market, we offer strategic consulting on the most efficient path to entry — advising on entity structure, importer-of-record setup, and multi-state rollout sequencing." />

          <SectionTitle label="FAQ" title="What producers ask us" />
          <SubCard title="How long does it typically take to get a brand into a new state?" body="Timelines vary by state — from a few weeks in cooperative states to several months in control states. Our experience and existing relationships help us anticipate bottlenecks and minimize delays." />
          <SubCard title="Do you handle compliance for brands you don't import?" body="In select cases, yes. We offer compliance consulting and license-sharing arrangements for established brands that need network infrastructure without a full import relationship." />
          <SubCard title="What is the benefit of your existing license network versus setting one up independently?" body="Years and significant cost. Building a compliant 50-state license infrastructure from scratch typically takes 12–24 months and substantial legal fees. Leveraging ours accelerates market entry dramatically." />
          <SubCard title="Can you help with e-commerce or DTC compliance?" body="Direct-to-consumer alcohol commerce is among the most complex regulatory areas in the industry. We can assess your situation and connect you with specialized legal counsel where needed." />
        </Section>

        <Divider />

        {/* ─── PORTFOLIO ────────────────────────────────────── */}
        <Section id="portfolio">
          <PageTitle page="Portfolio" sub="Page 4 of 6" />

          <SectionTitle label="Hero" title="Curated, not collected." />
          <Body>Philosophy quote: "Due to the stringency of our wholesaler partner demands, our focus has and will continue to be on a selection of quality producers rather than a comprehensive portfolio." — In other words: we stick to what we know we do well.</Body>

          <SectionTitle label="Categories" title="What we bring to market" />
          <SubCard title="Asian Spirits" body="Premium sake, soju, shochu, and Japanese whisky from artisan producers across Asia. Authentic, high-quality spirits that resonate with modern consumers. Tags: Sake, Soju, Shochu, Japanese Whisky." />
          <SubCard title="European Wines" body="Curated selections from established producers in France, Italy, Spain, and beyond. Quality-first private-label and branded wines for discerning palates. Tags: French, Italian, Spanish, Portuguese." />
          <SubCard title="Craft & RTD" body="Wine-based ready-to-drink beverages and craft beer selections that capture the attention of new-generation consumers seeking premium, convenient options. Tags: Ready-to-Drink, Craft Beer, Flavored, Wine-Based." />

          <SectionTitle label="Sourcing Regions" title="Global reach, curated focus" />
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { name: 'South Korea', specialty: 'Soju, Korean Beer, Rice Wine, RTD' },
              { name: 'Japan', specialty: 'Sake, Whisky, Shochu, Craft Beer' },
              { name: 'China', specialty: 'Baijiu, Craft Spirits, Wine-Based RTD' },
              { name: 'Thailand', specialty: 'Spirits, RTD, Craft Beer' },
              { name: 'Taiwan', specialty: 'Whisky, Craft Beer, Spirits' },
              { name: 'France', specialty: 'Wine, Champagne, Sparkling' },
              { name: 'Italy', specialty: 'Wine, Prosecco, Amaro' },
              { name: 'Spain & Portugal', specialty: 'Wine, Cava, Sherry, Port' },
            ].map((r) => (
              <div key={r.name} className="border border-gray-200 p-3 rounded text-sm">
                <span className="font-semibold text-gray-800">{r.name}</span> — <span className="text-gray-600">{r.specialty}</span>
              </div>
            ))}
          </div>

          <SectionTitle label="CTA" title="Interested in our brands?" />
          <Body>Contact us to learn more about our current portfolio or to discuss bringing your brand to market.</Body>
          <BulletList items={['CTA Button: "Request Portfolio Details"']} />
        </Section>

        <Divider />

        {/* ─── NEWS ─────────────────────────────────────────── */}
        <Section id="news">
          <PageTitle page="News & Insights" sub="Page 5 of 6" />

          <SectionTitle label="Hero" title="The Asian beverage category, covered." />
          <Body>Industry trends, partnership announcements, market data, and perspectives from RTM's 30+ years in the category.</Body>

          <SectionTitle title="Content" />
          <Body>This page is fully dynamic — articles are managed through the admin dashboard at /admin/news. Each article contains: title, category (Industry Trend / Partnership / Press Release / Market Data / Company Update), summary, full body (markdown), author, published date, featured flag, optional image, optional external link, and tags.</Body>

          <SectionTitle title="Category filters" />
          <BulletList items={['All', 'Industry Trend', 'Partnership', 'Press Release', 'Market Data', 'Company Update']} />

          <SectionTitle title="Sample articles published at launch" />
          <SubCard title="U.S. Soju Market Surpasses $935M — And RTM Has Been Here Since the Beginning" body="Category: Market Data. The U.S. soju market more than doubled in five years, reaching approximately $935 million in 2024. Driven by Gen Z demand and the global momentum of K-culture, soju is no longer a niche — it's a mainstream category. RTM has operated in this space for over 30 years." />
          <SubCard title="Sake's Steady Rise: From Sushi Restaurants to Fine Dining and Retail" body="Category: Industry Trend. Sake is posting consistent double-digit growth as it breaks out of its traditional Japanese restaurant context and into fine dining programs, specialty retail, and general off-premise." />
          <SubCard title="Japanese Whisky: Supply Constraints and the Provenance Question" body="Category: Industry Trend. Demand for authentic Japanese whisky continues to outpace supply globally. As the category faces growing scrutiny over labeling and provenance, importers with transparent, verified producer relationships are gaining a clear competitive edge." />
        </Section>

        <Divider />

        {/* ─── CONTACT ──────────────────────────────────────── */}
        <Section id="contact">
          <PageTitle page="Contact" sub="Page 6 of 6" />

          <SectionTitle label="Hero" title="Let's start the conversation." />
          <Body>Whether you're a producer seeking U.S. market entry or a retailer exploring private-label options, we're here to help.</Body>

          <SectionTitle title="Contact Form Fields" />
          <BulletList items={[
            'Full Name (required)',
            'Email (required)',
            'Company (optional)',
            'Interest — dropdown: Asian Beverage / Custom Labels / Compliance & Licensing / Distribution Partnership / General Inquiry',
            'Message (required)',
            'Submit Button: "Send Message"',
          ]} />

          <SectionTitle title="Contact Information Panel" />
          <SubCard title="Office" body="755 East Mulberry Ave., San Antonio, TX 78212" />
          <SubCard title="Email" body="contact@rtm-imports.com" />
          <Body>Panel closing quote: "For at the end of the day, what matters is never the wine, it's always the moment; it's always the people." — Olivier Magny</Body>
        </Section>

        <Divider />

        {/* ─── FOOTER ───────────────────────────────────────── */}
        <Section id="footer">
          <PageTitle page="Footer (Global)" sub="Appears on all pages" />
          <Body>Brand tagline: America's dedicated Asian beverage alcohol specialist. More than 30 years of category depth, producer relationships, and national wholesale infrastructure — focused exclusively on the B2B channel.</Body>
          <SectionTitle title="Navigation Links" />
          <BulletList items={['About', 'Services', 'Portfolio', 'Contact']} />
          <SectionTitle title="Contact Block" />
          <BulletList items={['755 East Mulberry Ave., San Antonio, TX 78212', 'contact@rtm-imports.com']} />
          <SectionTitle title="Legal Line" />
          <Body>© {new Date().getFullYear()} RTM Imports, LLC. All rights reserved. · Please drink responsibly. Must be 21+.</Body>
        </Section>

        {/* Footer note */}
        <div className="mt-16 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">RTM Imports · rtm-imports.com · Content document generated {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

      </div>
    </>
  );
}