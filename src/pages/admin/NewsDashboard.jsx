import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import NewsPostForm from '../../components/admin/NewsPostForm';

export default function NewsDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    const data = await base44.entities.NewsPost.list('-published_date');
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async (data) => {
    if (editingPost) {
      await base44.entities.NewsPost.update(editingPost.id, data);
    } else {
      await base44.entities.NewsPost.create(data);
    }
    setShowForm(false);
    setEditingPost(null);
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      await base44.entities.NewsPost.delete(id);
      fetchPosts();
    }
  };

  const toggleField = async (post, field) => {
    await base44.entities.NewsPost.update(post.id, { [field]: !post[field] });
    fetchPosts();
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const openNew = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <NewsPostForm
        post={editingPost}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditingPost(null); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl text-foreground">News & Insights</h1>
            <p className="font-body text-sm text-muted-foreground mt-1">Manage articles, press releases, and market updates</p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-200"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-border p-6 animate-pulse h-20" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-card border border-border p-16 text-center">
            <p className="font-body text-muted-foreground mb-4">No posts yet. Create your first article.</p>
            <button onClick={openNew} className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-widest text-primary hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" /> Create Post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border p-5 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-body text-xs uppercase tracking-widest text-primary">{post.category}</span>
                    {post.is_featured && <span className="font-body text-xs uppercase tracking-widest text-yellow-400">★ Featured</span>}
                    {!post.is_published && <span className="font-body text-xs uppercase tracking-widest text-muted-foreground border border-border px-1.5">Draft</span>}
                  </div>
                  <h3 className="font-display text-base text-foreground truncate">{post.title}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    {post.published_date} {post.author ? `· ${post.author}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleField(post, 'is_published')}
                    title={post.is_published ? 'Unpublish' : 'Publish'}
                    className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {post.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => toggleField(post, 'is_featured')}
                    title={post.is_featured ? 'Unfeature' : 'Feature'}
                    className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {post.is_featured ? <Star className="w-3.5 h-3.5 text-yellow-400" /> : <StarOff className="w-3.5 h-3.5" />}
                  </button>
                  {post.external_url && (
                    <a href={post.external_url} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => openEdit(post)}
                    className="w-8 h-8 flex items-center justify-center border border-border hover:border-primary transition-colors text-muted-foreground hover:text-primary"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="w-8 h-8 flex items-center justify-center border border-border hover:border-destructive transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}