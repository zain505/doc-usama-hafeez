"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FileText,
  Image as ImageIcon,
  LogIn,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createSlug } from "@/lib/blog";
import {
  deleteBlogPost,
  deleteStorageFile,
  getAdminBlogPosts,
  isAdminUser,
  saveBlogPost,
  uploadBlogImage,
} from "@/lib/blogService";
import { auth } from "@/lib/firebase";
import styles from "./admin.module.css";

const emptyForm = {
  slug: "",
  title: "",
  category: "Dental Care",
  excerpt: "",
  readTime: "",
  seoDescription: "",
  imageAlt: "",
  coverImageUrl: "",
  coverImagePath: "",
  bodyMarkdown: "",
  status: "draft",
  createdAt: null,
  publishedAt: null,
};

function postToForm(post) {
  return {
    slug: post.slug || "",
    title: post.title || "",
    category: post.category || "Dental Care",
    excerpt: post.excerpt || "",
    readTime: post.readTime || "",
    seoDescription: post.seoDescription || "",
    imageAlt: post.imageAlt || "",
    coverImageUrl: post.coverImageUrl || "",
    coverImagePath: post.coverImagePath || "",
    bodyMarkdown: post.bodyMarkdown || "",
    status: post.status === "published" ? "published" : "draft",
    createdAt: post.createdAt || null,
    publishedAt: post.publishedAt || null,
  };
}

export default function AdminPage() {
  const [authReady, setAuthReady] = useState(false);
  const [adminReady, setAdminReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug),
    [posts, selectedSlug],
  );

  const loadPosts = useCallback(async (slugToSelect = "") => {
    setPostsLoading(true);
    setMessage("");

    try {
      const nextPosts = await getAdminBlogPosts();
      setPosts(nextPosts);

      if (slugToSelect) {
        const nextSelectedPost = nextPosts.find((post) => post.slug === slugToSelect);

        if (nextSelectedPost) {
          setSelectedSlug(nextSelectedPost.slug);
          setForm(postToForm(nextSelectedPost));
        }
      }
    } catch (error) {
      setMessage(error.message || "Could not load posts.");
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
      setAdminReady(false);
      setIsAdmin(false);

      if (!nextUser) {
        setAdminReady(true);
        setPosts([]);
        setSelectedSlug("");
        setForm(emptyForm);
        return;
      }

      try {
        const allowed = await isAdminUser(nextUser.uid);
        setIsAdmin(allowed);

        if (allowed) {
          await loadPosts("");
        }
      } catch {
        setIsAdmin(false);
      } finally {
        setAdminReady(true);
      }
    });
  }, [loadPosts]);

  async function handleSignIn(event) {
    event.preventDefault();
    setAuthError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPassword("");
    } catch (error) {
      setAuthError(error.message || "Sign in failed.");
    }
  }

  function handleNewPost() {
    setSelectedSlug("");
    setForm(emptyForm);
    setMessage("");
    setUploadProgress(null);
  }

  function handleSelectPost(post) {
    setSelectedSlug(post.slug);
    setForm(postToForm(post));
    setMessage("");
    setUploadProgress(null);
  }

  function updateField(name, value) {
    setForm((currentForm) => {
      const nextForm = { ...currentForm, [name]: value };

      if (name === "title" && !selectedSlug && !currentForm.slug) {
        nextForm.slug = createSlug(value);
      }

      if (name === "slug") {
        nextForm.slug = createSlug(value);
      }

      return nextForm;
    });
  }

  async function handleSave(nextStatus = form.status) {
    setMessage("");

    if (!form.title.trim()) {
      setMessage("Title is required.");
      return;
    }

    if (!createSlug(form.slug || form.title)) {
      setMessage("Slug is required.");
      return;
    }

    setSaving(true);

    try {
      const savedPost = await saveBlogPost({ ...form, status: nextStatus }, selectedSlug);
      setSelectedSlug(savedPost.slug);
      await loadPosts(savedPost.slug);
      setMessage(nextStatus === "published" ? "Post published." : "Draft saved.");
    } catch (error) {
      setMessage(error.message || "Could not save post.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedSlug || !window.confirm("Delete this post?")) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await deleteBlogPost(selectedSlug);

      if (form.coverImagePath) {
        await deleteStorageFile(form.coverImagePath).catch(() => {});
      }

      setSelectedSlug("");
      setForm(emptyForm);
      await loadPosts("");
      setMessage("Post deleted.");
    } catch (error) {
      setMessage(error.message || "Could not delete post.");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    const uploadSlug = createSlug(form.slug || form.title);

    if (!uploadSlug) {
      setMessage("Add a title before uploading an image.");
      return;
    }

    setUploadProgress(0);
    setMessage("");

    try {
      const uploadedImage = await uploadBlogImage(uploadSlug, file, setUploadProgress);
      setForm((currentForm) => ({
        ...currentForm,
        coverImageUrl: uploadedImage.url,
        coverImagePath: uploadedImage.path,
        imageAlt: currentForm.imageAlt || currentForm.title,
      }));
      setMessage("Image uploaded.");
    } catch (error) {
      setMessage(error.message || "Image upload failed.");
    } finally {
      setUploadProgress(null);
    }
  }

  if (!authReady || (user && !adminReady)) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authPanel}>
          <span className={styles.eyebrow}>Dental Square CMS</span>
          <h1>Loading admin access</h1>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className={styles.authPage}>
        <form className={styles.authPanel} onSubmit={handleSignIn}>
          <span className={styles.eyebrow}>Dental Square CMS</span>
          <h1>Staff sign in</h1>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {authError ? <p className={styles.errorText}>{authError}</p> : null}
          <button className={styles.primaryButton} type="submit">
            <LogIn size={18} aria-hidden="true" />
            Sign in
          </button>
        </form>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authPanel}>
          <span className={styles.eyebrow}>Dental Square CMS</span>
          <h1>Access not allowed</h1>
          <p className={styles.mutedText}>{user.email} is signed in but is not on the admin allowlist.</p>
          <button className={styles.secondaryButton} type="button" onClick={() => signOut(auth)}>
            <LogOut size={18} aria-hidden="true" />
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <div>
          <span className={styles.eyebrow}>Dental Square CMS</span>
          <h1>Blog manager</h1>
        </div>
        <div className={styles.headerActions}>
          <span>{user.email}</span>
          <button className={styles.iconButton} type="button" onClick={() => loadPosts(selectedSlug)}>
            <RefreshCw size={18} aria-hidden="true" />
            Refresh
          </button>
          <button className={styles.iconButton} type="button" onClick={() => signOut(auth)}>
            <LogOut size={18} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.adminShell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Posts</h2>
            <button className={styles.iconButton} type="button" onClick={handleNewPost}>
              <Plus size={18} aria-hidden="true" />
              New
            </button>
          </div>

          <div className={styles.postList}>
            {postsLoading ? <p className={styles.mutedText}>Loading posts...</p> : null}
            {!postsLoading && !posts.length ? <p className={styles.mutedText}>No CMS posts yet.</p> : null}
            {posts.map((post) => (
              <button
                className={`${styles.postRow} ${post.slug === selectedSlug ? styles.activePostRow : ""}`}
                key={post.slug}
                type="button"
                onClick={() => handleSelectPost(post)}
              >
                <span>{post.title}</span>
                <small>{post.status}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className={styles.editorPanel}>
          <div className={styles.editorHeader}>
            <div>
              <span className={styles.eyebrow}>{selectedPost ? selectedPost.status : "New post"}</span>
              <h2>{form.title || "Untitled article"}</h2>
            </div>
            <div className={styles.editorActions}>
              <button
                className={styles.secondaryButton}
                type="button"
                disabled={saving}
                onClick={() => handleSave("draft")}
              >
                <Save size={18} aria-hidden="true" />
                Save draft
              </button>
              <button
                className={styles.primaryButton}
                type="button"
                disabled={saving}
                onClick={() => handleSave("published")}
              >
                <Send size={18} aria-hidden="true" />
                Publish
              </button>
            </div>
          </div>

          {message ? <p className={styles.message}>{message}</p> : null}

          <div className={styles.formGrid}>
            <label className={styles.fullField}>
              <span>Title</span>
              <input value={form.title} onChange={(event) => updateField("title", event.target.value)} />
            </label>

            <label>
              <span>Slug</span>
              <input value={form.slug} onChange={(event) => updateField("slug", event.target.value)} />
            </label>

            <label>
              <span>Status</span>
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label>
              <span>Category</span>
              <input value={form.category} onChange={(event) => updateField("category", event.target.value)} />
            </label>

            <label>
              <span>Read time</span>
              <input value={form.readTime} onChange={(event) => updateField("readTime", event.target.value)} />
            </label>

            <label className={styles.fullField}>
              <span>Excerpt</span>
              <textarea
                value={form.excerpt}
                rows={3}
                onChange={(event) => updateField("excerpt", event.target.value)}
              />
            </label>

            <label className={styles.fullField}>
              <span>SEO description</span>
              <textarea
                value={form.seoDescription}
                rows={2}
                onChange={(event) => updateField("seoDescription", event.target.value)}
              />
            </label>

            <div className={`${styles.mediaField} ${styles.fullField}`}>
              <div className={styles.mediaPreview}>
                {form.coverImageUrl ? (
                  <Image
                    src={form.coverImageUrl}
                    alt={form.imageAlt || ""}
                    fill
                    sizes="(max-width: 980px) 100vw, 320px"
                    className={styles.previewImage}
                  />
                ) : (
                  <ImageIcon size={42} aria-hidden="true" />
                )}
              </div>
              <div className={styles.mediaControls}>
                <label>
                  <span>Image alt</span>
                  <input value={form.imageAlt} onChange={(event) => updateField("imageAlt", event.target.value)} />
                </label>
                <label>
                  <span>Cover image URL</span>
                  <input
                    value={form.coverImageUrl}
                    onChange={(event) => updateField("coverImageUrl", event.target.value)}
                  />
                </label>
                <label className={styles.uploadButton}>
                  <Upload size={18} aria-hidden="true" />
                  Upload image
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
                {uploadProgress !== null ? <span className={styles.uploadProgress}>{uploadProgress}%</span> : null}
              </div>
            </div>

            <label className={styles.fullField}>
              <span>Article body</span>
              <textarea
                className={styles.bodyInput}
                value={form.bodyMarkdown}
                rows={16}
                onChange={(event) => updateField("bodyMarkdown", event.target.value)}
              />
            </label>
          </div>

          <div className={styles.dangerZone}>
            <div>
              <FileText size={20} aria-hidden="true" />
              <span>{selectedSlug ? selectedSlug : "Draft not saved yet"}</span>
            </div>
            <button
              className={styles.deleteButton}
              type="button"
              disabled={!selectedSlug || saving}
              onClick={handleDelete}
            >
              <Trash2 size={18} aria-hidden="true" />
              Delete post
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
