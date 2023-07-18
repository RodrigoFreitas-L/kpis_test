This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First of all, install the dependencies:

```bash
npm install
# or simply
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

The application consist of a full application using react and its components and a PostgreSQL database, with the purpose of showing data for People Analytics.

Everything needed is inside the app folder, and you can edit it as you please.

## Technologies used

[Next.js](https://nextjs.org) - Here we include our react pages and components, our database (PostgreSQL) and its methods.

[React Query](https://tanstack.com/query/latest/docs/react/overview) - Eliminating the use of any UseEffect and so, our application doesn't "re-render" any of our components.

[Cypress](https://www.cypress.io/) - For testing our application, e2e.

[Babeljs](https://babeljs.io/docs/babel-plugin-transform-modules-commonjs) - A plugin to be able to transform modules commonjs so we are able to use import outside modules.

[Start-server-and-test](https://github.com/bahmutov/start-server-and-test) - A package that runs our server while testing with Cypress and closes it after the testing is done.

[Nivo](https://nivo.rocks/) - To use our data to create graphics.


## API

## BASE URL

The base URL for all API endpoints is: `http://localhost:3000`

## Endpoints

1. Retrive Headcount

+ Endpoint: `/headcount`
+ Method `GET`
+ Parameters:
  + `email` (required) - The email address for which to retrieve headcount data.
+ Request:
```bash
GET /api/headcount?email=email@email.com
```
+ Response:
```bash
[
  {
    "mes_ano": "01/2020",
    "headcount_inicio_mes": "4",
    "headcount_fim_mes": "3",
  },
   {
    "mes_ano": "02/2020",
    "headcount_inicio_mes": "3",
    "headcount_fim_mes": "6",
  },
  ...
]
```
+ Description: This endpoint retrieves the headcount on first day and last day of each month from the admission month of the email's owner, for the specified email.

2. Retrieve Turnover

+ Endpoints: `/turnover`
+ Method: `GET`
+ Parameters:
  + `email` (required) - The email address for which to retrieve the number of employees with rescission date on every month.
+ Request:
```bash
GET /api/turnover?email=email@email.com
```
+ Response:
```bash
[
  {
		"mes_ano": "02/2020",
		"turnover": "1"
	},
	{
		"mes_ano": "03/2020",
		"turnover": "0"
	},
  ...
]
```
+ Description: This endpoint retrieves the recission numbers that/if happens for every month from the admission month of the email's owner, later on (on front-end) this will be used on a `turnover / headcount` operation.

3. Retrieve Headcount (in absolute numbers) for Turnover

+ Endpoints: `/headcount-for-turnover`
+ Method: `GET`
+ Parameters:
  + `email` (required) - The email address for which retrieve headcount in absolute numbers for each month.
+ Request:
```bash
GET /api/headcount-for-turnover?email=email@email.com
```
+ Response:
```bash
[
  {
		"mes_ano": "02/2020",
		"headcount": "3"
	},
	{
		"mes_ano": "03/2020",
		"headcount": "5"
	},
	{
		"mes_ano": "04/2020",
		"headcount": "9"
	},
  ...
]
```
+ Description: This endpoint retrieves the absolute number of employees who work for the specified email on each month, starting from the admission date of the email's owner.