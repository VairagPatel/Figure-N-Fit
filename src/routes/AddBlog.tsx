import { useState } from "react";
import { motion } from "framer-motion";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Diet");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  function saveBlog() {
    if (!title.trim() || !content.trim()) {
      return alert("⚠️ Please fill in both Title & Content");
    }

    const newPost = {
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      excerpt: content.slice(0, 120) + "...",
      date: new Date().toISOString(),
      author: "You",
      cover: "https://via.placeholder.com/1200x600?text=Blog+Cover",
      category,
      tags: tags.split(",").map((t) => t.trim()),
      content,
    };

    const saved = JSON.parse(localStorage.getItem("userBlogs") || "[]");
    saved.unshift(newPost);
    localStorage.setItem("userBlogs", JSON.stringify(saved));

    alert("✅ Blog saved locally!");
    setTitle(""); setTags(""); setContent(""); setCategory("Diet");
  }

  return (
    <section className="container py-10">
      <h1 className="text-3xl font-extrabold mb-6 text-brand-700">✍️ Add Blog</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4"
      >
        <input
          className="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-brand-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Diet</option>
          <option>Fitness</option>
          <option>Gym</option>
          <option>Weight Loss</option>
        </select>

        <input
          className="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <textarea
          className="border rounded-lg w-full p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={saveBlog}
            className="bg-brand-500 hover:bg-brand-600 transition text-white px-5 py-2 rounded-full shadow-soft"
          >
            💾 Save Blog
          </button>
          <button
            onClick={() => setPreview(!preview)}
            className="border px-5 py-2 rounded-full hover:bg-gray-100 transition"
          >
            {preview ? "Hide Preview" : "Preview"}
          </button>
        </div>
      </motion.div>

      {/* Blog Preview */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 border rounded-2xl bg-white shadow-lg"
        >
          <h2 className="text-2xl font-bold text-brand-700">{title || "Blog Title"}</h2>
          <p className="text-sm text-gray-500">{category} • {new Date().toLocaleDateString()}</p>
          <p className="mt-4 text-gray-700 whitespace-pre-line">{content || "Your blog content will appear here..."}</p>
          {tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.split(",").map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-brand-50 border text-sm">
                  #{t.trim()}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
