import React from "react";
import CourseContent from "@/components/Course/CourseDetails/CourseContent";
import CourseSidebar from "@/components/Course/CourseDetails/CourseSidebar";
import CommentSection from "@/components/modules/CommentSection/CommentSection";
import { Course } from "@/types/course";

function CourseDetails(course: Course) {
    return (
        <main className="min-h-screen bg-gray-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="my-16 flex gap-8 text-right">

                    {/* محتوای اصلی */}
                    <CourseContent {...course} />

                    {/* سایدبار */}
                    <CourseSidebar {...course} />

                </div>

                <div className="mt-16 mb-10 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400 whitespace-nowrap px-2">
            نظرات دانشجویان
          </span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <CommentSection
                    id={course.id}
                    comments={course.comments}
                    type="course"
                />

            </div>
        </main>
    );
}

export default CourseDetails;