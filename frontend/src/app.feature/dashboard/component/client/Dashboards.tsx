import React from 'react';
import styled from 'styled-components';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboards = () => (
  <StyledWrapper>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        data={[
          { name: '09.20', view: 2000 },
          {
            name: '09.21',
            view: 2300,
          },
          { name: '09.22', view: 1200 },
          { name: '09.23', view: 1400 },
          { name: '09.24', view: 3200 },
          { name: '09.25', view: 2500 },
          { name: '09.26', view: 1300 },
          { name: '09.27', view: 3200 },
        ]}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='view' stroke='var(--link-color)' />
      </LineChart>
    </ResponsiveContainer>
    {/* <DashboardBackground title="Top Pages">
          <SimpleBarChart
            data={[
              { name: "Page A", view: 240 },
              { name: "Page B", view: 2210 },
              { name: "Page C", view: 2300 },
              { name: "Page D", view: 2000 },
              { name: "Page E", view: 0 },
              { name: "Page F", view: 123 },
              { name: "Page G", view: 2091 },
            ]}
            xKey="name"
            yKey="view"
          />
        </DashboardBackground> */}
  </StyledWrapper>
);

export default Dashboards;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  .quad-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  > div {
    display: flex;
    gap: 30px;
  }
  .quad-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
`;
