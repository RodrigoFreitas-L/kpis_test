import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE employees ( Status varchar(255), Nome varchar(255), Email varchar(255), Email_Gestor varchar(255), Admissao date, Rescisao date null, Cargo varchar(255));`;
    // In case we want to drop the table, we could use the following:
    // const result =
    //   await sql`DROP TABLE employees;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
