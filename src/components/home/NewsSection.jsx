import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import NewsCard from '../news/NewsCard';
import NewsModal from '../news/NewsModal';
import SectionHeading from '../SectionHeading';

export default function NewsSection() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    base44.entities.NewsPost.filter({ is_published: true }, '-published_date', 3).then(setPosts);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="News & Insights"
            title="Latest from the category"
          />
          <Link
            to="/news"
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-primary hover:text-foreground transition-colors duration-300 group flex-shrink-0 mb-16"
          >
            All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <NewsCard key={post.id} post={post} idx={idx} onOpen={setSelectedPost} />
          ))}
        </div>
      </div>

      {selectedPost && <NewsModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
}