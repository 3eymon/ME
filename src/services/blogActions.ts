import { Post } from "@/app/blog/[id]/page";
import api from "./api";

export type ApiResponse<T> = Promise<{
    success: boolean;
    data?: T | null;
    message?: string;
    errors?: any;
    status?: number;
}>;

function handleError(err: any, fallbackMsg = "خطا در ارتباط با سرور") {
    if (err.response) {
        console.error("Data:", err.response.data);
        return {
            success: false,
            data: err.response.data,
            message: "درخواست با خطا مواجه شد.",
        };
    } else if (err.request) {
        console.error("درخواست ارسال شد ولی پاسخی دریافت نشد:", err.request);
    } else {
        console.error("خطای ناشناخته:", err.message);
    }
    return {
        success: false,
        errors: {},
        message: fallbackMsg,
    };
}


export const getAllPosts: (page?: number) => ApiResponse<any> = async (page?: number) => {
    try {
        const response = await api.get(`/posts${page ? `?page=${page}` : ""}`);
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};
export const getSinglePost: (id: string) => ApiResponse<any> = async (id: string) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};
export const AddPost = async (data: FormData): Promise<ApiResponse<Post>> => {
    try {
        const response = await api.post("/posts", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return { success: true, data: response.data };
    } catch (err: any) {
        return handleError(err);
    }
};

export const UpdatePost = async (id: number, data: FormData): Promise<ApiResponse<Post>> => {
    try {
        const response = await api.put(`/posts/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return { success: true, data: response.data };
    } catch (err: any) {
        return handleError(err);
    }
};
export const DeletePost = async (id: number): Promise<ApiResponse<null>> => {
    try {
        await api.delete(`/posts/${id}`);
        return { success: true };
    } catch (err: any) {
        return handleError(err);
    }
};