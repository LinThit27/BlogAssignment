import React, { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";

const AdminBlogOverviewCharts = () => {
  const [state, setState] = useState();

  const data = [
    { name: "Approved", value: 10 },
    { name: "Pending", value: 8 },
    { name: "Reject", value: 3 },
  ];
  const COLORS = ["#0d6efd", "#ffc107", "#dc3545"];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const handleMouseEnter = (_, index) => {
    setState(index);
  };

  return (
    <div className="d-flex justify-content-evenly">
      <div className="w-100">
        <h3>Blog Lists</h3>

        <PieChart className="blog-status-piechart" width={400} height={400}>
          <Pie
            activeIndex={state}
            onMouseEnter={handleMouseEnter}
            data={data}
            cx={200}
            cy={200}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            activeShape={renderActiveShape}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="w-100">
        <h3>Blog Information </h3>
        <div className="d-flex flex-column gap-2 mt-5 align-items-center">
          <div className="bg-primary p-3 w-75 rounded text-light text-center font-weight-bold">
            10
          </div>
          <div className="bg-warning p-3 w-75 rounded text-light text-center font-weight-bold">
            8
          </div>
          <div className="bg-danger p-3 w-75 rounded text-light text-center font-weight-bold">
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogOverviewCharts;