import { collection, getDocs, query, limit, orderBy, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db } from '../firebase/config';

export interface Post {
    id: string;
    title?: string;
    content?: string;
    authorId?: string;
    authorName?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    [key: string]: unknown;
}

export interface PostsResponse {
    data: Post[];
    hasMore: boolean;
}

export const getPosts = async (pageSize: number = 10): Promise<PostsResponse> => {
    try {
        const q = query(
            collection(db, 'posts'),
            orderBy('createdAt', 'desc'),
            limit(pageSize + 1)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
        const hasMore = docs.length > pageSize;
        return {
            data: hasMore ? docs.slice(0, pageSize) : docs,
            hasMore,
        };
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            throw new Error(`Failed to fetch posts: ${error.message}`);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch posts: Unknown error');
    }
};

// Create a new post
export const createPost = async (
    title: string,
    content: string,
    authorId: string,
    authorName: string
): Promise<Post> => {
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            title,
            content,
            authorId,
            authorName,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return {
            id: docRef.id,
            title,
            content,
            authorId,
            authorName,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            throw new Error(`Failed to create post: ${error.message}`);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to create post: Unknown error');
    }
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'posts', postId));
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            throw new Error(`Failed to delete post: ${error.message}`);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to delete post: Unknown error');
    }
};

// Update a post
export const updatePost = async (
    postId: string,
    title: string,
    content: string
): Promise<void> => {
    try {
        await updateDoc(doc(db, 'posts', postId), {
            title,
            content,
            updatedAt: serverTimestamp(),
        });
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            throw new Error(`Failed to update post: ${error.message}`);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to update post: Unknown error');
    }
};
