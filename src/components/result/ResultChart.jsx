import React, { useState, useEffect } from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';

export const ResultChart = ({
                                inputCitrus,
                                inputFloral,
                                inputWoody,
                                inputWatery,
                                inputFresh,
                                inputSpicy,
                            }) => {
    const scentOrder = ['Watery', 'Floral', 'Citrus', 'Spicy', 'Woody', 'Fresh'];

    const [profile, setProfile] = useState({
        Watery: inputWatery,
        Floral: inputFloral,
        Citrus: inputCitrus,
        Spicy: inputSpicy,
        Woody: inputWoody,
        Fresh: inputFresh,
    });

    const [animatedProfile, setAnimatedProfile] = useState({ ...profile });

    useEffect(() => {
        const animationDuration = 500; // ms
        const steps = 20;
        const stepDuration = animationDuration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps) {
                setAnimatedProfile((prevProfile) => {
                    const newProfile = { ...prevProfile };
                    Object.keys(profile).forEach((key) => {
                        newProfile[key] +=
                            (profile[key] - prevProfile[key]) / (steps - currentStep);
                    });
                    return newProfile;
                });
                currentStep++;
            } else {
                clearInterval(interval);
                setAnimatedProfile({ ...profile });
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, [profile]);

    // Use the scentOrder array to ensure "Watery" is first
    const data = scentOrder.map((key) => ({
        subject: key,
        A: animatedProfile[key],
    }));

    const handleSliderChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: parseInt(value, 10),
        }));
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">SCENT PROFILE</h2>
            <p className="mb-6 text-gray-600">
                테스트중, 수치조정 없앨예정
            </p>
            <div className="h-64 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarGrid />
                        {/* Customize the tick to adjust dy for the fourth label */}
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={(props) => {
                                const { payload, x, y, textAnchor, ...rest } = props;
                                let dy = 0;
                                // Check if the label is the fourth item in scentOrder
                                if (
                                    payload &&
                                    payload.value === scentOrder[3] // Index 3 is the fourth item
                                ) {
                                    dy = '1rem'; // Add 1rem to dy
                                }
                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        dy={dy}
                                        textAnchor={textAnchor}
                                        fill="#666"
                                        fontSize={12}
                                        {...rest}
                                    >
                                        {payload.value}
                                    </text>
                                );
                            }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={{ fontSize: 10 }}
                        />
                        <Radar
                            name="Scent"
                            dataKey="A"
                            stroke="#000000"
                            fill="#000000"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            {/*<div className="space-y-4">*/}
            {/*    {scentOrder.map((key) => (*/}
            {/*        <div key={key} className="flex items-center">*/}
            {/*            <label htmlFor={key} className="w-20">*/}
            {/*                {key}*/}
            {/*            </label>*/}
            {/*            <input*/}
            {/*                type="range"*/}
            {/*                id={key}*/}
            {/*                name={key}*/}
            {/*                min="0"*/}
            {/*                max="100"*/}
            {/*                value={profile[key]}*/}
            {/*                onChange={handleSliderChange}*/}
            {/*                className="w-full mx-2"*/}
            {/*            />*/}
            {/*            <span className="w-10 text-right">{profile[key]}</span>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
};
