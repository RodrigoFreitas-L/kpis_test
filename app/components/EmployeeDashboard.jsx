"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboards from './Dashboards';

const EmployeeDashboard = ({ ...props }) => {

  const { email } = props;

  const headCountData = useQuery({
    queryKey: ['headcount'],
    queryFn: async () => {
      const fetching = await fetch(`/api/headcount/?email=${email}`);
      const dataJson = await fetching.json();
      const newData = [{
        id: 'headcount',
        data: dataJson.map((item) => {
          return {
            x: item.mes_ano,
            y: (item.headcount_inicio_mes === '0' || item.headcount_fim_mes === '0') ? '0' :
              ((item.headcount_inicio_mes + item.headcount_fim_mes) / 2)
          }
        }),
      }]
      return newData;
    }
  });

  const turnoverData = useQuery({
    queryKey: ['turnover'],
    queryFn: async () => {
      const fetchingTurnover = await fetch(`/api/turnover/?email=${email}`);
      const turnoverData = await fetchingTurnover.json();
      const fetchingHeadcount = await fetch(`/api/headcount-for-turnover/?email=${email}`);
      const headcountData = await fetchingHeadcount.json();
      return headcountByTurnover(headcountData, turnoverData);
    }
  });

  const headcountByTurnover = (headcountData, turnoverData) => {
    const headcount = headcountData.map((item) => { return { x: item.mes_ano, y: item.headcount } });
    const turnover = turnoverData.map((item) => { return { x: item.mes_ano, y: item.turnover } });
    const divideTurnoverByHeadcount = turnover.map((item, index) => {
      return { y: item.y / headcount[index].y }
    })
    const newData = [
      {
        id: 'turnover',
        data: turnover.map((item, index) => {
          return {
            x: item.x,
            y: divideTurnoverByHeadcount.map((item2) => item2.y)[index],
          };
        }),
      },
    ];
    return newData;
  };

  return (
    <>
      <Dashboards fetching={headCountData} dashName="Headcount" />
      <Dashboards fetching={turnoverData} dashName="Turnover" />
    </>
  )
};

export default EmployeeDashboard;
