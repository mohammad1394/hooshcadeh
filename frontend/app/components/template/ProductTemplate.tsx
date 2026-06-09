import React from 'react';

export interface ProductProps {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    scode: number;
    teacher: string;
    hours: string;
}

function ProductTemplate({
    title,
    image,
    price,
    scode,
    description,
    teacher,
    hours,
}: ProductProps) {
    return (
        <div className="text-right">
            <div className="bg-white p-3">
                <div className="flex flex-col gap-4">
                    <img src={image} alt={title} className={"rounded-xl"} />
                    <p className="p-slideri">{title}</p>
                    <p className="line-clamp-2 text-gray-500 text-[16px]">
                        {description}
                    </p>
                </div>
                <div className={"flex flex-row gap-5 mt-5"}>
                    <p>{teacher}</p>
                    <p>{hours}</p>
                </div>
                <div className={"flex flex-row-reverse justify-between mt-8 mb-4"}>
                    <p className={"text-[#00c896] text-[12px] md:text-[16px]"}>
                        {price}
                    </p>
                    <p className={"bg-[#1E88E5] text-white p-1 md:p-2 text-[12px] md:text-[16px] rounded-[10px]"}>
                        {scode}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductTemplate;