import React from 'react';

interface  Props {
    key : number;
    id : number ;
    name : string ;
    comment : string;
}
function CommentTempalete({ name , comment}: Props) {
    return (

            <div className={"bg-white rounded-xl m-3 my-20 p-5 flex flex-col gap-3 text-center h-[60vh]"}>
                <img src={"/assets/user-profile.png"} className={"w-[60px] mx-auto rounded-xl"} />
                <p className={"text-blue-500"}>{name}</p>
                <p className={"text-gray-600"}>{comment}</p>
            </div>


    );
}

export default CommentTempalete;