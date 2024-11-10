// GraphComponent.jsx
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';


export const GraphComponent = ({ data, label }) => {

    const { t } = useTranslation();
    return (
        <div className="w-full h-64 flex items-center justify-center">
            <div className="w-full max-w-2xl p-4">
                <div className="mt-[120px] w-full bg-gray-50 p-2 shadow-inner">
                    <div className="w-full h-full flex flex-col">
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={data}
                                    margin={{ top: 20, right: 35, left: 25, bottom: 10}}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{
                                            fontSize: 12,
                                            fill: '#374151',
                                            width: 200,
                                        }}
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        tickMargin={15}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        domain={[0, 10]}
                                        tickCount={6}
                                        width={30}  // YAxis 너비도 살짝 더 줄임
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '8px'
                                        }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#000000"
                                        maxBarSize={50}
                                        radius={[0, 0, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <p className="text-[12px] text-gray-600 italic mt-4 text-center px-4 mb-6">
                    {t('checkbox.graphDescription')}
                </p>
            </div>
        </div>
    );
}
