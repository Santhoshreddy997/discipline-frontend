import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function WeeklyChart({data}){

return(

<div>



<LineChart width={350} height={200} data={data}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="date" />

<YAxis />

<Tooltip />

<Line type="monotone" dataKey="score" stroke="#8884d8" />

</LineChart>

</div>

);

}

export default WeeklyChart;