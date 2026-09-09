import React from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://b.link/IG-rtm.imports_', Icon: Instagram },
  { name: 'Facebook', url: 'https://b.link/FB-RouteToMarketImports', Icon: Facebook },
  { name: 'LinkedIn', url: 'https://b.link/LI-RTM-Imports', Icon: Linkedin },
];

export default function FooterSocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map(({ name, url, Icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`RTM Imports on ${name}`}
          title={`RTM Imports on ${name}`}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10"
        >
          <Icon className="w-[18px] h-[18px] text-primary" data-no-bounce />
        </a>
      ))}
    </div>
  );
}