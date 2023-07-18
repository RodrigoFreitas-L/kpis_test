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
      ), rescinded_employees AS (
        SELECT email, DATE_TRUNC('month', rescisao) AS rescisao_mes
        FROM employee_hierarchy
        WHERE rescisao IS NOT NULL
      )
      SELECT to_char(d.mes, 'MM/YYYY') AS mes_ano, COUNT(re.email) AS turnover
      FROM (
        SELECT generate_series(
          DATE_TRUNC('month', MIN(admissao)),
          DATE_TRUNC('month', COALESCE(MAX(rescisao), NOW())),
          '1 month'
        ) AS mes
        FROM employee_hierarchy
      ) AS d
      LEFT JOIN rescinded_employees AS re
        ON d.mes = re.rescisao_mes
      GROUP BY d.mes
      ORDER BY d.mes;
      
      `;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
/*
  WITH RECURSIVE employee_hierarchy AS (
  SELECT email, email_gestor, admissao, rescisao
  FROM employees
  WHERE email = 'daniellewinters@kpis.tech'
  UNION ALL
  SELECT e.email, e.email_gestor, e.admissao, e.rescisao
  FROM employees e
  JOIN employee_hierarchy eh ON e.email_gestor = eh.email
)
SELECT
  to_char(date_trunc('month', eh.admissao), 'YYYY-MM') AS mes,
  COUNT(*) AS headcount
FROM employee_hierarchy eh
WHERE
  (eh.rescisao IS NULL OR eh.rescisao >= eh.admissao)
GROUP BY mes
ORDER BY mes;

*/

/**
 * 
 *     WITH RECURSIVE employee_hierarchy AS (
      SELECT email, email_gestor, admissao, rescisao
      FROM employees
      WHERE email = 'sharonbarr@kpis.tech'
      UNION ALL
      SELECT e.email, e.email_gestor, e.admissao, e.rescisao
      FROM employees e
      JOIN employee_hierarchy eh ON e.email_gestor = eh.email
    )
    SELECT
      to_char(date_trunc('month', eh.admissao), 'YYYY-MM') AS mes,
      COUNT(*) AS turnover
    FROM employee_hierarchy eh
    WHERE eh.rescisao IS NOT NULL
    GROUP BY mes
    ORDER BY mes;
    
 */