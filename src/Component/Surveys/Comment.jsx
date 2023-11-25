import React from 'react';

const Comment = ({details}) => {
    const { questionOne, title, description, voted, like, dislike, } = details;
    return (
            <li className="mb-4 ms-6">
                <div className="p-4 border border-blue-700 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                    <div className="items-center justify-between mb-3 sm:flex">
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</time>
                        <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">Thomas Lean commented on  <a href="#" className="font-semibold text-gray-900 dark:text-white hover:underline"></a>{title}</div>
                    </div>
                    <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.</div>
                </div>
            </li>
    );
};

export default Comment;