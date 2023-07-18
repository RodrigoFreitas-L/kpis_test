import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  try {
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    const result =
      await sql`WITH RECURSIVE employee_hierarchy AS (
      SELECT email, email_gestor, admissao, rescisao
      FROM employees
      WHERE email = ${email}
      UNION ALL
      SELECT employees.email, employees.email_gestor, employees.admissao, employees.rescisao
      FROM employees
      INNER JOIN employee_hierarchy ON employees.email_gestor = employee_hierarchy.email
    ), 
    months AS (
      SELECT generate_series(
               DATE_TRUNC('month', MIN(admissao)),
               DATE_TRUNC('month', MAX(CURRENT_DATE)),
               '1 month'
             ) AS mes
      FROM employee_hierarchy
    )
    SELECT to_char(date_trunc('month', m.mes), 'MM/YYYY') AS mes_ano,
           COUNT(CASE WHEN e.admissao <= m.mes AND (e.rescisao > m.mes OR e.rescisao IS NULL) THEN 1 END) AS headcount_inicio_mes,
           COUNT(CASE WHEN e.admissao <= m.mes + INTERVAL '1 month' - INTERVAL '1 day' AND (e.rescisao > m.mes + INTERVAL '1 month' - INTERVAL '1 day' OR e.rescisao IS NULL) THEN 1 END) AS headcount_fim_mes
    FROM months m
    LEFT JOIN employee_hierarchy e ON e.admissao <= m.mes AND (e.rescisao > m.mes OR e.rescisao IS NULL)
    GROUP BY m.mes
    ORDER BY m.mes;
    `;
    // Letting it here as we might need the absolute headcount value instead
    // await sql`
    // WITH RECURSIVE employee_hierarchy AS (
    //   SELECT email, email_gestor, admissao, rescisao
    //   FROM employees
    //   WHERE email = ${email}
    //   UNION ALL
    //   SELECT employees.email, employees.email_gestor, employees.admissao, employees.rescisao
    //   FROM employees
    //   INNER JOIN employee_hierarchy ON employees.email_gestor = employee_hierarchy.email
    // )
    // SELECT to_char(date_trunc('month', d.mes), 'MM/YYYY') AS mes_ano, COUNT(*) AS headcount
    // FROM (
    //   SELECT generate_series(
    //            DATE_TRUNC('month', MIN(admissao)),
    //            DATE_TRUNC('month', MAX(CURRENT_DATE)),
    //            '1 month'
    //          ) AS mes
    //   FROM employee_hierarchy
    // ) AS d
    // LEFT JOIN employee_hierarchy ON d.mes >= DATE_TRUNC('month', employee_hierarchy.admissao)
    //                              AND (d.mes < DATE_TRUNC('month', employee_hierarchy.rescisao)
    //                                    OR employee_hierarchy.rescisao IS NULL)
    // GROUP BY d.mes
    // ORDER BY d.mes;
    // `;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
