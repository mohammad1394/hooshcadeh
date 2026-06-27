import React from 'react';



import CourseContent from "@/components/Course/CourseDetails/CourseContent";
import {Course} from "@/types/course";
import CourseSidebar from "@/components/Course/CourseDetails/CourseSidebar";

function CourseDetails(course : Course) {
    return (
        <div className="my-16 flex gap-8 text-right" dir="rtl">

            {/* محتوای اصلی */}
            <CourseContent {...course}/>

            {/* سایدبار */}
            <CourseSidebar {...course}/>
        </div>
    );
}

export default CourseDetails;