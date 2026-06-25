// components/Blog/CommentSection.tsx
'use client';

import React, {useState} from 'react';
import {createBlogComment} from "@/services/blog";

interface Comment {
    id: number;
    body: string;
    user: number;
    created_jalali?: string;
}

interface Props {
    blogId: number;
    comments: Comment[];
}

function CommentSection({blogId, comments}: Props) {
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!body.trim()) return;
        setLoading(true);
        setError('');
        try {
            await createBlogComment(body, blogId);
            setSuccess(true);
            setBody('');
        } catch {
            setError('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 rtl">

            {/* نمایش کامنت‌ها */}
            <h2 className="text-lg font-bold text-[#1B3A6B] mb-5 border-r-4 border-[#C9A84C] pr-3">
                دیدگاه‌ها ({comments.length})
            </h2>

            {comments.length === 0 ? (
                <p className="text-gray-400 text-sm mb-8">هنوز دیدگاهی ثبت نشده.</p>
            ) : (
                <div className="space-y-4 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-[#f5f4f0] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-xs font-semibold">
                                    ک
                                </div>
                                <span className="text-sm font-medium text-gray-700">کاربر</span>
                                {comment.created_jalali && (
                                    <span className="text-xs text-gray-400 mr-auto">
                                        {comment.created_jalali}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{comment.body}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* فرم ثبت کامنت */}
            <div className="bg-[#f5f4f0] rounded-2xl p-6">
                <h3 className="text-base font-bold text-[#1B3A6B] mb-4">دیدگاه خود را بنویسید</h3>

                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="دیدگاه شما..."
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#1B3A6B] transition-colors"
                />

                {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                )}

                {success && (
                    <p className="text-green-600 text-xs mt-2">دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.</p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading || !body.trim()}
                    className="mt-4 bg-[#1B3A6B] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#152d54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'در حال ارسال...' : 'ثبت دیدگاه'}
                </button>
            </div>

        </div>
    );
}

export default CommentSection;