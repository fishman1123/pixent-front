// GraphComponent.jsx
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export const GraphComponent = ({ data, label }) => {
    return (
        <>
            <div className="h-64 w-full bg-gray-50 p-2 shadow-inner mt-8 flex justify-center items-center">
                <div className="w-full max-w-full sm:max-w-sm md:max-w-md pr-[30px] sm:pr-0 pt-[40px] sm:pt-0">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#000000" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <p className="text-sm text-gray-600 italic mt-2 text-center">
                그래프: {label} 계열 향수의 주요 특성 (10점 만점)
            </p>
        </>
    );
};
