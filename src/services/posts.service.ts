// src/services/posts.service.ts
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Post {
    id: string;
    title?: string;
    content?: string;
    createdAt?: unknown;
    [key: string]: unknown;
}

export interface PostsResponse {
    data: Post[];
    hasMore: boolean;
}

export const getPosts = async (pageSize: number = 10): Promise<PostsResponse> => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(pageSize + 1));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
    const hasMore = docs.length > pageSize;
    return {
        data: hasMore ? docs.slice(0, pageSize) : docs,
        hasMore,
    };
};
