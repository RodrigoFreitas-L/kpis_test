import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  try {
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    const result =
      await sql`
      WITH RECURSIVE employee_hierarchy AS (
        SELECT email, email_gestor, admissao, rescisao
        FROM employees
        WHERE email = ${email}
        UNION ALL
        SELECT employees.email, employees.email_gestor, employees.admissao, employees.rescisao
        FROM employees
        INNER JOIN employee_hierarchy ON employees.email_gestor = employee_hierarchy.email
      )
      SELECT to_char(date_trunc('month', d.mes), 'MM/YYYY') AS mes_ano, COUNT(*) AS headcount
      FROM (
        SELECT generate_series(
                 DATE_TRUNC('month', MIN(admissao)),
                 DATE_TRUNC('month', MAX(rescisao)),
                 '1 month'
               ) AS mes
        FROM employee_hierarchy
      ) AS d
      LEFT JOIN employee_hierarchy ON d.mes >= DATE_TRUNC('month', employee_hierarchy.admissao)
                                   AND (d.mes < DATE_TRUNC('month', employee_hierarchy.rescisao)
                                         OR employee_hierarchy.rescisao IS NULL)
      GROUP BY d.mes
      ORDER BY d.mes;
      `;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}