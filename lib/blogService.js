import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  createSlug,
  estimateReadTime,
  normalizeCmsBlogPost,
  parseBlogBody,
} from "@/lib/blog";
import { db, storage } from "@/lib/firebase";

export const BLOG_POSTS_COLLECTION = "blogPosts";
export const ADMINS_COLLECTION = "admins";

function timestampToMillis(value) {
  if (!value) {
    return 0;
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  if (typeof value.toDate === "function") {
    return value.toDate().getTime();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value.seconds === "number") {
    return value.seconds * 1000;
  }

  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
}

function sortNewestFirst(posts) {
  return [...posts].sort((a, b) => {
    const firstDate = timestampToMillis(a.publishedAt || a.updatedAt || a.createdAt);
    const secondDate = timestampToMillis(b.publishedAt || b.updatedAt || b.createdAt);

    return secondDate - firstDate;
  });
}

function getPlainBodyText(body) {
  return body
    .flatMap((section) => [...(section.paragraphs || []), ...(section.list || [])])
    .join(" ");
}

export async function getPublishedBlogPosts(maxCount) {
  const postsQuery = query(
    collection(db, BLOG_POSTS_COLLECTION),
    where("status", "==", "published"),
  );
  const snapshot = await getDocs(postsQuery);
  const posts = snapshot.docs.map((postDocument) =>
    normalizeCmsBlogPost(postDocument.data(), postDocument.id),
  );
  const sortedPosts = sortNewestFirst(posts);

  return typeof maxCount === "number" ? sortedPosts.slice(0, maxCount) : sortedPosts;
}

export async function getPublishedBlogPost(slug) {
  if (!slug) {
    return null;
  }

  const postSnapshot = await getDoc(doc(db, BLOG_POSTS_COLLECTION, slug));

  if (!postSnapshot.exists()) {
    return null;
  }

  const post = normalizeCmsBlogPost(postSnapshot.data(), postSnapshot.id);

  return post.status === "published" ? post : null;
}

export async function isAdminUser(uid) {
  if (!uid) {
    return false;
  }

  const adminSnapshot = await getDoc(doc(db, ADMINS_COLLECTION, uid));

  return adminSnapshot.exists();
}

export async function getAdminBlogPosts() {
  const snapshot = await getDocs(collection(db, BLOG_POSTS_COLLECTION));
  const posts = snapshot.docs.map((postDocument) =>
    normalizeCmsBlogPost(postDocument.data(), postDocument.id),
  );

  return sortNewestFirst(posts);
}

export async function saveBlogPost(form, previousSlug = "") {
  const slug = createSlug(form.slug || form.title);
  const bodyMarkdown = form.bodyMarkdown || "";
  const body = parseBlogBody(bodyMarkdown);
  const plainBody = getPlainBodyText(body);
  const status = form.status === "published" ? "published" : "draft";
  const now = serverTimestamp();
  const readTime = form.readTime || estimateReadTime(`${form.title} ${form.excerpt} ${plainBody}`);
  const payload = {
    slug,
    title: form.title.trim(),
    excerpt: form.excerpt.trim(),
    category: form.category.trim() || "Dental Care",
    status,
    readTime,
    seoDescription: (form.seoDescription || form.excerpt).trim(),
    imageAlt: (form.imageAlt || form.title).trim(),
    coverImageUrl: form.coverImageUrl || "",
    coverImagePath: form.coverImagePath || "",
    body,
    bodyMarkdown,
    createdAt: form.createdAt || now,
    updatedAt: now,
    publishedAt: status === "published" ? form.publishedAt || now : null,
  };

  await setDoc(doc(db, BLOG_POSTS_COLLECTION, slug), payload);

  if (previousSlug && previousSlug !== slug) {
    await deleteDoc(doc(db, BLOG_POSTS_COLLECTION, previousSlug));
  }

  return normalizeCmsBlogPost(payload, slug);
}

export async function deleteBlogPost(slug) {
  if (!slug) {
    return;
  }

  await deleteDoc(doc(db, BLOG_POSTS_COLLECTION, slug));
}

export async function deleteStorageFile(path) {
  if (!path) {
    return;
  }

  await deleteObject(ref(storage, path));
}

function sanitizeFileName(fileName = "image") {
  return fileName.replace(/[^a-zA-Z0-9_.-]/g, "-").replace(/-+/g, "-");
}

export async function uploadBlogImage(slug, file, onProgress) {
  const safeSlug = createSlug(slug) || "draft";
  const fileName = sanitizeFileName(file.name);
  const path = `blog-images/${safeSlug}/${Date.now()}-${fileName}`;
  const imageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(imageRef, file, {
    contentType: file.type || "image/jpeg",
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (typeof onProgress === "function") {
          onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }
      },
      reject,
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url, path });
      },
    );
  });
}
