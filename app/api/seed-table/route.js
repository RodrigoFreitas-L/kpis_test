import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import data from "./data.json";

export async function GET(request) {
  // try {
  //   data.map(async (item) => {
  //     if (item.rescisao === "") {
  //       item.rescisao = null
  //     }
  //     await sql`INSERT INTO employees (Status, Nome, Email, Email_Gestor, Admissao, Rescisao, Cargo) VALUES (${item.status}, ${item.nome}, ${item.email}, ${item.email_gestor}, TO_DATE(${item.admissao}, 'dd/mm/YYYY'), TO_DATE(${item.rescisao}, 'dd/mm/yyyy'), ${item.cargo});`
  //   });
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 })

  // }

  const response = await sql`SELECT COUNT(*) FROM employees;`;
  return NextResponse.json(response.rows, { status: 200 });
}