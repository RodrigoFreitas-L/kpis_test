import { Grid, CircularProgress } from '@mui/material';
import { ResponsiveLine } from '@nivo/line'
import React from 'react'

function Dashboards({ ...props }) {
  const { fetching, dashName } = props;
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'column',
        margin: 'auto'
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign='center'
      >
        <Grid
          item
          borderRadius='1em'
          boxShadow={4}
          backgroundColor='#3F72AF'
        >
          <h1
            id={dashName}
            style={{
              color: 'white',
            }}
          >
            {`Evolução de ${dashName}`}
          </h1>
          <Grid
            style={{
              height: '70vh',
              width: '60vw',
              borderBottomLeftRadius: '1em',
              borderBottomRightRadius: '1em'
            }}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign='center'
            backgroundColor='#F9F7F7'
            boxShadow={4}
          >
            {
              fetching.isLoading ? <CircularProgress height='70vh' width='60vw' /> :
                <ResponsiveLine
                  data={fetching.data}
                  theme={{
                    axis: {
                      ticks: {
                        line: {
                          stroke: '#4A55A2',
                        },
                        text: {
                          fill: '#4A55A2'
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#4A55A2',
                        strokeWidth: 0.5,
                      }
                    }
                  }}
                  margin={{ top: 50, right: 110, bottom: 80, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                  }}
                  colors={{ scheme: 'nivo' }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 65,
                    legend: `${dashName} durante os meses`,
                    legendOffset: 60,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'funcionários',
                    legendOffset: -40,
                    legendPosition: 'middle'
                  }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: true,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(178, 34, 34, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(178, 34, 34, .03)',
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                />}
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
};

export default Dashboards;
